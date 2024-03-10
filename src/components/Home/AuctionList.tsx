import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Auction_post } from "../../types/databaseReturnTypes";
import { fetchAuctionMaxBid } from "../../api/bid";
import { AuctionStatus } from "../../types/detailTyps";
import { calculateAuctionStatusAndTime } from "../../common/dayjs";
import { supabase } from "../../supabase";
import { fetchLikes, updateLike } from "../../api/likes";
import SkeletonAuctionCard from "./SkeletonAuctionCard";
import AuctionCard from "./auctionCard/AuctionCard";

// 경매 리스트 컴포넌트에 대한 props 타입 정의
interface AuctionListProps {
  auctions: Auction_post[] | undefined;
  actionListStatus: "error" | "pending" | "success";
}

const AuctionList: React.FC<AuctionListProps> = ({
  auctions,
  actionListStatus,
}) => {
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});

  // 각 경매에 대한 최대 입찰가를 가져오기 위한 쿼리
  const bidsQueries: any[] = useQueries({
    queries:
      auctions?.map((auction) => ({
        queryKey: ["auctionBid", auction.auction_id],
        queryFn: () =>
          fetchAuctionMaxBid(auction.auction_id).then(
            (data) => data ?? { bid_price: 0 }
          ),
      })) || [],
  });

  //  좋아요 상태를 관리하는 state
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  // 현재 로그인한 사용자의 ID를 저장하는 state
  const [userId, setUserId] = useState<string | null>(null);

  // 각 경매의 상태(경매 전, 진행중, 종료)를 관리하는 state
  const [auctionStatuses, setAuctionStatuses] = useState<
    Record<string, AuctionStatus>
  >({});

  // 경매 상태를 계산하고 상태를 업데이트하는 useEffect
  useEffect(() => {
    const newStatuses: Record<string, AuctionStatus> = {};
    auctions?.forEach((auction) => {
      const { auctionOver } = calculateAuctionStatusAndTime(
        auction.auction_start_date,
        auction.auction_end_date
      );
      newStatuses[auction.auction_id] = auctionOver;
    });
    setAuctionStatuses(newStatuses);
  }, [auctions]);

  // 사용자 로그인 상태 변경 시 userId 업데이트
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id || null);
      }
    );
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 사용자의 좋아요 상태를 불러오는 쿼리
  const { data: likeQuery, refetch: refetchLike } = useQuery({
    queryKey: ["likes", userId],
    queryFn: () => fetchLikes(userId!),
    enabled: !!userId,
  });

  // 좋아요 업데이트를 위한 뮤테이션 정의
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: (data: {
      auctionId: string;
      userId: string;
      isLiked: boolean;
    }) => updateLike(data),
    onSuccess: () => {
      // invalidateQueries 호출 시 객체 형태로 queryKey를 전달
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["likes", userId],
        });

        refetchLike();
      }
    },
  });

  //좋아요 버튼 클릭 핸들러
  const LikeButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    auctionId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      alert("로그인한 사용자만 찜 기능을 사용하실 수 있습니다");
      return;
    }

    // 좋아요 상태 토글
    const isLiked = !likes[auctionId];
    const previousLikes = { ...likes };
    const previousLikesCount = { ...likesCount };

    // 서버에 좋아요 상태 업데이트 요청
    likeMutation.mutate(
      { auctionId, userId, isLiked: !likes[auctionId] },
      {
        onSuccess: () => {
          // 요청이 성공한 후에 로컬 상태 업데이트
          setLikes({ ...likes, [auctionId]: isLiked });
          setLikesCount((prev) => ({
            ...prev,
            [auctionId]: isLiked
              ? (prev[auctionId] || 0) + 1
              : Math.max((prev[auctionId] || 1) - 1, 0),
          }));
        },
        onError: () => {
          // 오류가 발생한 경우 이전 상태로 되돌림
          setLikes(previousLikes);
          setLikesCount(previousLikesCount);
          alert("좋아요 상태 업데이트에 실패했습니다");
        },
      }
    );
  };

  return (
    <StListwrapper>
      <ul>
        {actionListStatus === "pending" &&
          Array.from({ length: 5 }, (v, i) => i).map((_, index) => (
            <SkeletonAuctionCard key={index} />
          ))}
      </ul>

      {auctions && auctions.length > 0 ? (
        <ul>
          {auctions.map((auction, index) => {
            const bidData = bidsQueries[index]?.data ?? { bid_price: 0 };
            const formattedBidPrice = bidData.bid_price.toLocaleString();
            // 경매 상태 텍스트 가져오기

            let auctionStatusText;
            const auctionStatus = auctionStatuses[auction.auction_id];

            switch (auctionStatus) {
              case AuctionStatus.READY:
                auctionStatusText = "[ 경매 전 ]";
                break;
              case AuctionStatus.START:
                auctionStatusText = "[ 진행중 ]";
                break;
              case AuctionStatus.END:
                auctionStatusText = "[ 종료 ]";
                break;
              default:
                auctionStatusText = "경매 상태 알수없음";
            }
            return (
              <AuctionCard
                auction={auction}
                formattedBidPrice={formattedBidPrice}
                auctionStatusText={auctionStatusText}
                LikeButtonClickHandler={LikeButtonClickHandler}
                likes={likes}
              />
            );
          })}
        </ul>
      ) : (
        <>
          <StNoItemMessage>
            해당 카테고리에는 경매 아이템이 없습니다.
          </StNoItemMessage>
          <StNoItemMessage>
            다른 카테고리를 선택하시거나 새로운 경매아이템을 등록해주세요.
          </StNoItemMessage>
        </>
      )}
    </StListwrapper>
  );
};

export default AuctionList;

const StListwrapper = styled.div`
  > ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    user-select: none;
    > li {
      font-size: 1.3rem;
      border: 2px solid #023e7d;
      padding: 15px 20px 15px 30px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      line-height: 2rem;
      cursor: pointer;
      border-radius: 10px;
      margin: 20px 0;
      position: relative;
      width: 1200px;
      overflow-x: hidden;
      box-shadow: 2px 3px 4px #ccc;
      @media (max-width: 1230px) {
        width: 95%;
      }
      @media (max-width: 430px) {
        flex-wrap: wrap;
      }

      h1 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      h6 {
        text-align: right;
        img {
          box-shadow: none !important;
          width: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
        @media (max-width: 590px) {
          margin-bottom: 15px;
        }
      }
      h5 {
        background-color: #fffacd;
        padding: 5px 10px;
        font-size: 1.1rem;
        font-weight: bold;
        border-radius: 5px;
        float: right;
        box-sizing: border-box;
        color: #023e7d;
        border: 1px solid #023e7d;
        right: 10px;
        text-align: center;
        bottom: 10px;
        width: 105px;
        margin-top: 14px;
      }
      p {
        width: 960px;
        height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const StNoItemMessage = styled.h4`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.3rem;
`;
