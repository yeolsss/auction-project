import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchLikes, updateLike } from "../../../api/likes";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";

interface ReturnTypes {
  LikeButtonClickHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
    auctionId: string
  ) => void;
  likes: { [key: string]: boolean };
}

const useLike = (): ReturnTypes => {
  const user = useGetAuthInfo();
  const userId = user?.user.id;
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});
  //  좋아요 상태를 관리하는 state
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  const queryClient = useQueryClient();

  // 사용자의 좋아요 상태를 불러오는 쿼리
  const { data: likeQuery, refetch: refetchLike } = useQuery({
    queryKey: ["likes", userId],
    queryFn: () => fetchLikes(userId!),
    enabled: !!userId,
  });

  // 좋아요 업데이트를 위한 뮤테이션 정의

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

  return {
    LikeButtonClickHandler,
    likes,
  };
};

export default useLike;
