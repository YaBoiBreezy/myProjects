import React from 'react';
import '../../style.css';

/** Types */
type sizingType = 'lg' | 'sm' | undefined;

export interface PaginationProps {
  /** Page options */
  children?: React.ReactNode;
  /** The custom 'non-default' size of pagination button group */
  size?: sizingType;
}

const Pagination = ({
    children,
    size
}: PaginationProps) => {
  const sizeName = (size === 'lg') ? 'pagination-lg' : (size === 'sm') ? 'pagination-sm' : '';
    return (
        <ul className={`pagination ${sizeName}`}>
            {children}
        </ul>
    )
};
Pagination.displayName = 'Pagination';

export default Pagination;