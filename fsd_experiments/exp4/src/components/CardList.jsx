import React from 'react';

const CardList = ({ data, status, error }) => {
  if (status === 'loading') {
    return <div data-testid="loading-state">Loading data...</div>;
  }

  if (status === 'error') {
    return <div data-testid="error-state">Error: {error}</div>;
  }

  if (status === 'success' && data.length === 0) {
    return <div data-testid="empty-state">No cards available</div>;
  }

  return (
    <ul data-testid="data-loaded-state">
      {data?.map(item => (
        <li key={item.id} className="card-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default CardList;
