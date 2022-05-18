import React from 'react';
import { render, screen } from '@testing-library/react';

import KeyboardKey from '@components/KeyboardKey';

describe('KeyboardKey', () => {
  const key = 'enter';
  const keyDesc = 'otherThing';
  test('renders default KeyboardKey', () => {
    render(<KeyboardKey keyValue={key} description="" />);
    expect(screen.getByText(key)).toBeInTheDocument();
  });
  test('renders KeyboardKey with description', () => {
    render(<KeyboardKey keyValue={key} description={keyDesc} />);
    expect(screen.getByText(key)).toBeInTheDocument();
    expect(screen.getByTitle(keyDesc)).toBeInTheDocument();
  });
});
