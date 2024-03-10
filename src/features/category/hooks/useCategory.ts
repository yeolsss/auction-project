import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/config/configStore";
import { Category } from "../../../types/databaseReturnTypes";
import {
  categories as categoriesSlice,
  fetchCategoriesSlice,
  selectedCategories,
} from "../slice/categorySlice";

interface ReturnTypes {
  categories: Category[];
  selectCategories: Category[];
  handleOnClickCategory: (category_id: string) => void;
}

const useCategory = (): ReturnTypes => {
  const dispatch = useAppDispatch();
  const categories = useSelector(categoriesSlice);
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const handleOnClickCategory = (category_id: string) => {
    dispatch(selectedCategories(category_id));
  };

  useEffect(() => {
    dispatch(fetchCategoriesSlice());
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectCategories(categories.filter((category) => category.selected));
    }
  }, [categories]);

  return { categories, selectCategories, handleOnClickCategory };
};

export default useCategory;
