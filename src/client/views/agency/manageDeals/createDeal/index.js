import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import FlightIcon from '@material-ui/icons/Flight';
import { utils } from 'Helpers';
import React from 'react';
import {
  Button,
  CustomCheckbox,
  DatePicker,
  IconWithBackground,
  MultiSelect,
  Panel,
  Text,
  TextInput,
} from 'Widgets';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import {
  Source,
  Aggregator,
  Gds,
  Airlines,
  Segments,
  SegmentDetails,
  AgencyCommission,
  DealApplicable,
} from 'Components/Agency/Deals';
import { useHistory, useLocation } from 'react-router-dom';

import { colors, routes } from 'Constants';
import './style.scss';
const CreateDeal = () => {
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  const location = useLocation();
  const history = useHistory();

  const path = location.pathname;

  const isCreateDeal = utils.stringComparison(path, routes.agency.createDeal);
  const isUpdateDeal = utils.stringComparison(path, routes.agency.modifyDeal);
  const isViewDeal = utils.stringComparison(path, routes.agency.viewDeal);
  const isDealHistory = utils.stringComparison(path, routes.agency.dealHistory);

  return (
    <div className="CreateDeal">
      <div className="CreateDeal-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">MANAGE DEALS</div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.agency.searchDeals)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <Text
          showLeftBorder={true}
          text={`${
            isCreateDeal
              ? 'CREATE DEAL'
              : isUpdateDeal
              ? 'MODIFY DEAL'
              : isViewDeal
              ? 'VIEW DEAL'
              : 'DEAL HISTORY'
          }`}
          className="font-primary-medium-18 my-24"
        />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MultiSelect
              label="Service:"
              name="service"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Deal Code:"
              name="dealCode"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Deal Name:"
              name="dealName"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Status:"
              name="status"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
              disabled={!isUpdateDeal}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketFromDate"
              label="Ticket From Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketToDate"
              label="Ticket To Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="travelFromDate"
              label="Travel From Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="bookingToDate"
              label="Travel To Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>

          <Grid item xs={isDealHistory ? 9 : 12}>
            <TextInput
              name="description"
              label="Description:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Description"
              disabled={isViewDeal || isDealHistory}
            />
          </Grid>
          {isDealHistory && (
            <Grid item xs={3}>
              <MultiSelect
                label="Deal History Date:"
                name="dealHistoryDate"
                options={[]}
                showBorder={true}
                changeStyle={true}
                showValue
                width="auto"
                useReactHookForm={false}
              />
            </Grid>
          )}
        </Grid>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <div className="d-flex py-20">
              <span className="font-primary-medium-14">
                Deal Applicable for:
              </span>
              <CustomCheckbox
                value="own"
                onChange={() => console.log('object')}
                useReactHookForm={false}
                name="dealApplicableFor"
                primaryLabel="Own"
                className="pl-40"
                disabled={isViewDeal || isDealHistory}
              />

              <CustomCheckbox
                value="branches"
                onChange={() => console.log('object')}
                useReactHookForm={false}
                name="dealApplicableFor"
                primaryLabel="Branches"
                className="pl-40"
                disabled={isViewDeal || isDealHistory}
              />

              <CustomCheckbox
                value="subAgency"
                onChange={() => console.log('object')}
                useReactHookForm={false}
                name="dealApplicableFor"
                primaryLabel="Sub-Agency"
                className="pl-40"
                disabled={isViewDeal || isDealHistory}
              />
            </div>

            <div className="font-primary-italic-14">
              <b>Please Note:</b> The Create Deals button should only be clicked
              after defining Deal Applicable Criteria below to this newly
              created Deal.
            </div>
          </div>

          {!isViewDeal && (
            <div className="d-flex justify-content-end pt-32">
              <Button
                type="submit"
                text={`${
                  isCreateDeal
                    ? 'Create Deal'
                    : isUpdateDeal
                    ? 'MODIFY DEAL'
                    : 'Search Deal History'
                }`}
                className=" px-48"
              />
            </div>
          )}
        </div>
      </div>
      <div className="CreateDeal-panel">
        <div className="CreateDeal-panel-heading d-flex justify-content-between  pb-16">
          <div className="font-primary-medium-20">
            Deal Applicable Criteria:
          </div>
          {isCreateDeal && (
            <div className="font-primary-medium-14 d-flex align-items-center">
              Deal Template:
              <MultiSelect
                name="existingDeals"
                options={[{ label: 'Existing Plans', value: 'existing plans' }]}
                width={150}
                defaultValue={[
                  { label: 'Existing Plans', value: 'existing plans' },
                ]}
                useReactHookForm={false}
                onSelectChange={() => console.log()}
                className="ml-10"
                isSearhable={false}
              />
            </div>
          )}
        </div>
        <Panel hideHeader={true} expand={true} panelBodyClassName="px-32">
          <PrimaryTableHeader
            officeName={officeName}
            officeId={officeId}
            officeLevel={officeLevel}
            showServiceIcon={{
              icon: (
                <FlightIcon
                  style={{ transform: 'rotate(90deg)', fontSize: 18 }}
                />
              ),
              text: 'Flight',
            }}
          />

          <Source
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <Aggregator
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <Gds
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <Airlines
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <Segments
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <SegmentDetails
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <AgencyCommission
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
          <DealApplicable
            path={{ isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory }}
          />
        </Panel>
      </div>
    </div>
  );
};

export default CreateDeal;
