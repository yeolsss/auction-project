import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import Image from "../../../components/image/Image";
import LikeButton from "./LikeButton";

interface Props {
  auctionStatusText: string;
}

interface AuctionCardImageTypes extends React.FC<PropsWithChildren<Props>> {
  Image: typeof Image;
  LikeButton: typeof LikeButton;
}

const AuctionCardImage: AuctionCardImageTypes = ({
  auctionStatusText,
  children,
}) => {
  return (
    <StStatusImageWrapper>
      <h3>{auctionStatusText}</h3>
      <span>{children}</span>
    </StStatusImageWrapper>
  );
};

AuctionCardImage.Image = Image;
AuctionCardImage.LikeButton = LikeButton;

export default AuctionCardImage;

const StStatusImageWrapper = styled.div`
  @media (max-width: 430px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h3 {
    text-align: center;
    color: #023e7d;
    font-weight: 600;
    margin-bottom: 5px;
  }
  span {
    overflow: hidden;
    width: 150px;
    display: block;
    height: 150px;

    position: relative;
    border: 2px solid #eee;
    border-radius: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
      vertical-align: middle;
      margin: auto;
    }
  }

  @media (max-width: 430px) {
    width: 100%;
  }
`;
