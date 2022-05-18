import OriginGrid from './Grid';
import GridCell from './GridCell';
import GridRow from './GridRow';

export type GridProps = typeof OriginGrid & {
  Row: typeof GridRow;
  Cell: typeof GridCell;
};

const Grid = OriginGrid as GridProps;

Grid.Row = GridRow;
Grid.Cell = GridCell;

export default Grid;
