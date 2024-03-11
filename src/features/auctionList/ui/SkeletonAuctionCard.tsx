import { styled } from "styled-components";
import { Skeleton } from "antd";

const SkeletonAuctionCard = () => {
  return (
    <StSkeletonWrapper>
      <StSkeletonImageWrapper>
        <StSkeletonImage active style={{ width: "100%", height: "100%" }} />
      </StSkeletonImageWrapper>
      <StSkeletonTextWrapper>
        <Skeleton
          loading={true}
          active
          title
          paragraph={{ rows: 2 }}
          style={{ maxWidth: "300px", width: "100%", height: "100%" }}
        />
      </StSkeletonTextWrapper>
      <StSkeletonTextWrapper>
        <Skeleton
          loading={true}
          active
          title
          paragraph={{ rows: 3 }}
          style={{ maxWidth: "300px", width: "100%", height: "100%" }}
        />
      </StSkeletonTextWrapper>
    </StSkeletonWrapper>
  );
};

const StSkeletonWrapper = styled.li`
  display: flex;
  justify-content: space-between;
`;
const StSkeletonTextWrapper = styled.div`
  flex: 2;
`;

const StSkeletonImageWrapper = styled.div`
  flex: 1;
`;
const StSkeletonImage = styled(Skeleton.Image)`
  width: 15rem !important;
  height: 15rem;
  overflow: hidden;
  > svg {
    width: 100%;
    height: 100%;
  }
`;

export default SkeletonAuctionCard;
