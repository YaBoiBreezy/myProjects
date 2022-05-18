import React from 'react';
import CellRB from 'react-bootstrap/Col';
import '../../style.css';

type sizeType = 'xs' | 'sm' | 'md' | 'lg' | undefined;

export interface GridCellProps extends React.HTMLAttributes<HTMLElement> {
  /** The content of the Grid cell */
  children?: React.ReactNode;
  /** replace cell with clearfix command to fix spacing of certain size cells */
  clearfix?: sizeType;
  /** cell width for xs viewers */
  xsWidth?: number;
  /** cell width for sm viewers */
  smWidth?: number;
  /** cell width for md viewers */
  mdWidth?: number;
  /** cell width for lg viewers */
  lgWidth?: number;
  /** cell offset for xs viewers */
  xsOffset?: number;
  /** cell offset for sm viewers */
  smOffset?: number;
  /** cell offset for md viewers */
  mdOffset?: number;
  /** cell offset for lg viewers */
  lgOffset?: number;
  /** cell push for xs viewers */
  xsPush?: number;
  /** cell push for sm viewers */
  smPush?: number;
  /** cell push for md viewers */
  mdPush?: number;
  /** cell push for lg viewers */
  lgPush?: number;
  /** cell pull for xs viewers */
  xsPull?: number;
  /** cell pull for sm viewers */
  smPull?: number;
  /** cell pull for md viewers */
  mdPull?: number;
  /** cell pull for lg viewers */
  lgPull?: number;
}

const GridCell = ({
  children,
  clearfix = undefined,
  xsWidth = 0,
  smWidth = 0,
  mdWidth = 0,
  lgWidth = 0,
  xsOffset = 0,
  smOffset = 0,
  mdOffset = 0,
  lgOffset = 0,
  xsPush = 0,
  smPush = 0,
  mdPush = 0,
  lgPush = 0,
  xsPull = 0,
  smPull = 0,
  mdPull = 0,
  lgPull = 0,
}: GridCellProps) => {
  const xsWidthName = xsWidth === 0 ? '' : `col-xs-${xsWidth}`;
  const smWidthName = smWidth === 0 ? '' : `col-sm-${smWidth}`;
  const mdWidthName = mdWidth === 0 ? '' : `col-md-${mdWidth}`;
  const lgWidthName = lgWidth === 0 ? '' : `col-lg-${lgWidth}`;
  const xsOffsetName = xsOffset === 0 ? '' : `col-xs-offset-${xsOffset}`;
  const smOffsetName = smOffset === 0 ? '' : `col-sm-offset-${smOffset}`;
  const mdOffsetName = mdOffset === 0 ? '' : `col-md-offset-${mdOffset}`;
  const lgOffsetName = lgOffset === 0 ? '' : `col-lg-offset-${lgOffset}`;
  const xsPushName = xsPush === 0 ? '' : `col-xs-push-${xsPush}`;
  const smPushName = smPush === 0 ? '' : `col-sm-push-${smPush}`;
  const mdPushName = mdPush === 0 ? '' : `col-md-push-${mdPush}`;
  const lgPushName = lgPush === 0 ? '' : `col-lg-push-${lgPush}`;
  const xsPullName = xsPull === 0 ? '' : `col-xs-pull-${xsPull}`;
  const smPullName = smPull === 0 ? '' : `col-sm-pull-${smPull}`;
  const mdPullName = mdPull === 0 ? '' : `col-md-pull-${mdPull}`;
  const lgPullName = lgPull === 0 ? '' : `col-lg-pull-${lgPull}`;
  return clearfix !== undefined ? (
    <CellRB className={`clearfix visible-${clearfix}`} />
  ) : (
    <CellRB
      className={`${xsWidthName} ${smWidthName} ${mdWidthName} ${lgWidthName} ${xsOffsetName} ${smOffsetName} ${mdOffsetName} ${lgOffsetName} ${xsPushName} ${smPushName} ${mdPushName} ${lgPushName} ${xsPullName} ${smPullName} ${mdPullName} ${lgPullName}`}
    >
      {children}
    </CellRB>
  );
};

export default GridCell;
