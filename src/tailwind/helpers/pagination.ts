import { formatNumber } from './numbers';

const DELTA = 2;

export const ELLIPSIS = '...';

type Ellipsis = typeof ELLIPSIS;

export type NumberOrEllipsis = number | Ellipsis;

const range = (from: number, to: number): number[] => Array.from({ length: to - from }, (_, i) => from + i);

export const progressivePagination = (currentPage: number, pageCount: number): NumberOrEllipsis[] => {
  const pages: NumberOrEllipsis[] = range(
    Math.max(DELTA, currentPage - DELTA),
    Math.min(pageCount - 1, currentPage + DELTA) + 1,
  );

  if (currentPage - DELTA > DELTA) {
    pages.unshift(ELLIPSIS);
  }
  if (currentPage + DELTA < pageCount - 1) {
    pages.push(ELLIPSIS);
  }

  pages.unshift(1);
  pages.push(pageCount);

  return pages;
};

export const pageIsEllipsis = (pageNumber: NumberOrEllipsis): pageNumber is Ellipsis => pageNumber === ELLIPSIS;

export const prettifyPageNumber = (pageNumber: NumberOrEllipsis): string => (
  pageIsEllipsis(pageNumber) ? pageNumber : formatNumber(pageNumber)
);

export const keyForPage = (pageNumber: NumberOrEllipsis, index: number) => (
  !pageIsEllipsis(pageNumber) ? `${pageNumber}` : `${pageNumber}_${index}`
);
