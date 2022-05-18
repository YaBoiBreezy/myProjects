import React from 'react';
import RowRB from 'react-bootstrap/Row';
import '../../style.css';

export interface GridRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** The content of the row */
  children?: React.ReactNode;
}

const GridRow = ({ children }: GridRowProps) => (
  <RowRB className="row">{children}</RowRB>
);

export default GridRow;
