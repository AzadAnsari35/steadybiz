import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
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
import { Source, Aggregator } from 'Components/Agency/Deals';
import './style.scss';
const CreateDeal = () => {
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  return (
    <div className="CreateDeal">
      <div className="CreateDeal-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">MANAGE DEALS</div>
          <IconWithBackground
            bgColor="#74D3DC33"
            showCursor
            // onClick={handleReset}
          >
            <CachedIcon style={{ color: '#74D3DC' }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <Text
          showLeftBorder={true}
          text="CREATE DEALS"
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
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Deal Name:"
              name="dealName"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
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
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketFromDate"
              label="Ticket From Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketToDate"
              label="Ticket To Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="travelFromDate"
              label="Travel From Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="bookingToDate"
              label="Travel To Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              name="description"
              label="Description:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Description"
            />
          </Grid>
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
              />

              <CustomCheckbox
                value="branches"
                onChange={() => console.log('object')}
                useReactHookForm={false}
                name="dealApplicableFor"
                primaryLabel="Branches"
                className="pl-40"
              />

              <CustomCheckbox
                value="subAgency"
                onChange={() => console.log('object')}
                useReactHookForm={false}
                name="dealApplicableFor"
                primaryLabel="Sub-Agency"
                className="pl-40"
              />
            </div>

            <div className="font-primary-italic-14">
              <b>Please Note:</b> The Create Deals button should only be clicked
              after defining Deal Applicable Criteria below to this newly
              created Deal.
            </div>
          </div>

          <div className="d-flex justify-content-end pt-32">
            <Button type="submit" text="Create Deal" className=" px-48" />
          </div>
        </div>
      </div>
      <div className="CreateDeal-panel">
        <Panel hideHeader={true} expand={true}>
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

          <Source />
          <Aggregator />
        </Panel>
      </div>
    </div>
  );
};

export default CreateDeal;
