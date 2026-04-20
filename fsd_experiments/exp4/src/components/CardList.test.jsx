import React from 'react';
import { render } from '@testing-library/react';
import CardList from './CardList';

describe('CardList Component Snapshots', () => {
  it('matches loading state snapshot', () => {
    const { asFragment } = render(<CardList status="loading" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches error state snapshot', () => {
    const { asFragment } = render(<CardList status="error" error="Network timeout" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches empty state snapshot', () => {
    const { asFragment } = render(<CardList status="success" data={[]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches data loaded state snapshot', () => {
    const mockData = [
      { id: 1, title: 'Item 1', description: 'Desc 1' },
      { id: 2, title: 'Item 2', description: 'Desc 2' }
    ];
    const { asFragment } = render(<CardList status="success" data={mockData} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
