import { styled } from "styled-components";

const AuctionEmptyList = () => {
  return (
    <>
      <StNoItemMessage>
        해당 카테고리에는 경매 아이템이 없습니다.
      </StNoItemMessage>
      <StNoItemMessage>
        다른 카테고리를 선택하시거나 새로운 경매아이템을 등록해주세요.
      </StNoItemMessage>
    </>
  );
};
const StNoItemMessage = styled.h4`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.3rem;
`;
export default AuctionEmptyList;
