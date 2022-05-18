import React from 'react';
import { render, screen } from '@testing-library/react';

import Pagination from '@components/Pagination';

describe('Pagination tests', () => {
    const placeholder = 'PlaceHolder Text';
    describe('Test Pagination sizes', () => {
        test('Renders default size', () => {
            render(
                <Pagination>
                    <Pagination.Button>{placeholder}</Pagination.Button>
                </Pagination>
            );
        });
        test('Renders large size', () => {
            render(
                <ul className='pagination pagination-lg'>{placeholder}
                    <Pagination.Button />
                </ul>
            );
            expect(screen.getByText(placeholder)).toHaveClass('pagination-lg');
        });
        test('Renders small size', () => {
            render(
                <ul className='pagination pagination-sm'>{placeholder}
                    <Pagination.Button />
                </ul>
            );
            expect(screen.getByText(placeholder)).toHaveClass('pagination-sm');
        });
    });
    describe('Testing PaginationButton activities ', () => {
        test('Test active', () => {
            render(
                <Pagination>
                    <li><a href="#" rel="prev">Previous</a></li>
                    <li className="active">{placeholder}<a href="#">1 <span className="wb-inv">Go to Page 1</span></a></li>
                </Pagination>
            );
            expect(screen.getByText(placeholder)).toHaveClass('active');
        });
        test('Test disabled', () => {
            render(
                <Pagination>
                    <li className="disabled">{placeholder}<a href="#" rel="prev">Previous</a></li>
                    <li><a href="#">1 <span className="wb-inv">Go to Page 1</span></a></li>
                </Pagination>
            );
            expect(screen.getByText(placeholder)).toHaveClass('disabled');
        });
    });
});
