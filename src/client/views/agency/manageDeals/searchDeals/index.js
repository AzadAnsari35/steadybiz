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
} from 'Widgets';
import PrimaryTable from 'Widgets/PrimaryTable';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';
import CachedIcon from '@material-ui/icons/Cached';
import FlightIcon from '@material-ui/icons/Flight';
import { useForm } from 'react-hook-form';

import './style.scss';

const response = {
  status: true,
  count: 3,
  data: [
    {
      dealCode: 'DELBOM023',
      dealName: 'Travel Offer 1',
      source: 'Etihad Airways',
      airline: 'EY',
      origin: 'AUH',
      destination: 'LHR',
      fromCountry: 'AE',
      toCountry: 'UK',
      bookStartDate: '7-OCT-2020',
      bookEndDate: '7-NOV-2020',
      status: 'Active',
    },
    {
      dealCode: 'DELBOM023',
      dealName: 'Travel Offer 2',
      source: 'Etihad Airways',
      airline: 'EY',
      origin: 'AUH',
      destination: 'LHR',
      fromCountry: 'AE',
      toCountry: 'UK',
      bookStartDate: '7-OCT-2020',
      bookEndDate: '7-NOV-2020',
      status: 'Active',
    },
    {
      dealCode: 'DELBOM023',
      dealName: 'Travel Offer 3',
      source: 'Etihad Airways',
      airline: 'EY',
      origin: 'AUH',
      destination: 'LHR',
      fromCountry: 'AE',
      toCountry: 'UK',
      bookStartDate: '7-OCT-2020',
      bookEndDate: '7-NOV-2020',
      status: 'Active',
    },
  ],
};

const headerData = [
  'DEAL CODE',
  'DEAL NAME',
  'SOURCE',
  'AIRLINE',
  'ORIGIN',
  'DESTINATION',
  'FROM COUNTRY',
  'TO COUNTRY',
  'TICKET START DATE',
  'TICKET END DATE',
  'STATUS',
  'ACTION',
];

const PopoverAction = ({ rowNumber }) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };
  const handleClick = (e) => {
    utils.setItemToStorage('selectedDeals', rowNumber);
  };

  return (
    <>
      <MoreVertIcon className="cursor-pointer" onClick={handlePopoverOpen} />
      <SimplePopover
        open={showPopover}
        handleClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div
          className="SearchSecurityGroup-tableAction d-flex flex-direction-column"
          onClick={handleClick}
        >
          <Link
            to={routes.agency.viewDeal}
            className="font-primary-regular-14"
            name="view"
          >
            View Deal
          </Link>
          <Link
            to={routes.agency.modifyDeal}
            className="font-primary-regular-14"
            name="modify"
          >
            Modify Deal
          </Link>

          <Link
            to={routes.agency.dealHistory}
            className="font-primary-regular-14"
            name="history"
          >
            Deal History
          </Link>
        </div>
      </SimplePopover>
    </>
  );
};

const SearchDeals = () => {
  const { register, handleSubmit, errors, control, watch, reset } = useForm();
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const history = useHistory();

  const handlePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="SearchDeals">
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
          text="SEARCH DEALS"
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
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Source:"
              name="source"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              control={control}
              errors={errors}
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
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="dealCode"
              label="Deal Code:"
              errors={errors}
              register={register}
              placeholder="Type Deal Code"
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketFromDate"
              label="Ticket From Date:"
              control={control}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="ticketToDate"
              label="Ticket To Date:"
              control={control}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="travelFromDate"
              label="Travel From Date:"
              control={control}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              name="bookingToDate"
              label="Travel To Date:"
              control={control}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="origin"
              label="Origin:"
              placeholder="Type and select Origin"
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="destination"
              label="Destination:"
              placeholder="Type and select Destination"
              errors={errors}
              register={register}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Airline:"
              name="airline"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              control={control}
              errors={errors}
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
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} className="d-flex justify-content-end pt-32">
            <Button
              text="Create"
              secondary
              className=" px-48 mr-10"
              onClick={() => history.push(routes.agency.createDeal)}
            />

            <Button type="submit" text="Search" className=" px-48" />
          </Grid>
        </Grid>
      </div>

      {response.status && (
        <PrimaryTable
          header={
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
          }
          headerData={headerData}
          bodyData={response}
          page={page}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={response.count}
          size={size}
          columnAlignments={[
            'center',
            'center',
            'left',
            'center',
            'center',
            'center',
            'center',
            'center',
            'center',
            'center',
            'left',
            'center',
          ]}
          statusIndex={10}
          handlePage={handlePage}
        />
      )}
    </div>
  );
};

export default SearchDeals;
