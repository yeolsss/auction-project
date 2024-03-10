import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import SortButton from "../button/SortButton";

interface SortTypes extends React.FC<PropsWithChildren> {
  SortButton: typeof SortButton;
}

const Sort: SortTypes = ({ children }) => (
  <StSortWrapper>{children}</StSortWrapper>
);

Sort.SortButton = SortButton;

const StSortWrapper = styled.div`
  width: 1200px;
  display: flex;
  margin: 20px auto;
  justify-content: flex-end;
  user-select: none;
  background-color: #eee;
  padding: 15px 10px;
  border-radius: 5px;
  @media (max-width: 1200px) {
    width: 98%;
  }
`;

export default Sort;
