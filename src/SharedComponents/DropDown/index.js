import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const DropDown = ({ value, menuList, wrapperStyles, buttonStyles }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
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
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.ComponentContainer} style={wrapperStyles}>
      <button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.DropDownButton}
        style={buttonStyles}
      >
        {value.label}
        <KeyboardArrowDownIcon color="Secondary.dark" className={open ? classes.Opened : undefined} />
      </button>
      {open && (
        <Box className={classes.DropDownMenu}>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {menuList.map((item) => {
              return <MenuItem onClick={handleClose}>{item.label}</MenuItem>;
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
      '& .MuiSvgIcon-root': {
        position: 'absolute',
        right: '10px',
        transition: 'transform 100ms',
      },
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

export default DropDown;
