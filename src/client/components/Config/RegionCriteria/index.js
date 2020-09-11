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
import EditIcon from '@material-ui/icons/Edit';

import './style.scss';

const RegionCriteria = ({ path }) => {
  const { isCreateRegion, isUpdateRegion, isViewRegion } = path;

  return (
    <SecondaryAccordion
      text="Region Criteria"
      defaultOpen={true}
      // className={curData.className}
      className="Gds"
    >
      <div className="RegionCriteria-container">
        {!isViewRegion && (
          <Grid
            container
            spacing={1}
            className="RegionCriteria-container-form"
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item xs={3}>
              <MultiSelect
                name="continent"
                label="Continent:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Continent"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="country"
                label="Country:"
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
                name="ity"
                label="City:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select City"
              />
            </Grid>
            <Grid item xs={3}>
              <Button text="Add To Region" className="width-100" />
            </Grid>
          </Grid>
        )}
        <TableContainer className="RegionCriteria-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="RegionCriteria-container-table-head">
              <TableRow>
                <TableCell>CONTINENT</TableCell>
                <TableCell align="left">COUNTRY</TableCell>
                <TableCell align="left">CITY</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="RegionCriteria-container-table-body">
              <TableRow>
                <TableCell scope="row">North America</TableCell>
                <TableCell align="left"> </TableCell>
                <TableCell align="left"></TableCell>

                <TableCell align="center">
                  {isUpdateRegion && (
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
                <TableCell scope="row">Africa</TableCell>
                <TableCell align="left">Nigeria </TableCell>
                <TableCell align="left">BOMCT0002</TableCell>

                <TableCell align="center">
                  {isUpdateRegion && (
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

export default RegionCriteria;
