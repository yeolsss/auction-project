import placeholder from "../../../images/placeholder.svg";
import { Auction_post, MaxBids } from "../../../types/databaseReturnTypes";
import { AuctionStatus } from "../../../types/detailTypes";
import { getAuctionStatusText } from "../../../util/home";
import AuctionCardImage from "./AuctionCardImage";
import AuctionInfo from "./AuctionInfo";

interface Props {
  auction: Auction_post;
  bidsQueries: MaxBids[];
  handler: () => void;
  index: number;
  auctionStatuses: Record<string, AuctionStatus>;
  likes: {
    [key: string]: boolean;
  };
  LikeButtonClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    auctionId: string
  ) => void;
}

const AuctionCard: React.FC<Props> = ({
  auction,
  bidsQueries,
  handler,
  index,
  auctionStatuses,
  likes,
  LikeButtonClickHandler,
}) => {
  const bidData = bidsQueries[index] ?? { bid_price: 0 };
  const formattedBidPrice = bidData.bid_price.toLocaleString();
  const auctionStatusText = getAuctionStatusText(
    auctionStatuses[auction.auction_id]
  );

  return (
    <li onClick={handler}>
      <AuctionCardImage auctionStatusText={auctionStatusText}>
        <span>
          <AuctionCardImage.Image
            src={
              auction.auction_images && auction.auction_images.length > 0
                ? auction.auction_images[0].image_path
                : placeholder
            }
            alt={"Auction"}
          />
        </span>
        <AuctionCardImage.LikeButton
          isLiked={likes[auction.auction_id]}
          onLike={(e) => LikeButtonClickHandler(e, auction.auction_id)}
        />
      </AuctionCardImage>

      <AuctionInfo auction={auction} formattedBidPrice={formattedBidPrice} />
    </li>
  );
};

export default AuctionCard;
