import { useNavigate } from "react-router-dom";
import useAuctionBid from "../features/auctionList/hooks/useAuctionBid";
import useAuctionList from "../features/auctionList/hooks/useAuctionList";
import useLike from "../features/auctionList/hooks/useLike";
import AuctionCard from "../features/auctionList/ui/AuctionCard";
import AuctionEmptyList from "../features/auctionList/ui/AuctionEmptyList";
import AuctionList from "../features/auctionList/ui/AuctionList";
import useCategory from "../features/category/hooks/useCategory";
import Category from "../features/category/ui/Category";
import useSort from "../features/sort/hooks/useSort";
import Sort from "../features/sort/ui/Sort";
import { ActionOrderBy } from "../types/databaseReturnTypes";

const Home = () => {
  const { categories, selectCategories, handleOnClickCategory } = useCategory();
  const { sortType, handleOnClickSort } = useSort();
  const { auctionData, status, ref } = useAuctionList(
    selectCategories,
    sortType
  );
  const { LikeButtonClickHandler, likes } = useLike();
  const { bidsQueries, auctionStatuses } = useAuctionBid(auctionData);

  const navigate = useNavigate();

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
        <AuctionList>
          {status === "pending" &&
            Array.from({ length: 5 }, (v, i) => i).map((_, index) => (
              <AuctionList.SkeletonAuction>
                <AuctionList.SkeletonAuction.SkeletonAuctionCard key={index} />
              </AuctionList.SkeletonAuction>
            ))}

          {auctionData && auctionData.length > 0 ? (
            <ul>
              {auctionData.map((auction, index) => {
                return (
                  <AuctionCard
                    auction={auction}
                    bidsQueries={bidsQueries}
                    handler={() => navigate(`/detail/${auction.auction_id}`)}
                    index={index}
                    auctionStatuses={auctionStatuses}
                    likes={likes}
                    LikeButtonClickHandler={LikeButtonClickHandler}
                  />
                );
              })}
            </ul>
          ) : (
            <AuctionEmptyList />
          )}
        </AuctionList>

        <div ref={ref} style={{ height: "20px" }}></div>
      </div>
      {/* 무한 스크롤을 위한 참조 요소 */}
      <div ref={ref} style={{ height: "20px" }}></div>
    </>
  );
};

export default Home;
