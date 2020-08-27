import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  MultiSelect,
  SimplePopover,
  Text,
  IconWithBackground,
  TextInput,
  DatePicker,
  CustomCheckbox,
} from 'Widgets';
import PrimaryTable from 'Widgets/PrimaryTable';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import CachedIcon from '@material-ui/icons/Cached';
import FlightIcon from '@material-ui/icons/Flight';
import './style.scss';
const CreateDeal = () => {
  return (
    <div>
      <div className="SearchDeals-head">
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
              name="bookingFromDate"
              label="Booking From Date:"
              onChange={() => console.log('value')}
              useReactHookForm={false}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="bookingToDate"
              label="Booking To Date:"
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
        <div>
          <div>
            <CustomCheckbox
              value="own"
              onChange={() => console.log('object')}
              useReactHookForm={false}
              name="own"
              primaryLabel="Own"
            />
          </div>

          <div className="d-flex justify-content-end pt-32">
            <Button type="submit" text="Create Deal" className=" px-48" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDeal;
