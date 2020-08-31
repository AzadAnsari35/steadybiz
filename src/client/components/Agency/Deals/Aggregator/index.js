import React from 'react';
import {
  Button,
  CustomCheckbox,
  MultiSelect,
  Panel,
  SecondaryAccordion,
  SecondaryTable,
  Text,
  TextInput,
  IconWithBackground,
} from 'Widgets';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from 'Constants/colors';

import './style.scss';

const Aggregator = () => {
  return (
    <SecondaryAccordion
      text="AGGREGATOR"
      defaultOpen={true}
      // className={curData.className}
      className="Aggregator"
    >
      <div className="Aggregator-container">
        <Grid
          container
          spacing={1}
          className="align-items-end Aggregator-container-form"
        >
          <Grid item xs={3}>
            <MultiSelect
              name="aggregator"
              label="Aggregator"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Aggregator"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="providerName"
              label="Provider Name"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Provider Name"
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <Button text="Add Aggregator" className="width-100" />
          </Grid>
        </Grid>

        <TableContainer className="Aggregator-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Aggregator-container-table-head">
              <TableRow>
                <TableCell>AGGREGATOR</TableCell>
                <TableCell align="center">PROVIDER NAME</TableCell>
                <TableCell align="center">PROVIDER ID</TableCell>
                <TableCell align="right">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="Aggregator-container-table-body">
              <TableRow>
                <TableCell scope="row">HitchHiker</TableCell>
                <TableCell align="center">OK Tour &amp; Travel </TableCell>
                <TableCell align="center">BOMCT0002</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    style={{ color: colors.cornflowerBlue }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">HitchHiker</TableCell>
                <TableCell align="center">OK Tour &amp; Travel </TableCell>
                <TableCell align="center">BOMCT0002</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    style={{ color: colors.cornflowerBlue }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </SecondaryAccordion>
  );
};

export default Aggregator;
