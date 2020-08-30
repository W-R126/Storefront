import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const CountryDropDown = ({ value, menuList, wrapperStyles, buttonStyles }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (ref.current) {
        if (!ReactDOM.findDOMNode(ref.current).contains(event.target)) {
          if (open) {
            setOpen(false);
          }
        }
      }
    };

    document.addEventListener('click', handleDocumentClick, false);

    return () => {
      document.removeEventListener('click', handleDocumentClick, false);
    };
  }, [open, ref]);

  return (
    <div ref={ref} className={classes.ComponentContainer} style={wrapperStyles}>
      <button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.DropDownButton}
        style={buttonStyles}
      >
        {value.label}
        <KeyboardArrowDownIcon className={`${open ? classes.Opened : undefined} ${classes.ChevIcon}`} />
      </button>
      {open && (
        <Box className={classes.DropDownMenu}>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {menuList.map((item, idx) => {
              return (
                <MenuItem key={idx} onClick={handleClose}>
                  {item.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Box>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ComponentContainer: {
      position: 'relative',
    },
    DropDownButton: {
      color: theme.palette.primary.dark,
      background: theme.palette.primary.greyBack,
      fontSize: '16px',
      height: '40px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      border: `1px solid ${theme.palette.primary.border}`,
      paddingLeft: '17px',
      paddingRight: '40px',
      position: 'relative',
      width: '100%',
      textAlign: 'left',
      borderRadius: 0,
      borderTopLeftRadius: '2px',
      borderBottomLeftRadius: '2px',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    ChevIcon: {
      position: 'absolute',
      right: '10px',
      transition: 'transform 100ms',
    },
    Opened: {
      transform: 'rotateZ(-180deg)',
    },
    DropDownMenu: {
      minWidth: '100%',
      position: 'absolute',
      background: '#fff',
      boxSizing: 'border-box',
      border: `1px solid ${theme.palette.primary.border}`,
      '& .MuiMenuItem-root': {
        color: theme.palette.primary.dark,
      },
    },
  })
);

export default CountryDropDown;
