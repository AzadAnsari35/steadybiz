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
  Text,
  CheckboxGroup,
  TextInput,
} from 'Widgets';
import EditIcon from '@material-ui/icons/Edit';

import './style.scss';

const SegmentDetails = ({ path }) => {
  const { isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory } = path;

  return (
    <SecondaryAccordion
      text="SEGMENTS DETAILS"
      defaultOpen={true}
      // className={curData.className}
      className="SegmentDetails"
    >
      <div className="SegmentDetails-container">
        {!(isViewDeal || isDealHistory) && (
          <Grid
            container
            spacing={1}
            className="SegmentDetails-container-form"
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item xs={6}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={12}>
                  <Text
                    showLeftBorder={true}
                    text="Segment Direction Details"
                    className="font-primary-medium-18 my-24"
                  />

                  <CheckboxGroup
                    label="Direction:"
                    name="direction"
                    className="SegmentDetails-container-form-checkbox"
                    checkboxClassName="pr-20"
                    useReactHookForm={false}
                    handleChange={(value) => console.log(value)}
                    checkboxes={[
                      { primaryLabel: 'One Way', value: 'OW' },
                      { primaryLabel: 'Return', value: 'RT' },
                      { primaryLabel: 'Multicity', value: 'MC' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder={true}
                    text="Pax Type Details"
                    className="font-primary-medium-18 my-24"
                  />

                  <CheckboxGroup
                    label="Passengers Type:"
                    name="passengersType"
                    className="SegmentDetails-container-form-checkbox"
                    checkboxClassName="pr-20"
                    useReactHookForm={false}
                    handleChange={(value) => console.log(value)}
                    checkboxes={[
                      { primaryLabel: 'Adult', value: 'ADT' },
                      { primaryLabel: 'Child', value: 'CHD' },
                      { primaryLabel: 'Infant', value: 'INF' },
                    ]}
                  />
                </Grid>

                <Grid item xs={4}>
                  <MultiSelect
                    name="adult"
                    label="No. of Passengers:"
                    // disabled={isViewSecurityGroup}
                    useReactHookForm={false}
                    onChange={(value) => console.log(value)}
                    showBorder={true}
                    changeStyle={true}
                    options={[]}
                    width="auto"
                    placeholder="Select Adult"
                  />
                </Grid>

                <Grid item xs={4}>
                  <MultiSelect
                    name="child"
                    // disabled={isViewSecurityGroup}
                    useReactHookForm={false}
                    onChange={(value) => console.log(value)}
                    showBorder={true}
                    changeStyle={true}
                    options={[]}
                    width="auto"
                    placeholder="Select Child"
                  />
                </Grid>

                <Grid item xs={4}>
                  <MultiSelect
                    name="infant"
                    // disabled={isViewSecurityGroup}
                    useReactHookForm={false}
                    onChange={(value) => console.log(value)}
                    showBorder={true}
                    changeStyle={true}
                    options={[]}
                    width="auto"
                    placeholder="Select Infant"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder={true}
                    text="Classes Details"
                    className="font-primary-medium-18 my-24"
                  />

                  <CheckboxGroup
                    label="Cabin Classes:"
                    name="cabinClasses"
                    className="SegmentDetails-container-form-checkbox"
                    checkboxClassName="pr-20"
                    useReactHookForm={false}
                    handleChange={(value) => console.log(value)}
                    checkboxes={[
                      { primaryLabel: 'Economy', value: 'OW' },
                      { primaryLabel: 'Premium Economy', value: 'RT' },
                      { primaryLabel: 'Business', value: 'MC' },
                      { primaryLabel: 'First', value: 'MC' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} className="pb-12 pt-8">
                  <CheckboxGroup
                    label="Booking Classes:"
                    name="bookingClasses"
                    className="SegmentDetails-container-form-checkbox"
                    checkboxClassName="pr-20"
                    useReactHookForm={false}
                    handleChange={(value) => console.log(value)}
                    checkboxes={[
                      { primaryLabel: 'A', value: 'A' },
                      { primaryLabel: 'B', value: 'B' },
                      { primaryLabel: 'C', value: 'C' },
                      { primaryLabel: 'D', value: 'D' },
                      { primaryLabel: 'E', value: 'E' },
                      { primaryLabel: 'F', value: 'F' },
                      { primaryLabel: 'G', value: 'G' },
                      { primaryLabel: 'H', value: 'H' },
                      { primaryLabel: 'I', value: 'I' },
                      { primaryLabel: 'J', value: 'J' },
                      { primaryLabel: 'K', value: 'K' },
                      { primaryLabel: 'L', value: 'L' },
                      { primaryLabel: 'M', value: 'M' },
                      { primaryLabel: 'N', value: 'N' },
                      { primaryLabel: 'O', value: 'O' },
                      { primaryLabel: 'P', value: 'P' },
                      { primaryLabel: 'Q', value: 'Q' },
                      { primaryLabel: 'R', value: 'R' },
                      { primaryLabel: 'S', value: 'S' },
                      { primaryLabel: 'T', value: 'T' },
                      { primaryLabel: 'U', value: 'U' },
                      { primaryLabel: 'V', value: 'V' },
                      { primaryLabel: 'W', value: 'W' },
                      { primaryLabel: 'X', value: 'X' },
                      { primaryLabel: 'Y', value: 'Y' },
                      { primaryLabel: 'Z', value: 'Z' },
                      { primaryLabel: '0', value: '0' },
                      { primaryLabel: '1', value: '1' },
                      { primaryLabel: '2', value: '2' },
                      { primaryLabel: '3', value: '3' },
                      { primaryLabel: '4', value: '4' },
                      { primaryLabel: '5', value: '5' },
                      { primaryLabel: '6', value: '6' },
                      { primaryLabel: '7', value: '7' },
                      { primaryLabel: '8', value: '8' },
                      { primaryLabel: '9', value: '9' },
                    ]}
                  />
                </Grid>
              </Grid>
              <TextInput
                name="otherBookingClasses"
                label="Other Booking Classes e.g. (YQER2, ORTPL):"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="A123B, YXCR1, NCETL"
              />
            </Grid>

            <Grid item xs={12}>
              <Text
                showLeftBorder={true}
                text="Fare Calculation Details"
                className="font-primary-medium-18 my-24"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="calculatedFee"
                label="Fare, Surcharge &amp; Fee Calculated On:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Fare and Fee Criteria"
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                name="deal"
                label="Deal ( % ):"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Type Deal ( % )"
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
                name="dealAmount"
                label="Deal Amount:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Type Deal Amount"
              />
            </Grid>

            <Grid item xs={12}>
              <Text
                showLeftBorder={true}
                text="Segment Calculation Details"
                className="font-primary-medium-18 my-24"
              />
            </Grid>
            <Grid item xs={3}>
              <MultiSelect
                name="calculated"
                label="PAX &amp; Segment Calculated On:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Pax and Segment Criteria"
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                name="segmentDiscount"
                label="Segment Discount ( % ):"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Type Discount %"
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
                name="segmentDiscountAmount"
                label="Segment Discount Amount:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                placeholder="Type Amount"
              />
            </Grid>

            <Grid item xs={3}>
              <Button text="Add Segment" className="width-100 mt-12" />
            </Grid>
          </Grid>
        )}

        <TableContainer className="SegmentDetails-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="SegmentDetails-container-table-head">
              <TableRow>
                <TableCell align="center">SEG. NO.</TableCell>
                <TableCell align="left">DIRECTION</TableCell>
                <TableCell align="left">PAX TYPE</TableCell>
                <TableCell align="left">PAX COUNT</TableCell>
                <TableCell align="center">CABIN</TableCell>
                <TableCell align="center">RBD</TableCell>
                <TableCell align="center">CURRENCY</TableCell>
                <TableCell align="left">FARE CRITERIA</TableCell>
                <TableCell align="center">DEAL ( % )</TableCell>
                <TableCell align="center">DEAL AMT</TableCell>
                <TableCell align="left">SEGMENT CRITERIA</TableCell>
                <TableCell align="center">SEGMENT ( % )</TableCell>
                <TableCell align="center">SEGMENT AMT</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="SegmentDetails-container-table-body">
              <TableRow>
                <TableCell align="center" scope="row">
                  1
                </TableCell>
                <TableCell align="left"> OW,RT,MC</TableCell>
                <TableCell align="left">ADT, CHD, INF</TableCell>
                <TableCell align="left">2 ADT, 1 CHD, 1 INF</TableCell>

                <TableCell align="center">Y,P,J,F</TableCell>
                <TableCell align="center">All</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Base Fare</TableCell>
                <TableCell align="center">5%</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Per Pax Per Segment</TableCell>
                <TableCell align="center">5%</TableCell>
                <TableCell align="center"></TableCell>

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
                <TableCell align="center" scope="row">
                  1
                </TableCell>
                <TableCell align="left"> OW,RT,MC</TableCell>
                <TableCell align="left">ADT, CHD, INF</TableCell>
                <TableCell align="left">2 ADT, 1 CHD, 1 INF</TableCell>

                <TableCell align="center">Y,P,J,F</TableCell>
                <TableCell align="center">All</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Base Fare</TableCell>
                <TableCell align="center">5%</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Per Pax Per Segment</TableCell>
                <TableCell align="center">5%</TableCell>
                <TableCell align="center"></TableCell>

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

export default SegmentDetails;
