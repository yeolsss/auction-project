import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import Category from "../components/category/Category";
import AuctionList from "../components/Home/AuctionList";
import Sort from "../components/sort/Sort";
import useCategory from "../features/category/hooks/useCategory";
import useSort from "../features/sort/hooks/useSort";
import useCustomInfinityQuery from "../hooks/useCustomInfinityQuery";
import { ActionOrderBy } from "../types/databaseReturnTypes";
const Home = () => {
  const { categories, selectCategories, handleOnClickCategory } = useCategory();
  const { sortType, handleOnClickSort } = useSort();

  const client = useQueryClient();

  // 사용자 정의 무한 스크롤 쿼리 훅
  const {
    data: auctionData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useCustomInfinityQuery(selectCategories, sortType);

  useEffect(() => {
    // 선택된 카테고리가 바뀔 때마다 쿼리를 리셋
    client.invalidateQueries({ queryKey: ["projects", selectCategories] });
  }, [selectCategories]);

  useEffect(() => {
    // sortType 값이 변경될 때마다 쿼리를 무효화
    (async () => {
      await refetch();
    })();
  }, [sortType]);

  // 뷰포트 내의 요소 감지를 위한 Intersection Observer 훅
  const { ref } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  return (
    <>
      <div>
        {/* 카테고리 선택 컴포넌트 */}
        <Category>
          {categories.map((category) => (
            <Category.CategoryItem
              key={category.category_id!}
              selected={category.selected!}
            >
              <Category.CategoryItem.Button
                handler={() => handleOnClickCategory(category.category_id!)}
              >
                {category.category_name}
              </Category.CategoryItem.Button>
            </Category.CategoryItem>
          ))}
        </Category>

        {/* 경매 목록 컴포넌트 */}
        <Sort>
          <Sort.SortButton
            selectedSort={ActionOrderBy.TITLE === sortType}
            handler={() => handleOnClickSort(ActionOrderBy.TITLE)}
          >
            이름순
          </Sort.SortButton>

          <Sort.SortButton
            selectedSort={ActionOrderBy.CREATED_AT === sortType}
            handler={() => handleOnClickSort(ActionOrderBy.CREATED_AT)}
          >
            최신순
          </Sort.SortButton>
        </Sort>

        {/* auction List Component */}
        <AuctionList auctions={auctionData} actionListStatus={status} />
        <div ref={ref} style={{ height: "20px" }}></div>
      </div>
      {/* 무한 스크롤을 위한 참조 요소 */}
      <div ref={ref} style={{ height: "20px" }}></div>
    </>
  );
};

export default Home;

const StSortButton = styled.div`
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
  button {
    border: none;
    font-size: 1.2rem;
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
    background-color: transparent;
    &:last-of-type {
      margin-left: 10px;
    }
    &:hover {
      background-color: #fffacd;
    }
  }
`;
