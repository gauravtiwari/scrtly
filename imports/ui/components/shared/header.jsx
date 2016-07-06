import React from 'react';

// Child Components
import Logo from './logo.jsx';
import Slogan from './slogan.jsx';
import Menu from './menu.jsx';

const Header = () => (
  <header>
    <Logo />
    <Slogan />
    <Menu />
  </header>
);

export default Header;
