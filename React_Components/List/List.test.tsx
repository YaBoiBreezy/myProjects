import React from 'react';
import { render, screen } from '@testing-library/react';

import List from '@components/List';

describe('List tests', () => {
  const listContent = 'Hello';
  describe('Test basic List types', () => {
    test('Renders unordered List', () => {
      render(
        <List type="ul" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
    });
    test('Renders ordered List', () => {
      render(
        <List type="ol" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
    });
    test('Renders definition List', () => {
      render(
        <List type="dl" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
    });
    test('Renders alpha List', () => {
      render(
        <List type="alpha" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-lwr-alph');
    });
    test('Renders roman List', () => {
      render(
        <List type="roman" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-lwr-rmn');
    });
  });
  describe('Test List Styling', () => {
    test('Renders unstyled List', () => {
      render(
        <List type="ul" unstyled>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('list-unstyled');
    });
    test('Renders none List', () => {
      render(
        <List type="ol" none>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-none');
    });
    test('Renders spaced List', () => {
      render(
        <List type="dl" spaced>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-spcd');
    });
    test('Renders upper alpha List', () => {
      render(
        <List type="alpha" upper>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-upr-alph');
    });
    test('Renders upper roman List', () => {
      render(
        <List type="roman" upper>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('lst-upr-rmn');
    });
    test('Renders inline List', () => {
      render(
        <List type="ul" inline>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('list-inline');
    });
    test('Renders horizontal List', () => {
      render(
        <List type="dl" horizontal>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('dl-horizontal');
    });
    test('Renders border List', () => {
      render(
        <List type="dl" horizontal border={false}>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('dl-horizontal');
      expect(screen.getByText(listContent)).toHaveClass('brdr-0');
    });
  });
  describe('Test List columns', () => {
    test('Renders basic columns', () => {
      render(
        <List colCount={3} columnSize={undefined}>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-sm-3');
    });
    test('Renders basic columns with size', () => {
      render(
        <List colCount={2} columnSize="xl">
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-xl-2');
    });
    test('Renders basic columns with max on', () => {
      render(
        <List colCount={4} columnSize="lg" colCountDefaultMax>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-lg-4');
      expect(screen.getByText(listContent)).toHaveClass('colcount-lg-3');
      expect(screen.getByText(listContent)).toHaveClass('colcount-lg-2');
    });
    test('Renders basic 3 columns with max off', () => {
      render(
        <List colCount={3} columnSize="xxs" colCountDefaultMax={false}>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-xxs-3');
      expect(screen.getByText(listContent)).not.toHaveClass('colcount-xxs-2');
    });
    test('Renders basic 4 columns with max off', () => {
      render(
        <List colCount={4} colCountDefaultMax={false}>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-sm-4');
      expect(screen.getByText(listContent)).not.toHaveClass('colcount-sm-3');
      expect(screen.getByText(listContent)).not.toHaveClass('colcount-sm-2');
    });
    test('Renders basic 20 columns with max off', () => {
      render(
        <List colCount={20} columnSize="xxs" colCountDefaultMax={false}>
          {listContent}
        </List>
      );
      expect(screen.getByText(listContent)).toBeInTheDocument();
      expect(screen.getByText(listContent)).toHaveClass('colcount-xxs-4');
      expect(screen.getByText(listContent)).not.toHaveClass('colcount-xxs-3');
      expect(screen.getByText(listContent)).not.toHaveClass('colcount-xxs-2');
    });
  });
});
