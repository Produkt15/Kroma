import React from 'react';
import Logo from './Logo';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Logo image="relative" />
      <div className="create-visible-interfaces">
        Create visible interfaces for everyone
      </div>
    </div>
  );
};

export default Header;
