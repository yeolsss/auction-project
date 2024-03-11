const AuctionList = () => null;
export default AuctionList;
/* import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { calculateAuctionStatusAndTime } from "../../common/dayjs";
import AuctionCard from "../../features/auctionList/ui/AuctionCard";
import SkeletonAuctionCard from "../../features/auctionList/ui/SkeletonAuctionCard";
import { supabase } from "../../supabase";
import { Auction_post } from "../../types/databaseReturnTypes";
import { AuctionStatus } from "../../types/detailTypes";

interface AuctionListProps {
  auctions: Auction_post[] | undefined;
  actionListStatus: "error" | "pending" | "success";
}

const AuctionList: React.FC<AuctionListProps> = ({
  auctions,
  actionListStatus,
}) => {
  // 현재 로그인한 사용자의 ID를 저장하는 state
  const [userId, setUserId] = useState<string | null>(null);

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
 */
