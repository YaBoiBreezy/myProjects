import React from 'react';
import GridRB from 'react-bootstrap/Container';
import '../../style.css';

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /** makes container full width of screen, instead of fixed value */
  fluid?: boolean;
  /** The contents of the Grid */
  children?: React.ReactNode;
}

const Grid = ({ fluid = false, children }: GridProps) => {
  const name = fluid ? 'container-fluid' : 'container';
  return <GridRB className={name}>{children}</GridRB>;
};

export default Grid;
