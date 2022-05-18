import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '@components/Heading';

describe('Heading', () => {
  const HeadingContent = 'Quote this';
  const HeadingSecondary = 'second';

  describe('Test Heading sizes', () => {
    test('render Heading h1', () => {
      render(<Heading size="h1" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h2', () => {
      render(<Heading size="h2" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h3', () => {
      render(<Heading size="h3" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h4', () => {
      render(<Heading size="h4" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h5', () => {
      render(<Heading size="h5" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
    test('render Heading h6', () => {
      render(<Heading size="h6" text={HeadingContent} />);
      expect(screen.getByText(HeadingContent)).toBeInTheDocument();
    });
  });
  test('heading secondary text', () => {
    render(
      <Heading
        size="h6"
        text={HeadingContent}
        secondaryText={HeadingSecondary}
      />
    );
    expect(screen.getByText(HeadingSecondary)).toBeInTheDocument();
    expect(screen.getByText(HeadingSecondary)).toHaveClass('small');
  });
  test('heading underlined', () => {
    render(
      <Heading
        size="h6"
        text={HeadingContent}
        secondaryText={HeadingSecondary}
        underline
      />
    );
    expect(screen.getByText(HeadingSecondary)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 6 })).toHaveClass(
      'page-header'
    );
  });
});
