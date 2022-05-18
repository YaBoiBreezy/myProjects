import React from 'react';
import { render, screen } from '@testing-library/react';

import Grid from '@components/Grid';

describe('Grid tests', () => {
  test('Default Grid', () => {
    render(
      <Grid>
        hi
        <Grid.Row>
          <Grid.Cell smWidth={6}>Cell 1</Grid.Cell>
          <Grid.Cell smWidth={6}>Cell 2</Grid.Cell>
        </Grid.Row>
        <Grid.Row>
          <Grid.Cell smWidth={3}>Cell 3</Grid.Cell>
          <Grid.Cell smWidth={2}>Cell 4</Grid.Cell>
          <Grid.Cell smWidth={3}>Cell 5</Grid.Cell>
          <Grid.Cell smWidth={4}>Cell 6</Grid.Cell>
        </Grid.Row>
      </Grid>
    );
    expect(screen.getByText('Cell 1')).toHaveClass('col-sm-6');
    expect(screen.getByText('hi')).toHaveClass('container');
  });
  test('Default nonfluid Grid', () => {
    render(
      <Grid fluid={false}>
        hi
        <Grid.Row>
          <Grid.Cell smWidth={6}>Cell 1</Grid.Cell>
          <Grid.Cell smWidth={6}>Cell 2</Grid.Cell>
        </Grid.Row>
        <Grid.Row>
          <Grid.Cell smWidth={3}>Cell 3</Grid.Cell>
          <Grid.Cell smWidth={2}>Cell 4</Grid.Cell>
          <Grid.Cell smWidth={3}>Cell 5</Grid.Cell>
          <Grid.Cell smWidth={4}>Cell 6</Grid.Cell>
        </Grid.Row>
      </Grid>
    );
    expect(screen.getByText('Cell 1')).toHaveClass('col-sm-6');
    expect(screen.getByText('hi')).toHaveClass('container');
  });
  test('Default fluid Grid', () => {
    render(
      <Grid fluid>
        hi
        <Grid.Row>
          <Grid.Cell smWidth={6}>Cell 1</Grid.Cell>
          <Grid.Cell smWidth={6}>Cell 2</Grid.Cell>
        </Grid.Row>
        <Grid.Row>
          <Grid.Cell smWidth={3}>Cell 3</Grid.Cell>
          <Grid.Cell smWidth={2}>Cell 4</Grid.Cell>
          <Grid.Cell smWidth={3}>Cell 5</Grid.Cell>
          <Grid.Cell smWidth={4}>Cell 6</Grid.Cell>
        </Grid.Row>
      </Grid>
    );
    expect(screen.getByText('hi')).toHaveClass('container-fluid');
  });

  test('Grid width', () => {
    render(
      <Grid.Row>
        <Grid.Cell xsWidth={2} smWidth={6} mdWidth={8} lgWidth={10}>
          Cell 1
        </Grid.Cell>
        <Grid.Cell smWidth={6}>Cell 2</Grid.Cell>
      </Grid.Row>
    );
    expect(screen.getByText('Cell 1')).toHaveClass('col-xs-2');
    expect(screen.getByText('Cell 1')).toHaveClass('col-sm-6');
    expect(screen.getByText('Cell 1')).toHaveClass('col-md-8');
    expect(screen.getByText('Cell 1')).toHaveClass('col-lg-10');
  });
  describe('Grid offset tests', () => {
    test('Active Style', () => {
      render(
        <Grid.Row>
          <Grid.Cell
            smWidth={5}
            xsOffset={2}
            smOffset={6}
            mdOffset={8}
            lgOffset={10}
          >
            Cell 1
          </Grid.Cell>
          <Grid.Cell smWidth={6}>Cell 2</Grid.Cell>
        </Grid.Row>
      );
      expect(screen.getByText('Cell 1')).toHaveClass('col-xs-offset-2');
      expect(screen.getByText('Cell 1')).toHaveClass('col-sm-offset-6');
      expect(screen.getByText('Cell 1')).toHaveClass('col-md-offset-8');
      expect(screen.getByText('Cell 1')).toHaveClass('col-lg-offset-10');
    });
  });
  describe('Grid push pull tests', () => {
    test('Grid push xs', () => {
      render(<Grid.Cell xsPush={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-xs-push-3');
    });
    test('Grid push sm', () => {
      render(<Grid.Cell smPush={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-sm-push-3');
    });
    test('Grid push md', () => {
      render(<Grid.Cell mdPush={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-md-push-3');
    });
    test('Grid push lg', () => {
      render(<Grid.Cell lgPush={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-lg-push-3');
    });
    test('Grid pull xs', () => {
      render(<Grid.Cell xsPull={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-xs-pull-3');
    });
    test('Grid pull sm', () => {
      render(<Grid.Cell smPull={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-sm-pull-3');
    });
    test('Grid pull md', () => {
      render(<Grid.Cell mdPull={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-md-pull-3');
    });
    test('Grid pull lg', () => {
      render(<Grid.Cell lgPull={3}>text</Grid.Cell>);
      expect(screen.getByText('text')).toHaveClass('col-lg-pull-3');
    });
  });
  test('Row no children', () => {
    render(<Grid.Row />);
  });
  test('Grid clearfix', () => {
    render(<Grid.Cell clearfix="lg" />);
  });
});
