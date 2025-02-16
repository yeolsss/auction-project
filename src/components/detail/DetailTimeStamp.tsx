import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { formatNumberWithCommas } from "../../common/formatUtil";
import useAuctionStatus from "../../hooks/useAuctionStatus";
import { selectorAuctionTimeStamp } from "../../redux/modules/auctionTimestampSlice";
import { selectorBidCustomModal } from "../../redux/modules/bidCustomModalSlice";
import { AuctionStatus } from "../../types/detailTypes";
import { Spacer } from "../ui/Spacer";

const DetailTimeStamp = () => {
  // 경매 상태 관리 커스텀 훅
  useAuctionStatus();
  const queryClient = useQueryClient();
  const { maxBid } = useSelector(selectorBidCustomModal);

  const { auctionOver, auctionTimeStamp } = useSelector(
    selectorAuctionTimeStamp
  );

  useEffect(() => {
    if (!maxBid) {
      (async () => {
        await queryClient.invalidateQueries({ queryKey: ["getBidMaxPrice"] });
      })();
    }
  }, [maxBid]);

  return (
    <StTimeStampWrapper>
      {auctionOver === AuctionStatus.READY && (
        <div>
          <h2>경매가 준비중입니다.</h2>
        </div>
      )}
      {auctionOver === AuctionStatus.END && (
        <div>
          {/* 경매 종료 시 낙찰자 출력 또는 불발 표시*/}
          <h2>경매가 종료되었습니다.</h2>
          <Spacer y={20} />
          {maxBid ? (
            <StBidInfoWrapper>
              <StSuccessBidWrapper>
                <span>낙찰자 : </span>
                <h1>
                  {maxBid?.nickname} ({maxBid?.user_email})
                </h1>
              </StSuccessBidWrapper>
              <Spacer y={20} />
              <StSuccessBidWrapper>
                <span>낙찰가 : </span>
                <h1>₩ {formatNumberWithCommas(maxBid?.bid_price)}</h1>
              </StSuccessBidWrapper>
            </StBidInfoWrapper>
          ) : (
            <StBidInfoWrapper>
              <StFailedBidText>유찰 되었습니다.</StFailedBidText>
            </StBidInfoWrapper>
          )}
          {/* 경매 종료 시 낙찰자 출력 또는 불발 표시*/}
        </div>
      )}

      {auctionOver === AuctionStatus.START && (
        <div>
          <h2>경매 남은시간</h2>
          <Spacer y={20} />
          <span>{auctionTimeStamp}</span>
        </div>
      )}
    </StTimeStampWrapper>
  );
};

const StTimeStampWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  text-align: center;
  h2 {
    font-size: 30px;
  }
  span {
    font-size: 24px;
  }
`;

const StBidInfoWrapper = styled.section`
  h1 {
    font-size: 30px;
  }
`;

const StSuccessBidWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  > span,
  > h1 {
    letter-spacing: 1px;
  }
`;

const StFailedBidText = styled.h1`
  color: #e84118;
`;

export default DetailTimeStamp;
