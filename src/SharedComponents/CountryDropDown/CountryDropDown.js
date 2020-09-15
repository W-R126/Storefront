import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const CountryDropDown = ({
  value,
  onChange,
  countries,
  isPhoneNumber,
  wrapperClass,
  buttonStyles,
  dropDownPosition,
}) => {
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

  const getFlag = () => {
    const code = _.get(value, 'code', '');
    if (code.length > 0)
      return `url(${require(`../../assets/img/flags/${_.get(value, 'code', '').toLowerCase()}.svg`)})`;
    else return '';
  };

  const rootClass = [classes.ComponentContainer];
  if (wrapperClass) rootClass.push(wrapperClass);

  return (
    <div ref={ref} className={rootClass.join(' ')}>
      <button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.DropDownButton}
        style={buttonStyles}
      >
        <div
          className={`${isPhoneNumber ? classes.Flag : classes.FlagCountry}`}
          style={{
            backgroundImage: getFlag(),
          }}
        />
        {isPhoneNumber ? (
          <>{value.dial_code}</>
        ) : (
          <>{_.get(value, 'name', '') === '' ? 'Select a country' : value.name}</>
        )}

        <KeyboardArrowDownIcon className={`${open ? classes.Opened : undefined} ${classes.ChevIcon}`} />
      </button>
      {open && (
        <Box className={classes.DropDownMenu} style={{ ...dropDownPosition }}>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {countries.map((item) => {
              return (
                <MenuItem
                  key={item.code}
                  onClick={(e) => {
                    onChange(item);
                    handleClose(e);
                  }}
                  selected={_.get(value, 'code', '') === item.code}
                  className={classes.MenuItem}
                >
                  <div
                    className={classes.MenuItemFlag}
                    style={{
                      backgroundImage: `url(${require(`../../assets/img/flags/${item.code.toLowerCase()}.svg`)})`,
                    }}
                  />
                  {isPhoneNumber && <div className={classes.DialCode}>{item.dial_code}</div>}
                  <div className={classes.CountryName}>{item.name}</div>
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
      display: 'inline-flex',
      background: 'transparent',
      border: 'none',
    },
    DropDownButton: {
      color: '#fff',
      background: 'none',

      height: '40px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      border: 'none',
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
      width: '276px',
      position: 'absolute',
      background: '#fff',
      boxSizing: 'border-box',
      boxShadow: '0 1px 4px 0 rgba(186, 195, 201, 0.5)',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      height: '264px',
      overflowY: 'auto',
      right: 0,
      bottom: '100%',
      borderRadius: '2px',
      zIndex: 1,
      '& .MuiMenuItem-root': {
        color: theme.palette.primary.text,
      },
      '& .MuiList-root': {
        padding: 0,
      },
    },
    MenuItem: {
      color: theme.palette.primary.text,
      fontSize: '16px',
      display: 'flex',
      overflow: 'hidden',
      paddingRight: '6px',
      fontWeight: 300,
      lineHeight: '19px',
      padding: '13px 13px 12px 21px',
    },
    DialCode: {
      display: 'inline-block',
      marginLeft: '5px',
      minWidth: '20px',
    },
    CountryName: {
      flex: '1 1 100%',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      marginLeft: '20px',
    },
    MenuItemFlag: {
      width: '25px',
      height: '19px',
      backgroundSize: '100% 100%',
      flex: '0 0 25px',
    },
    Flag: {
      width: '25px',
      height: '19px',
      backgroundSize: '100% 100%',
      marginRight: '6px',
      flex: '0 0 25px',
    },
    FlagCountry: {
      width: '20px',
      height: '11px',
      marginRight: '5px',
      flex: '0, 0, 20px',
      backgroundSize: '100% 100%',
    },
  })
);

export default CountryDropDown;
