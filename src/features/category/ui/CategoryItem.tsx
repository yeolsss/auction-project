import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import Button from "../../../components/button/Button";

interface Props {
  selected: boolean;
}

interface CategoryItemTypes extends React.FC<PropsWithChildren<Props>> {
  Button: typeof Button;
}

const CategoryItem: CategoryItemTypes = ({ selected, children }) => {
  return (
    <StCategoryContainer $selected={selected}>{children}</StCategoryContainer>
  );
};

CategoryItem.Button = Button;

const StCategoryContainer = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  user-select: none;
  flex-wrap: wrap;
  margin-bottom: 20px;
  button {
    background-color: ${(props) =>
      props.$selected ? "#fffacd" : "transparent"};
    width: 130px;
    height: 50px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 1.5rem;
    border: 2px solid #023e7d;
    margin: 10px;
    &:hover {
      background-color: #fffacd !important;
    }
  }
`;

export default CategoryItem;
