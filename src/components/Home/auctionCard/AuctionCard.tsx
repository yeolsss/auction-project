import placeholder from "../../../images/placeholder.svg";
import LikeButton from "../LikeButton";
import clock from "../../../images/clock.svg";
import { transDate } from "../../../common/dayjs";
import flag from "../../../images/flag.svg";
import end from "../../../images/end.svg";
import coin from "../../../images/coin.svg";
import heart from "../../../images/thin_heart.svg";
import { Auction_post } from "../../../types/databaseReturnTypes";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

interface Props {
  auction: Auction_post;
  formattedBidPrice: string;
  auctionStatusText: string;
  LikeButtonClickHandler: (
    event: React.MouseEvent<HTMLButtonElement>,
    auctionId: string
  ) => void;
  likes: { [key: string]: boolean };
}

const AuctionCard = ({
  auction,
  formattedBidPrice,
  auctionStatusText,
  LikeButtonClickHandler,
  likes,
}: Props) => {
  const navigate = useNavigate();

  return (
    <li
      key={auction.auction_id}
      onClick={() => navigate(`/detail/${auction.auction_id}`)}
    >
      <StStatusImageWrapper>
        <h3>{auctionStatusText}</h3>
        <span>
          <img
            src={
              auction.auction_images && auction.auction_images.length > 0
                ? auction.auction_images[0].image_path
                : placeholder
            }
            alt="Auction"
          />
          <LikeButton
            isLiked={likes[auction.auction_id]}
            onLike={(e) => LikeButtonClickHandler(e, auction.auction_id)}
          />
        </span>
      </StStatusImageWrapper>

      <StInfoContainer>
        <h6>
          <img src={clock} alt="Clock" />
          {transDate(auction.created_at)}
        </h6>
        <h1>{auction.title}</h1>
        <p>{auction.content}</p>
        <div>
          <h3>
            <img src={flag} alt={"flag"} />
            &nbsp;
            {transDate(auction.auction_start_date)} 시작
          </h3>
          <h3>
            <img src={end} alt={"end"} /> &nbsp;
            {transDate(auction.auction_end_date)} 마감
          </h3>
          <h3>
            <img src={coin} alt={"coin"} /> &nbsp;시작 가격 ₩
            {auction.lower_limit.toLocaleString()}
          </h3>
          <h3>
            <img src={heart} alt={heart} />
            &nbsp; 좋아요 {auction?.auction_like.length}
          </h3>
        </div>

        <StNowPrice>현재 입찰 가격 ₩{formattedBidPrice}</StNowPrice>
        {auction.category && <h5>{auction.category.category_name}</h5>}
      </StInfoContainer>
    </li>
  );
};
export default AuctionCard;

const StInfoContainer = styled.div`
  width: calc(100% - 180px);

  div {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    align-items: center;
    @media (max-width: 935px) {
      flex-wrap: wrap;
    }

    img {
      height: 25px;
      vertical-align: middle;
    }
    @media (max-width: 430px) {
      gap: 0;
    }
  }

  @media (max-width: 430px) {
    margin-top: 10px;
    width: 100%;
  }

  h3 {
    @media (max-width: 430px) {
      width: 100%;

      line-height: 3rem;
    }
  }
`;

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

const StStatus = styled.h3`
  text-align: right;
  color: #023e7d;
  font-weight: 600;
`;

const StNowPrice = styled.h2`
  font-size: 1.6rem;
  text-align: right;

  font-weight: bold;
  color: #023e7d;
  justify-content: flex-end;

  display: flex;
  p {
    background-color: yellow;

    &:first-of-type {
      background-color: green;
    }
  }
  @media (max-width: 590px) {
    margin-top: 20px;
  }
`;
