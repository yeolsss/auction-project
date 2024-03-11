import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import AuctionItem from "./AuctionItem";
import SkeletonAuction from "./SkeletonAuction";

interface AuctionListTypes extends React.FC<PropsWithChildren> {
  AuctionItem: typeof AuctionItem;
  SkeletonAuction: typeof SkeletonAuction;
}

const AuctionList: AuctionListTypes = ({ children }) => (
  <StListWrapper>{children}</StListWrapper>
);

AuctionList.SkeletonAuction = SkeletonAuction;
AuctionList.AuctionItem = AuctionItem;

const StListWrapper = styled.div`
  > ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    user-select: none;
    > li {
      font-size: 1.3rem;
      border: 2px solid #023e7d;
      padding: 15px 20px 15px 30px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      line-height: 2rem;
      cursor: pointer;
      border-radius: 10px;
      margin: 20px 0;
      position: relative;
      width: 1200px;
      overflow-x: hidden;
      box-shadow: 2px 3px 4px #ccc;
      @media (max-width: 1230px) {
        width: 95%;
      }
      @media (max-width: 430px) {
        flex-wrap: wrap;
      }

      h1 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
      }

      h6 {
        text-align: right;
        img {
          box-shadow: none !important;
          width: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
        @media (max-width: 590px) {
          margin-bottom: 15px;
        }
      }
      h5 {
        background-color: #fffacd;
        padding: 5px 10px;
        font-size: 1.1rem;
        font-weight: bold;
        border-radius: 5px;
        float: right;
        box-sizing: border-box;
        color: #023e7d;
        border: 1px solid #023e7d;
        right: 10px;
        text-align: center;
        bottom: 10px;
        width: 105px;
        margin-top: 14px;
      }
      p {
        width: 960px;
        height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export default AuctionList;
