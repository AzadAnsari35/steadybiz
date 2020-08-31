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
import './style.scss';

const SegmentDetails = () => {
  return (
    <SecondaryAccordion
      text="SEGMENTS DETAILS"
      defaultOpen={true}
      // className={curData.className}
      className="SegmentDetails"
    >
      <div className="SegmentDetails-container">
        <Grid
          container
          spacing={1}
          className="SegmentDetails-container-form"
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
              <Grid item xs={12}>
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

          {/* <Grid item xs={3}>
            <Button text="Add Airline (s)" className="width-100 mt-12" />
          </Grid> */}
        </Grid>

        <TableContainer className="SegmentDetails-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="SegmentDetails-container-table-head">
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
            <TableBody className="SegmentDetails-container-table-body">
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

export default SegmentDetails;
