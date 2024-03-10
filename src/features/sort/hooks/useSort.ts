import { useCallback, useState } from "react";
import { ActionOrderBy } from "../../../types/databaseReturnTypes";

interface ReturnTypes {
  sortType: ActionOrderBy.CREATED_AT | ActionOrderBy.TITLE;
  handleOnClickSort: (
    selectedSort: ActionOrderBy.TITLE | ActionOrderBy.CREATED_AT
  ) => void;
}

const useSort = (): ReturnTypes => {
  const [sortType, setSortType] = useState<
    ActionOrderBy.CREATED_AT | ActionOrderBy.TITLE
  >(ActionOrderBy.CREATED_AT);

  const handleOnClickSort = useCallback(
    (selectedSort: ActionOrderBy.TITLE | ActionOrderBy.CREATED_AT) =>
      setSortType(selectedSort),
    []
  );

  return { sortType, handleOnClickSort };
};
export default useSort;
