import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import useCustomInfinityQuery from "../../../hooks/useCustomInfinityQuery";
import {
  ActionOrderBy,
  Auction_post,
  Category,
} from "../../../types/databaseReturnTypes";

interface ReturnTypes {
  auctionData: Auction_post[] | undefined;
  status: "error" | "pending" | "success";
  ref: (node?: Element | null | undefined) => void;
}

const useAuctionList = (
  selectCategories: Category[],
  sortType: ActionOrderBy
): ReturnTypes => {
  const client = useQueryClient();

  const {
    data: auctionData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useCustomInfinityQuery(selectCategories, sortType);

  useEffect(() => {
    client.invalidateQueries({ queryKey: ["projects", selectCategories] });
  }, [selectCategories]);

  useEffect(() => {
    (async () => {
      await refetch();
    })();
  }, [sortType]);

  // 뷰포트 내의 요소 감지를 위한 Intersection Observer 훅
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  return {
    auctionData,
    status,
    ref,
  };
};

export default useAuctionList;
