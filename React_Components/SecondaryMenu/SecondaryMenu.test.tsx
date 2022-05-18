import React from 'react';
import { render, screen } from '@testing-library/react';

import SecondaryMenu from '@components/SecondaryMenu';

describe('SecondaryMenu tests', () => {
  const menuTitle = 'Hello';
  const itemTitle = 'Kenobi';
  test('Renders full SecondaryMenu', () => {
    render(
      <SecondaryMenu title={menuTitle}>
        <SecondaryMenu.Item title={itemTitle} link="#hi" />
      </SecondaryMenu>
    );
    expect(screen.getByText(menuTitle)).toBeInTheDocument();
    expect(screen.getByText(itemTitle)).toBeInTheDocument();
  });
  test('Renders SecondaryMenu with no title', () => {
    render(
      <SecondaryMenu>
        <SecondaryMenu.Item title={itemTitle} link="#hi" />
      </SecondaryMenu>
    );
    expect(screen.getByText(itemTitle)).toBeInTheDocument();
  });
  test('Renders SecondaryMenuItem with no title/link', () => {
    render(
      <SecondaryMenu title={menuTitle}>
        <SecondaryMenu.Item />
      </SecondaryMenu>
    );
    expect(screen.getByText(menuTitle)).toBeInTheDocument();
  });
});
