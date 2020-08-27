import React from 'react';
import { Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import SearchInput from '../SearchInput';
import DropDown from '../DropDown';

const Header = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.Root}>
      <Toolbar>
        <IconButton aria-label="open drawer">
          <MenuIcon color="Secondary.dark" />
        </IconButton>
        <Link to="/" className={classes.LogoBrand}>
          myda
        </Link>
        <IconButton aria-label="header back" className={classes.BackButton}>
          <KeyboardBackspaceIcon color="Secondary.dark" />
        </IconButton>
        <SearchInput />
        <DropDown
          value={{ id: '0', label: 'Delivery' }}
          menuList={[
            { id: '0', label: 'Delivery' },
            { id: '1', label: 'Pickup' },
          ]}
          wrapperStyles={{ marginLeft: 'auto', width: '147px', background: '#fff', borderRadius: '2px' }}
          buttonStyles={{ background: '#fff' }}
        />
        <IconButton className={classes.CartButton} aria-label="shopping-cart">
          <ShoppingCartIcon />
        </IconButton>
        <button className={classes.SignUpButton}>Signup</button>
        <button className={classes.LoginButton}>Login</button>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    Root: {
      background: '#fff',
      '& .MuiToolbar-root': {
        height: '80px',
      },
    },
    LogoBrand: {
      color: '#0156b8',
      fontSize: '36px',
      textDecoration: 'none',
      fontWeight: 600,
      marginLeft: '8px',
    },
    BackButton: {
      background: theme.palette.primary.greyBack,
      marginLeft: '34px',
      width: '40px',
      height: '40px',
      borderRadius: 0,
    },
    CartButton: {
      background: theme.palette.primary.greyBack,
      marginLeft: '52px',
      width: '40px',
      height: '40px',
      borderRadius: 0,
    },
    SignUpButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
    },
    LoginButton: {
      color: '#0156b8',
      fontSize: '20px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      marginLeft: '42px',
    },
  })
);

export default Header;
