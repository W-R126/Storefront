import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';

const OrderTypesDiv = ({ warpperClassname, orderTypes }) => {
  const classes = useStyles();
  const rootClasses = [classes.root];
  if (warpperClassname) rootClasses.push(warpperClassname);
  return (
    <Box className={rootClasses.join(' ')}>
      {orderTypes.map((item) => {
        return (
          <Typography variant="h5" className={classes.OrderItem} key={item.id}>
            <div className={classes.IconCircle}>
              <CheckIcon />
            </div>
            {item.name.replace('_', ' & ')}
          </Typography>
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    OrderItem: {
      marginRight: '27px',
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
      marginBottom: '10px',
      fontWeight: 300,
      '@media screen and (max-width: 767px)': {
        fontSize: '14px',
      },
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
