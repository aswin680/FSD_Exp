import React from 'react';

const Header = ({ title, onTitleClick }) => {
  return (
    <header>
      <h1 onClick={onTitleClick} data-testid="header-title">
        {title}
      </h1>
    </header>
  );
};

export default Header;
