import { PropsWithChildren } from "react";
import SkeletonAuctionCard from "./SkeletonAuctionCard";

interface SkeletonAuctionTypes extends React.FC<PropsWithChildren> {
  SkeletonAuctionCard: typeof SkeletonAuctionCard;
}

const SkeletonAuction: SkeletonAuctionTypes = ({ children }) => {
  return <ul>{children}</ul>;
};
SkeletonAuction.SkeletonAuctionCard = SkeletonAuctionCard;

export default SkeletonAuction;
