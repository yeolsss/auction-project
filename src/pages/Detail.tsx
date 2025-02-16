import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailContent from "../components/detail/DetailContent";
import DetailInfo from "../components/detail/DetailInfo";
import DetailTimeStamp from "../components/detail/DetailTimeStamp";
import { Spacer } from "../components/ui/Spacer";
import placeholder from "../images/placeholder.svg";
import { Skeleton } from "antd";
import useAuctionPostData from "../hooks/useAuctionPostData";
import useSubscribeBidTable from "../hooks/useSubscribeBidTable";
import BidPopUpLayout from "../components/detail/bidPopup/BidPopUpLayout";
import useCloseButtonState from "../hooks/useCloseButtonState";
import PopupToggleButton from "../components/detail/bidPopup/PopupToggleButton";
import DetailWrapper from "../components/ui/detailWrapper/DetailWrapper";
import { QnaWrapper } from "../components/detail/qna/QnaWrapper";
import DetailCarousel from "../components/detail/DetailCarousel";
import Title from "../components/detail/bidPopup/Title";

const Detail = () => {
  const { auctionId } = useParams();
  const [data, isLoading] = useAuctionPostData(auctionId!);
  const [isPopupState, onClickHandler] = useCloseButtonState();
  // auction 가격 갱신 구독
  useSubscribeBidTable(auctionId!);

  return (
    <StDetailWrapper>
      <StDetailInfo>
        <StDetailImgWrapper>
          {isLoading ? (
            <StSkeletonImageWrapper
              active
              style={{ width: "100%", height: "100%" }}
            />
          ) : data?.auction_images?.length ? (
            <DetailCarousel images={data?.auction_images} title={data?.title} />
          ) : (
            <img src={placeholder} alt={data?.title} />
          )}
        </StDetailImgWrapper>

        <Skeleton
          loading={isLoading}
          active
          title
          paragraph={{ rows: 8 }}
          style={{ maxWidth: "300px", width: "100%", height: "100%" }}
        >
          <DetailInfo />
        </Skeleton>
      </StDetailInfo>
      <Spacer y={40} />

      <Skeleton
        loading={isLoading}
        active
        title
        style={{ width: "500px", height: "100%", margin: "0 auto" }}
      >
        <DetailTimeStamp />
      </Skeleton>

      <Spacer y={20} />

      <DetailWrapper>
        <Skeleton
          loading={isLoading}
          active
          paragraph={{ rows: 10 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Title title={"상품설명"} titleAlign={"flex-start"} />
          <Spacer y={10} />
          <DetailContent />
        </Skeleton>
      </DetailWrapper>

      <DetailWrapper>
        <Skeleton
          loading={isLoading}
          active
          paragraph={{ rows: 10 }}
          style={{ width: "100%", height: "100%" }}
        >
          <QnaWrapper />
        </Skeleton>
      </DetailWrapper>

      <PopupToggleButton forwardHandler={onClickHandler} />

      {isPopupState && <BidPopUpLayout forwardHandler={onClickHandler} />}
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 100px auto 0;
  position: relative;
`;

const StDetailInfo = styled.section`
  display: flex;
  column-gap: 45px;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
`;

const StDetailImgWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  > img {
    width: 100%;
  }
`;

export const StSkeletonImageWrapper = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100%;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
export default React.memo(Detail);
