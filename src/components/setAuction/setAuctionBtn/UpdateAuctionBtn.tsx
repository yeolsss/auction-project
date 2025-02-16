import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useUpdateAuctionMutation } from "../../../hooks/useUpdateAuctionMutation";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/config/configStore";
import { setIsAlert } from "../../../redux/modules/setAuctionSlice";
import {
  Auction_images,
  Auction_post,
  Bids,
  Update_auction_post,
} from "../../../types/databaseReturnTypes";

function UpdateAuctionBtn({
  isParams,
  data,
  bidsData,
}: {
  isParams: string;
  data?: Auction_post;
  bidsData?: Bids;
}) {
  const id = useParams();
  const [auctionId, setAuctionId] = useState(id.auctionId);
  if (auctionId) {
    const {
      imgFileList,
      imgUrlList,
      auctionTitle,
      auctionContent,
      auctionLowerPrice,
      auctionUpperPrice,
      auctionShippingType,
      auctionProductStatus,
      startDate,
      startTime,
      endDate,
      endTime,
      categoryList,
      existingCategory,
    } = useAppSelector((state) => state.setAuction);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [bidPrice, setBidPrice] = useState(0);

    useEffect(() => {
      if (bidsData) {
        setBidPrice(bidsData?.bid_price);
      }
    }, [bidsData]);

    const accessTokenJson: string | null = localStorage.getItem(
      "sb-fzdzmgqtadcebrhlgljh-auth-token"
    );
    const accessToken = accessTokenJson && JSON.parse(accessTokenJson);
    const existImgImgPath: string[] = [];
    data?.auction_images?.forEach((x) => {
      x.image_path && existImgImgPath.push(x.image_path);
    });
    const existImgImgUrl = imgUrlList.filter((url) =>
      url.includes("https://fzdzmgqtadcebrhlgljh.supabase.co/storage")
    );
    const deleteImgUrl = data?.auction_images?.filter((x) => {
      return x.image_path && !existImgImgUrl.includes(x.image_path);
    });
    const newAuctionData: Update_auction_post = {
      title: auctionTitle,
      auction_start_date: `${startDate} ${startTime}`,
      auction_end_date: `${endDate} ${endTime}`,
      product_status: auctionProductStatus,
      shipping_type: auctionShippingType,
      upper_limit: auctionUpperPrice,
      lower_limit: auctionLowerPrice,
      content: auctionContent,
      auction_status: "0", // default상태는 0
      user_id: accessToken.user.id,
      category_id:
        categoryList === "" ? existingCategory?.category_id : categoryList,
    };
    const updateAuctionData: {
      newAuctionData: Update_auction_post;
      imgFileList: File[];
      deleteImgUrl?: Auction_images[];
      auctionId?: string;
    } = { newAuctionData, imgFileList, deleteImgUrl, auctionId };
    const { mutate } = useUpdateAuctionMutation();

    const onclickUpdateAuctionHandler = () => {
      if (
        data?.title === auctionTitle &&
        data?.content === auctionContent &&
        moment(data?.auction_start_date).format("YYYY-MM-DD-HH:mm") ===
          startDate + "-" + startTime &&
        moment(data?.auction_end_date).format("YYYY-MM-DD-HH:mm") ===
          endDate + "-" + endTime &&
        // && data?.upper_limit === +auctionUpperPrice
        data?.lower_limit === +auctionLowerPrice &&
        data?.shipping_type === auctionShippingType &&
        data?.product_status === auctionProductStatus &&
        data?.category_id === existingCategory?.category_id &&
        _.isEqual(existImgImgPath, imgUrlList)
      ) {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "수정사항이 없습니다" })
        );
        return false;
      } else if (imgUrlList.length === 0) {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "이미지를 등록해 주세요" })
        );
        return false;
      } else if (auctionTitle === "") {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "경매품 이름을 입력해 주세요" })
        );
        return false;
      } else if (auctionTitle.length > 10) {
        dispatch(
          setIsAlert({
            isAlert: true,
            ErrorMsg: "경매품 이름은 10글자 이하로 작성해 주세요",
          })
        );
        return false;
      } else if (auctionContent === "") {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "경매품 소개를 작성해 주세요" })
        );
        return false;
      } else if (auctionContent.length > 100) {
        dispatch(
          setIsAlert({
            isAlert: true,
            ErrorMsg: "경매품 소개는 100글자 이하로 작성해 주세요",
          })
        );
        return false;
      } else if (data?.lower_limit !== +auctionLowerPrice) {
        dispatch(
          setIsAlert({
            isAlert: true,
            ErrorMsg: "경매진행 중 가격을 변경할 수 없습니다",
          })
        );
        return false;
      } else if (
        moment(data?.auction_start_date).format("YYYY-MM-DD-HH:mm") !==
        startDate + "-" + startTime
      ) {
        dispatch(
          setIsAlert({
            isAlert: true,
            ErrorMsg: "경매진행 중 시작날짜를 변경할 수 없습니다",
          })
        );
        return false;
      }
      //  else if (bidPrice < auctionLowerPrice) {
      //   dispatch(
      //     setIsAlert({ isAlert: true, ErrorMsg: "최소 입찰가격은 현재 입찰금액보다 낮을 수 없습니다 " })
      //   );
      //   return false;
      // }
      // else if (auctionUpperPrice === 0) {
      //   dispatch(
      //     setIsAlert({ isAlert: true, ErrorMsg: "최대금액을 입력해 주세요" })
      //   );
      //   return false;
      // } else if (auctionLowerPrice > auctionUpperPrice) {
      //   dispatch(
      //     setIsAlert({
      //       isAlert: true,
      //       ErrorMsg: "최소금액은 최대금액보다 작아야 합니다",
      //     })
      //   );
      //   return false;
      // }
      else if (isNaN(auctionLowerPrice) || isNaN(auctionUpperPrice)) {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "숫자만 입력해 주세요" })
        );
        return false;
      } else if (auctionShippingType === "") {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "배송유형을 선택해 주세요" })
        );
        return false;
      } else if (auctionProductStatus === "") {
        dispatch(
          setIsAlert({ isAlert: true, ErrorMsg: "상품상태를 선택해 주세요" })
        );
        return false;
      } else {
        mutate(updateAuctionData);
      }
    };
    return (
      <StButtonWrapper>
        <StButton
          $isParams={isParams}
          onClick={() => {
            onclickUpdateAuctionHandler();
          }}
        >
          <StPlus className="plus" />
        </StButton>
      </StButtonWrapper>
    );
  }
  return <></>;
}

export default UpdateAuctionBtn;

const StButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  visibility: hidden;
  width: 1200px;
  margin: 0;
  height: 100vh;
`;

const StButton = styled.button<{ $isParams?: string }>`
  position: absolute;
  right: 0%;
  bottom: 5%;
  background-color: #023e7d;
  visibility: visible;
  width: 6em;
  height: 6em;
  border: 0;
  border-radius: 1em;
  cursor: pointer;
  box-shadow: 0 0 0.5em 0 #023e7d;
  transition: 0.1s;
  &:hover {
    background-color: #fffacd;
    &::before {
      position: absolute;
      color: #023e7d;
      top: -2em;
      left: 50%;
      width: 5em;
      font-size: 2em;
      transform: translateX(-50%);
      content: "${({ $isParams }) => $isParams}";
    }
  }
  &:hover > .plus {
    color: #023e7d;
  }
`;
const StPlus = styled(FaPlus)`
  font-size: 3em;
  color: #fffacd;
`;
