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
import {
  Button,
  MultiSelect,
  SecondaryAccordion,
  TextInput,
  DatePicker,
} from 'Widgets';
import EditIcon from '@material-ui/icons/Edit';

import './style.scss';

const Markup = ({ path }) => {
  const { isCreate, isUpdate, isView, isDealHistory } = path;

  return (
    <SecondaryAccordion
      text={
        isCreate || isUpdate ? (
          <div className="d-flex align-items-center">
            MARKUP
            <div className="font-primary-italic-14 pl-8">
              [Applied on Base Fare]
            </div>
          </div>
        ) : (
          <>MARKUP</>
        )
      }
      defaultOpen={true}
      // className={curData.className}
      className="Markup"
    >
      <div className="Markup-container">
        {!(isView || isDealHistory) && (
          <Grid
            container
            spacing={1}
            className="Markup-container-form"
            alignItems="flex-end"
          >
            <Grid item xs={3}>
              <MultiSelect
                name="airlineName"
                label="Airline Name:"
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
              <TextInput
                name="markup"
                label="Markup (%):"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Markup %"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="currency"
                label="Currency:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Currency"
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                name="markupAmount"
                label="Markup Amount:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Markup"
              />
            </Grid>

            <Grid item xs={3}>
              <DatePicker
                name="startDate"
                label="Start Date:"
                onChange={() => console.log('value')}
                useReactHookForm={false}
                disabled={isView || isDealHistory}
              />
            </Grid>

            <Grid item xs={3}>
              <DatePicker
                name="endDate"
                label="End Date:"
                onChange={() => console.log('value')}
                useReactHookForm={false}
                disabled={isView || isDealHistory}
              />
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}>
              <Button text="Add Markup" className="width-100 mt-12" />
            </Grid>
          </Grid>
        )}

        <TableContainer className="Markup-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Markup-container-table-head">
              <TableRow>
                <TableCell align="left">AIRLINE NAME</TableCell>
                <TableCell align="center">AIRLINE CODE</TableCell>

                <TableCell align="center">MARKUP ( % )</TableCell>
                <TableCell align="center">CURRENCY</TableCell>
                <TableCell align="center">MARKUP AMOUNT</TableCell>
                <TableCell align="center">START DATE</TableCell>
                <TableCell
                  style={isView || isDealHistory ? { width: '8%' } : {}}
                  align="center"
                >
                  END DATE
                </TableCell>
                {!isView && !isDealHistory && (
                  <TableCell align="center">ACTION</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="Markup-container-table-body">
              <TableRow>
                <TableCell align="left" scope="row">
                  American Airlines
                </TableCell>
                <TableCell align="center">AA </TableCell>

                <TableCell align="center">20</TableCell>
                <TableCell align="center">USD</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">07-OCT-2020</TableCell>
                <TableCell align="center">27-OCT-2020</TableCell>
                {!isView && !isDealHistory && (
                  <TableCell align="center">
                    {isUpdate && (
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
                <TableCell align="left" scope="row">
                  American Airlines
                </TableCell>
                <TableCell align="center">AA </TableCell>
                <TableCell align="center">20</TableCell>
                <TableCell align="center">USD</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">07-OCT-2020</TableCell>
                <TableCell align="center">27-OCT-2020</TableCell>
                {!isView && !isDealHistory && (
                  <TableCell align="center">
                    {isUpdate && (
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

export default Markup;
