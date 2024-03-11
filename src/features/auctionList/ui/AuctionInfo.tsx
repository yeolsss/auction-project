import { styled } from "styled-components";
import { transDate } from "../../../common/dayjs";
import clock from "../../../images/clock.svg";
import coin from "../../../images/coin.svg";
import end from "../../../images/end.svg";
import flag from "../../../images/flag.svg";
import heart from "../../../images/thin_heart.svg";

import { Auction_post } from "../../../types/databaseReturnTypes";

interface Props {
  auction: Auction_post;
  formattedBidPrice: string;
}

const AuctionInfo: React.FC<Props> = ({ auction, formattedBidPrice }) => {
  return (
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
  );
};

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

export default AuctionInfo;
