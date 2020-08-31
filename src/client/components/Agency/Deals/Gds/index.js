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

const Gds = () => {
  return (
    <SecondaryAccordion
      text="GDS"
      defaultOpen={true}
      // className={curData.className}
      className="Gds"
    >
      <div className="Gds-container">
        <Grid
          container
          spacing={1}
          className="Gds-container-form"
          direction="row"
          alignItems="flex-end"
        >
          <Grid item xs={3}>
            <MultiSelect
              name="gds"
              label="GDS:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select GDS"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="agencyName"
              label="Agency Name:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Agency Name"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="PCC:"
              label="PCC:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select PCC"
            />
          </Grid>
          <Grid item xs={3}>
            <Button text="Add GDS" className="width-100" />
          </Grid>
        </Grid>

        <TableContainer className="Gds-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Gds-container-table-head">
              <TableRow>
                <TableCell>GDS</TableCell>
                <TableCell align="left">AGENCY NAME</TableCell>
                <TableCell align="center">AGENCY ID</TableCell>
                <TableCell align="left">PCC</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="Gds-container-table-body">
              <TableRow>
                <TableCell scope="row">Sabre</TableCell>
                <TableCell align="left">OK Tour &amp; Travel </TableCell>
                <TableCell align="center">BOMCT0002</TableCell>
                <TableCell align="left">75JW</TableCell>

                <TableCell align="center">
                  <DeleteIcon
                    style={{ color: colors.cornflowerBlue }}
                    className="cursor-pointer"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Sabre</TableCell>
                <TableCell align="left">OK Tour &amp; Travel </TableCell>
                <TableCell align="center">BOMCT0002</TableCell>
                <TableCell align="left">75JW</TableCell>

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

export default Gds;
