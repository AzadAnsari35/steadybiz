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
import { Button, MultiSelect, SecondaryAccordion, TextInput } from 'Widgets';
import './style.scss';

const AgencyCommission = () => {
  return (
    <SecondaryAccordion
      text="AGENCY COMMISSION &amp; CRITERIA"
      defaultOpen={true}
      // className={curData.className}
      className="AgencyCommission"
    >
      <div className="AgencyCommission-container">
        <Grid
          container
          spacing={1}
          className="AgencyCommission-container-form"
          alignItems="flex-end"
          justify="flex-end"
        >
          <Grid item xs={3}>
            <MultiSelect
              name="agencyGroup"
              label="Agency Group:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Agency Group"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="segmentLineNo."
              label="Segment Line No.:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Seg Line No."
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="commissionCriteria"
              label="Commission Criteria:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Commission Criteria"
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
              name="dealCommission"
              label="Deal Commission (%):"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              placeholder="Commission %"
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="dealCommissionAmount"
              label="Deal Commission Amount:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              placeholder="Amount"
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
            <TextInput
              name="maxDiscountedAmount"
              label="Max Discounted Amount:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              placeholder="Type Amount"
            />
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <Button
              text="Add Commission Criteria"
              className="width-100 mt-12"
            />
          </Grid>
        </Grid>

        <TableContainer className="AgencyCommission-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="AgencyCommission-container-table-head">
              <TableRow>
                <TableCell align="left">AGENCY GROUP</TableCell>
                <TableCell align="center">SEG. NO.</TableCell>
                <TableCell align="center">CURRENCY</TableCell>
                <TableCell align="center">COMM. ( % )</TableCell>
                <TableCell align="center">COMM. AMT</TableCell>
                <TableCell align="center">SEG.DISC. (%)</TableCell>
                <TableCell align="center">SEG.DISC. AMT</TableCell>

                <TableCell align="left">
                  COMMISSION CRITERIA APPLICABLE
                </TableCell>
                <TableCell align="center">MAX DISC. AMT</TableCell>

                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="AgencyCommission-container-table-body">
              <TableRow>
                <TableCell align="left" scope="row">
                  Best Seller
                </TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">2%</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>

                <TableCell align="left">
                  Deal ( % / Amt) + Seg. ( % / Amt ) + Airline Comm. + Airline
                  Incentive + GDS Disc. + Markup + Disc.
                </TableCell>
                <TableCell align="center">70</TableCell>

                <TableCell align="center">
                  <div>
                    <DeleteIcon
                      style={{ color: colors.cornflowerBlue }}
                      className="cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" scope="row">
                  Best Seller
                </TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">2%</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>

                <TableCell align="left">
                  Deal ( % / Amt) + Seg. ( % / Amt ) + Airline Comm. + Airline
                  Incentive + GDS Disc. + Markup
                </TableCell>
                <TableCell align="center">70</TableCell>

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
