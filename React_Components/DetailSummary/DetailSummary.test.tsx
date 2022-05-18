import React from 'react';
import { screen, render } from '@testing-library/react';
import DetailSummary from '@components/DetailSummary';

const content = 'some content';
const title = 'a title';
describe('DetailSummary tests', () => {
  test('basic DetailSummary', () => {
    render(<DetailSummary title={title}>{content}</DetailSummary>);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
  test('defaults DetailSummary', () => {
    render(<DetailSummary>{content}</DetailSummary>);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
