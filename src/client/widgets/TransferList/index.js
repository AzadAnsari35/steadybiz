import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'Widgets';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = (props) => {
  const {
    leftList,
    rightList,
    leftHeading,
    rightHeading,
    leftHeadContent,
    rightHeadContent,
  } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(leftList);
  const [right, setRight] = React.useState(rightList);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <div className="customList">
      <div>
        {items.map((value) => {
          //   const labelId = `transfer-list-item-${value}-label`;

          return (
            <div
              key={value}
              onClick={handleToggle(value)}
              className={`font-primary-regular-14_1 cursor-pointer ${
                checked.includes(value) ? 'customList-selected' : ''
              }`}
            >
              {value}
              {/* <div id={labelId}></div> */}
            </div>
          );
        })}
        <div />
      </div>
    </div>
  );

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="TransferList"
    >
      <Grid item xs={5}>
        {leftHeadContent}
        <div className="font-primary-medium-14 mb-16">{leftHeading}</div>
        <div className="TransferList-section">{customList(left)}</div>
      </Grid>
      <Grid item xs={2}>
        <Grid container direction="column" alignItems="center" className="pt-125">
          <Button
            type="submit"
            className="mb-16"
            text={
              <>
                <ArrowForwardIosIcon fontSize="small" />
                <ArrowForwardIosIcon fontSize="small" />
              </>
            }
            secondary
            disabled={left.length === 0}
            onClick={handleAllRight}
          />

          <Button
            type="submit"
            className="mb-16"
            text={<ArrowForwardIosIcon fontSize="small" />}
            secondary
            disabled={leftChecked.length === 0}
            onClick={handleCheckedRight}
          />

          <Button
            type="submit"
            className="mb-16"
            text={<ArrowBackIosIcon fontSize="small" />}
            secondary
            disabled={rightChecked.length === 0}
            onClick={handleCheckedLeft}
          />

          <Button
            type="submit"
            text={
              <>
                <ArrowBackIosIcon fontSize="small" />
                <ArrowBackIosIcon fontSize="small" />
              </>
            }
            secondary
            disabled={right.length === 0}
            onClick={handleAllLeft}
          />
        </Grid>
      </Grid>
      <Grid item xs={5}>
        {rightHeadContent}
        <div className="font-primary-medium-14 mb-16">{rightHeading}</div>
        <div className="TransferList-section">{customList(right)}</div>
      </Grid>
    </Grid>
  );
};

export default TransferList;
