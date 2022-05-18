import React from 'react';
import '../../style.css';

type ListType = 'ul' | 'ol' | 'dl' | 'alpha' | 'roman' | undefined;
type ColumnSizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

export interface ListProps {
  /** the contents of the list */
  children?: React.ReactNode;
  /** the type of list desired */
  type?: ListType;
  /** removes bullets or numbers from the list */
  unstyled?: boolean;
  /** removes bullets or numbers from a nested list (maintains indenting) */
  none?: boolean;
  /** increases the white space between items */
  spaced?: boolean;
  /** selects the case for roman or alpha lists (XI. A.  vs  xi. a.) */
  upper?: boolean;
  /** horizontally aligns list items */
  inline?: boolean;
  /** for dl lists, puts definitions inline with their definition term */
  horizontal?: boolean;
  /** for dl horizontal lists, controls borders */
  border?: boolean;
  /** width of columns for list spread over multiple columns */
  columnSize?: ColumnSizeType;
  /** number of columns for list spread over multiple columns */
  colCount?: number;
  /** **recommended** when screen is too small for selected colCount, make list default to maximum colcount instead of 1 */
  colCountDefaultMax?: boolean;
}

const List = ({
  children,
  type = 'ul',
  unstyled = false,
  none = false,
  spaced = false,
  upper = false,
  inline = false,
  horizontal = false,
  border = true,
  columnSize,
  colCount = 1,
  colCountDefaultMax = true,
}: ListProps) => {
  const Tag =
    type === 'dl'
      ? 'dl'
      : type === 'ol' || type === 'alpha' || type === 'roman'
      ? 'ol'
      : 'ul';
  const classStyling = unstyled ? 'list-unstyled' : '';
  const classNone = none ? 'lst-none' : '';
  const classSpaced = spaced ? 'lst-spcd' : '';
  const classAlphaRoman =
    type === 'alpha'
      ? upper
        ? 'lst-upr-alph'
        : 'lst-lwr-alph'
      : type === 'roman'
      ? upper
        ? 'lst-upr-rmn'
        : 'lst-lwr-rmn'
      : '';
  const classInline = inline ? 'list-inline' : '';
  const classHorizontal = type === 'dl' && horizontal ? 'dl-horizontal' : '';
  const classBorder = type === 'dl' && horizontal && !border ? 'brdr-0' : '';
  const colSize = columnSize === undefined ? 'sm' : columnSize;
  const classColumns =
    type === 'ul' || type === 'ol' || type === 'roman' || type === 'alpha'
      ? colCount === 2
        ? `colcount-${colSize}-2`
        : colCount === 3
        ? colCountDefaultMax
          ? `colcount-${colSize}-2 colcount-${colSize}-3`
          : `colcount-${colSize}-3`
        : colCount > 3
        ? colCountDefaultMax
          ? `colcount-${colSize}-2 colcount-${colSize}-3 colcount-${colSize}-4`
          : `colcount-${colSize}-4`
        : ''
      : '';

  return (
    <Tag
      className={`${classStyling} ${classNone} ${classSpaced} ${classAlphaRoman} ${classInline} ${classHorizontal} ${classBorder} ${classColumns}`}
    >
      {children}
    </Tag>
  );
};
List.displayName = 'List';

export default List;
