import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGetCategories } from "../../../api/auction";
import { RootStateType } from "../../../redux/config/configStore";
import { Category } from "../../../types/databaseReturnTypes";

export const fetchCategoriesSlice = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await fetchGetCategories();
    return response;
  }
);

interface CategorySlice {
  categories: Category[];
  isLoading: boolean;
}

const initialState: CategorySlice = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectedCategories: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.map((category) => {
        if (category.category_id === action.payload) {
          category.selected = !category.selected;
        }
        return category;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesSlice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategoriesSlice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
  },
});

export const { selectedCategories } = categorySlice.actions;

export const categories = (state: RootStateType) => state.category.categories;

export default categorySlice.reducer;
