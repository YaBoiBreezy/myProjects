import React from 'react';
import { render, screen } from '@testing-library/react';

import Archived from '@components/Archived';

describe('Archived', () => {
  const ArchivedContent = 'Hello world!';
  const ArchivedAdditionalContent = 'addon';
  test('renders default english Archived component', () => {
    render(
      <Archived content="" english>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });
  test('renders default french Archived component', () => {
    render(
      <Archived content="" english={false}>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
  });

  test('renders default english Archived component with optional link', () => {
    render(
      <Archived content={ArchivedAdditionalContent} english>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
    expect(screen.getByText(ArchivedAdditionalContent)).toBeInTheDocument();
  });

  test('renders default french Archived component with optional link', () => {
    render(
      <Archived content={ArchivedAdditionalContent} english={false}>
        <p>{ArchivedContent}</p>
      </Archived>
    );
    expect(screen.getByText(ArchivedContent)).toBeInTheDocument();
    expect(screen.getByText(ArchivedAdditionalContent)).toBeInTheDocument();
  });
});
