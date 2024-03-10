import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import CategoryItem from "../../features/category/ui/CategoryItem";

interface CategoryTypes extends React.FC<PropsWithChildren> {
  CategoryItem: typeof CategoryItem;
}

const Category: CategoryTypes = ({ children }) => {
  return <StCategoryContainer>{children}</StCategoryContainer>;
};

Category.CategoryItem = CategoryItem;

const StCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  flex-wrap: wrap;
  margin-bottom: 20px;
  button {
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

export default Category;
