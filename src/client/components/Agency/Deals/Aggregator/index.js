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
import { utils } from 'Helpers';
import EditIcon from '@material-ui/icons/Edit';
import './style.scss';

const Aggregator = ({ path }) => {
  const { isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory } = path;

  return (
    <SecondaryAccordion
      text="AGGREGATOR"
      defaultOpen={true}
      // className={curData.className}
      className="Aggregator"
    >
      <div className="Aggregator-container">
        {!(isViewDeal || isDealHistory) && (
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
        )}

        <TableContainer className="Aggregator-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Aggregator-container-table-head">
              <TableRow>
                <TableCell>AGGREGATOR</TableCell>
                <TableCell align="left">PROVIDER NAME</TableCell>
                <TableCell
                  style={isViewDeal || isDealHistory ? { width: '6%' } : {}}
                  align="left"
                >
                  PROVIDER ID
                </TableCell>
                {!isViewDeal && !isDealHistory && (
                  <TableCell align="center">ACTION</TableCell>
                )}{' '}
              </TableRow>
            </TableHead>
            <TableBody className="Aggregator-container-table-body">
              <TableRow>
                <TableCell scope="row">HitchHiker</TableCell>
                <TableCell align="left">OK Tour &amp; Travel </TableCell>
                <TableCell align="left">BOMCT0002</TableCell>
                {!isViewDeal && !isDealHistory && (
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
                )}
              </TableRow>
              <TableRow>
                <TableCell scope="row">HitchHiker</TableCell>
                <TableCell align="left">OK Tour &amp; Travel </TableCell>
                <TableCell align="left">BOMCT0002</TableCell>
                {!isViewDeal && !isDealHistory && (
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
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </SecondaryAccordion>
  );
};

export default Aggregator;
