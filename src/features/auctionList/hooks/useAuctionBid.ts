import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchAuctionMaxBid } from "../../../api/bid";
import { calculateAuctionStatusAndTime } from "../../../common/dayjs";
import { Auction_post, MaxBids } from "../../../types/databaseReturnTypes";
import { AuctionStatus } from "../../../types/detailTypes";

interface ReturnTypes {
  bidsQueries: MaxBids[];
  auctionStatuses: Record<string, AuctionStatus>;
}

const useAuctionBid = (auctions: Auction_post[] | undefined): ReturnTypes => {
  const queries =
    auctions?.map((auction) => ({
      queryKey: ["auctionBid", auction.auction_id],
      queryFn: () => fetchAuctionMaxBid(auction.auction_id),
      enabled: !!auction.auction_id,
    })) || [];

  const bidsQueriesResults = useQueries({
    queries: queries,
  });

  const bidsQueries: MaxBids[] = bidsQueriesResults.map(
    (result) =>
      result.data ??
      ({
        auction_id: "temp",
        user_id: "temp",
        created_at: "temp",
        user_email: "temp",
        nickname: "temp",
        bid_price: 0,
      } as MaxBids)
  );

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

  return { bidsQueries, auctionStatuses };
};

export default useAuctionBid;
