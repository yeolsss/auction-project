import { PropsWithChildren } from "react";
import { styled } from "styled-components";

interface Props {
  selectedSort: boolean;
  handler: () => void;
}

const SortButton: React.FC<PropsWithChildren<Props>> = ({
  selectedSort,
  children,
  handler,
}) => (
  <StSortButton $selectedSort={selectedSort} onClick={handler}>
    {children}
  </StSortButton>
);

const StSortButton = styled.button<{ $selectedSort: boolean }>`
  border: none;
  font-size: 1.2rem;
  padding: 5px 10px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  background-color: transparent;
  color: ${({ $selectedSort }) => ($selectedSort ? "#023e7d" : "inherit")};

  &:last-of-type {
    margin-left: 10px;
  }
  &:hover {
    background-color: #fffacd;
  }
`;

export default SortButton;
