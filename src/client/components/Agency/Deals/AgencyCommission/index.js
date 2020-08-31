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
import './style.scss';

const AgencyCommission = () => {
  return (
    <SecondaryAccordion
      text="SEGMENTS"
      defaultOpen={true}
      // className={curData.className}
      className="Segments"
    >
      <div className="Segments-container">
        <Grid
          container
          spacing={1}
          className="Segments-container-form"
          alignItems="flex-end"
        >
          <Grid item xs={3}>
            <MultiSelect
              name="exOrigin"
              label="Ex. Origin:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Origin"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="exDestination"
              label="Ex. Destination:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Destination"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="origin"
              label="Origin:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Origin"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="destination"
              label="Destination:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Destination"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="fromCountry"
              label="From Country:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Country"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="toCountry"
              label="To Country:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Country"
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <Button text="Add Airline (s)" className="width-100 mt-12" />
          </Grid>
        </Grid>

        <TableContainer className="Segments-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Segments-container-table-head">
              <TableRow>
                <TableCell align="center">EX. ORIGIN</TableCell>
                <TableCell align="center">EX. DESTINATION</TableCell>
                <TableCell align="center">ORIGIN</TableCell>
                <TableCell align="center">DESTINATION</TableCell>
                <TableCell align="center">FROM COUNTRY</TableCell>
                <TableCell align="center">TO COUNTRY</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="Segments-container-table-body">
              <TableRow>
                <TableCell align="center" scope="row">
                  DXB
                </TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">AE</TableCell>
                <TableCell align="center">PK</TableCell>

                <TableCell align="center">
                  <DeleteIcon
                    style={{ color: colors.cornflowerBlue }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" scope="row">
                  DXB
                </TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">AE</TableCell>
                <TableCell align="center">PK</TableCell>

                <TableCell align="center">
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

export default AgencyCommission;
