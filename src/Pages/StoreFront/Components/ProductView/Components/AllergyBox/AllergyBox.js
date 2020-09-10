import React from 'react';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const AllergyBox = ({ allergyData, wrapperClass }) => {
  const classes = useStyles();

  const rootClasses = [classes.root];
  if (wrapperClass) rootClasses.push(wrapperClass);
  return (
    <Box className={rootClasses.join(' ')}>
      <Typography variant="h1" className={classes.Title}>
        Allergy Information
      </Typography>
      <Box className={classes.AllergyImgContainer}>
        {allergyData.map((item) => {
          return (
            <Box className={classes.AllergyInfo} key={item.id}>
              <Box
                className={classes.AllergyImg}
                style={{ backgroundImage: `url(${_.get(item.image, 'url', '')})` }}
              ></Box>
              <Typography variant="h6" className={classes.ItemTitle}>
                {item.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
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
      margin: '0 0 10px 0',
    },
    AllergyImgContainer: {
      margin: '0',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
    },
    AllergyInfo: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      border: 'solid 1px rgba(186, 195, 201, 0.5)',
      width: '79px',
      height: '84px',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px 10px 0 0',
      '@media screen and (max-width: 768px)': {
        width: '50px',
        height: '53px',
      },
    },
    AllergyImg: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '39px',
      height: '39px',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      margin: '0 0 12px 0',
      '@media screen and (max-width: 768px)': {
        width: '25px',
        height: '25px',
        margin: '0 0 5px 0',
      },
    },
    ItemTitle: {
      maxWidth: '80%',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
  })
);

export default AllergyBox;
