import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Button } from '@material-ui/core';

const DropDown = ({ value, onChange, menuList, wrapperClass, buttonStyles }) => {
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

  const rootClasses = [classes.ComponentContainer];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <div ref={ref} className={rootClasses.join(' ')}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.DropDownButton}
        style={buttonStyles}
      >
        {_.get(value, 'label', '')}
        <KeyboardArrowDownIcon className={`${open ? classes.Opened : undefined} ${classes.ChevIcon}`} />
      </Button>
      {open && (
        <Box className={classes.DropDownMenu}>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {menuList.map((item, idx) => {
              return (
                <MenuItem
                  key={idx}
                  onClick={(e) => {
                    onChange(item);
                    handleClose(e);
                  }}
                  selected={_.get(value, 'id', '') === item.id}
                >
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
      color: theme.palette.primary.text,
      fontSize: '16px',
      borderRadius: '4px',
      paddingLeft: '21px',
      paddingRight: '40px',
      position: 'relative',
      textTransform: 'capitalize',
      width: '147px',
      height: '40px',
      fontWeight: 300,
      '&.MuiButton-root': {
        backgroundColor: 'rgba( 186, 195, 201, 0.2)',
      },
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
      top: 'calc(100% + 2px)',
      borderRadius: '10px',
      borderColor: 'rgba(186, 195, 201, 0.5)',
      '& .MuiList-root': {
        padding: '15px 0',
      },
      '& .MuiMenuItem-root': {
        textTransform: 'capitalize',
        padding: '10px 20px',
        fontWeight: 300,
        color: theme.palette.primary.title,
        lineHeight: '19px',
      },
    },
  })
);

export default DropDown;
