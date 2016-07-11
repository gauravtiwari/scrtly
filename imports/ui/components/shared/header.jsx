import React from 'react';

// Child Components
import Logo from './logo.jsx';
import Slogan from './slogan.jsx';
import Menu from './menu.jsx';

const Header = (props) => (
  <header>
    <Logo />
    <Slogan />
    <Menu ee={props.ee} />
  </header>
);

export default Header;
