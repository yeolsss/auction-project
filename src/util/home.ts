import { AuctionStatus } from "../types/detailTypes";

export const getAuctionStatusText = (auctionStatus: AuctionStatus) => {
  // 경매 상태 텍스트 가져오기

  let auctionStatusText;

  switch (auctionStatus) {
    case AuctionStatus.READY:
      return (auctionStatusText = "[ 경매 전 ]");
    case AuctionStatus.START:
      return (auctionStatusText = "[ 진행중 ]");
    case AuctionStatus.END:
      return (auctionStatusText = "[ 종료 ]");
    default:
      return (auctionStatusText = "경매 상태 알수없음");
  }
};

/* copnst;

const bidData = bidsQueries[index] ?? { bid_price: 0 };
const formattedBidPrice = bidData.bid_price.toLocaleString();
const auctionStatusText = getAuctionStatusText(
  auctionStatuses[auction.auction_id]
);
 */
