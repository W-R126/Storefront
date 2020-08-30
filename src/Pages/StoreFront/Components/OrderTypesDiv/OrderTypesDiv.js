import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const OrderTypesDiv = ({ warpperClassname, orderTypes }) => {
  const classes = useStyles();
  return (
    <div className={warpperClassname}>
      {orderTypes.map((item) => {
        return (
          <div className={classes.OrderItem} key={item.id}>
            <div className={classes.IconCircle}>
              <CheckIcon />
            </div>
            {item.name.replace('_', ' & ')}
          </div>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    OrderItem: {
      marginRight: '27px',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
    },
    IconCircle: {
      width: '24px',
      height: '24px',
      background: 'rgba(186, 195, 201, 0.4)',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '13px',
      '& .MuiSvgIcon-root': {
        width: '20px',
        color: '#20a044',
      },
    },
  })
);
export default OrderTypesDiv;
