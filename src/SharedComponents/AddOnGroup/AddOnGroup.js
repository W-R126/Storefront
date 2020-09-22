import React from 'react';

import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography, Grid } from '@material-ui/core';

import AddOnItem from '../AddOnItem';

const AddOnGroup = ({ groupInfo, groupAddOns, setGroupAddOns, errorMsg }) => {
  const classes = useStyles();

  const getAddOnItemInfo = (optionId) => {
    const options = _.get(groupAddOns, 'options', []);
    return options.find((item) => item.id === optionId);
  };

  const changeAddOnData = (newData) => {
    const options = _.get(groupAddOns, 'options', []);
    if (newData.qty === 0)
      setGroupAddOns({
        ...groupInfo,
        options: options.filter((item) => item.id !== newData.id),
      });
    else {
      const findOne = options.find((item) => item.id === newData.id);
      if (findOne) {
        setGroupAddOns({
          ...groupAddOns,
          options: [
            ...options.map((item) => {
              if (item.id === newData.id) return newData;
              return item;
            }),
          ],
        });
      } else {
        setGroupAddOns({
          ...groupInfo,
          options: [...options, newData],
        });
      }
    }
  };

  const getOrderedItems = () => {
    const { options } = groupInfo;
    const positioned = options.filter((item) => item.position && item.position >= 0);
    const nonPositioned = options.filter((item) => !item.position || item.position < 0);
    return [
      ...positioned.sort((a, b) => a.position - b.position),
      ...nonPositioned.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase()),
    ];
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h2" className="title">
        {groupInfo.group}
      </Typography>
      <Grid container spacing={3}>
        {getOrderedItems().map((item) => {
          return (
            <Grid item md={4} sm={12} xs={12}>
              <AddOnItem
                itemData={item}
                optionCartInfo={getAddOnItemInfo(item.id)}
                setOptionCartInfo={(newData) => {
                  changeAddOnData(newData);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      {errorMsg && (
        <Typography variant="h6" className="error-msg">
          {errorMsg.errorMsg}
        </Typography>
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px 0 0 0',
      position: 'relative',
      '& .title': {
        fontWeight: 500,
        margin: '0 0 20px 0',
      },
      '& .error-msg': {
        color: theme.palette.primary.red,
        margin: '5px 0 0 0',
      },
    },
  })
);
export default AddOnGroup;
