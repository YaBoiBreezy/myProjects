import React from 'react';
import { render, screen } from '@testing-library/react';

import FootnoteLink from '@components/Footnote/FootnoteLink';
import FootnoteSection from '@components/Footnote/FootnoteSection';

describe('Footnote tests', () => {
  const val = '5';
  const subVal = 3;
  const ind = 'hi';
  const content = 'this is content';

  test('renders the default FootnoteLink component', () => {
    render(<FootnoteLink />);
  });
  test('renders the basic FootnoteLink component', () => {
    render(<FootnoteLink value={val} />);
    expect(screen.getByText(val)).toBeInTheDocument();
  });
  test('renders the basic FootnoteLink component with subValue', () => {
    render(<FootnoteLink value={val} subValue={subVal} />);
    expect(screen.getByText(val)).toBeInTheDocument();
    // expect(screen.getByText('fn5-3-rf')).toBeInTheDocument();
  });
  test('renders the basic FootnoteLink component with indicator', () => {
    render(<FootnoteLink value={val} indicator={ind} />);
    expect(screen.getByText(ind)).toBeInTheDocument();
  });

  test('renders the basic FootnoteSection component', () => {
    render(<FootnoteSection />);
  });
  test('renders the basic FootnoteSection.Footnote component', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val} />
      </FootnoteSection>
    );
    expect(screen.getByText(val)).toBeInTheDocument();
  });
  test('renders the FootnoteSection.Footnote component with children', () => {
    render(
      <FootnoteSection>
        <FootnoteSection.Footnote value={val}>
          {content}
        </FootnoteSection.Footnote>
        <FootnoteSection.Footnote />
      </FootnoteSection>
    );
    expect(screen.getByText(val)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
