import { useEffect, useState } from "react";

interface usePaginatioProps {
  pageSize: number;
}

const usePagination = ({ pageSize }: usePaginatioProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);

  const paginate = (count: number) => {
    const pageCount = Math.ceil(count / pageSize);
    setPageCount(pageCount);
  };

  useEffect(() => {
    if (pageIndex > 0) setCanPrev(true);
    else setCanPrev(false);
    if (pageIndex < pageCount - 1) setCanNext(true);
    else setCanNext(false);
  }, [pageIndex, pageCount]);

  const goToNext = () => {
    setPageIndex((currentPage) => Math.min(currentPage + 1, pageCount));
  };

  const goToPrev = () => {
    setPageIndex((currentPage) => Math.max(currentPage - 1, 0));
  };

  return {
    paginate,
    pageIndex,
    pageCount,
    canNext,
    canPrev,
    goToNext,
    goToPrev,
  };
};

export default usePagination;
