import OriginPagination from './Pagination';
import PaginationButton from './PaginationButton';

export type PaginationProps = typeof OriginPagination & {
  Button: typeof PaginationButton;
};

const Pagination = OriginPagination as PaginationProps;

Pagination.Button = PaginationButton;

export default Pagination;