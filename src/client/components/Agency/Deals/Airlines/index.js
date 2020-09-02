import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from 'Constants/colors';
import React from 'react';
import { Button, MultiSelect, SecondaryAccordion } from 'Widgets';
import EditIcon from '@material-ui/icons/Edit';

import './style.scss';

const Airlines = ({ path }) => {
  const { isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory } = path;

  return (
    <SecondaryAccordion
      text="AIRLINES"
      defaultOpen={true}
      // className={curData.className}
      className="Airlines"
    >
      <div className="Airlines-container">
        {!(isViewDeal || isDealHistory) && (
          <Grid
            container
            spacing={1}
            className="Airlines-container-form"
            alignItems="flex-end"
          >
            <Grid item xs={3}>
              <MultiSelect
                name="validatingCarrier"
                label="Validating Carrier:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Airline"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="marketingCarrier"
                label="Marketing Carrier:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Airline"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="operatingCarrier"
                label="Operating Carrier:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Airline"
              />
            </Grid>

            <Grid item xs={3}>
              <Button text="Add Airline (s)" className="width-100 mt-12" />
            </Grid>
          </Grid>
        )}

        <TableContainer className="Airlines-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Airlines-container-table-head">
              <TableRow>
                <TableCell>VALIDATING CARRIER</TableCell>
                <TableCell align="center">AIRLINE CODE</TableCell>
                <TableCell align="left">MARKETING CARRIER</TableCell>
                <TableCell align="center">AIRLINE CODE</TableCell>
                <TableCell align="left">OPERATING CARRIER</TableCell>
                <TableCell align="center">AIRLINE CODE</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="Airlines-container-table-body">
              <TableRow>
                <TableCell scope="row">American Airlines</TableCell>
                <TableCell align="center">AA </TableCell>
                <TableCell align="left">Air France</TableCell>
                <TableCell align="center">AF</TableCell>
                <TableCell align="left">Air France</TableCell>
                <TableCell align="center">AF</TableCell>

                <TableCell align="center">
                  {isUpdateDeal && (
                    <EditIcon
                      style={{ color: colors.cornflowerBlue }}
                      className="cursor-pointer"
                    />
                  )}
                  <DeleteIcon
                    style={{ color: colors.cornflowerBlue }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">American Airlines</TableCell>
                <TableCell align="center">AA </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Air France</TableCell>
                <TableCell align="center">AF</TableCell>

                <TableCell align="center">
                  {isUpdateDeal && (
                    <EditIcon
                      style={{ color: colors.cornflowerBlue }}
                      className="cursor-pointer"
                    />
                  )}
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

export default Airlines;
