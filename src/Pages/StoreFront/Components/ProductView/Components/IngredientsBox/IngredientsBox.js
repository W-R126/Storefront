import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const IngredientsBox = ({ ingredientData, wrapperClass }) => {
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);

  const getIngredientsString = () => {
    const itemArr = ingredientData.map((item) => {
      let strItem = item.name;
      if (item.measure.length > 0) {
        strItem += '(';
        const measureList = [];
        item.measure.forEach((measureItem) => {
          measureList.push(`${measureItem.id}{${measureItem.amount}${measureItem.measure_type}}`);
        });
        strItem += `${measureList.join(', ')})`;
      }
      return strItem;
    });

    return itemArr.join(', ');
  };

  return (
    <Box className={rootClasses.join(' ')}>
      <Typography variant="h1" className={classes.Title}>
        Ingredients
      </Typography>
      <Typography variant="h4">{getIngredientsString()}</Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      boxSizing: 'border-box',
      flexDirection: 'column',
      width: '100%',
    },
    Title: {
      margin: '0 0 20px 0',
    },
  })
);

export default IngredientsBox;
