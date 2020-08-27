import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { regex } from 'Helpers/validator';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  MultiSelect,
  IconWithBackground,
  Text,
  TextInput,
  SimplePopover,
  PrimaryTable,
  PrimaryTableHeader,
  SelectWithTextInput,
  SelectWithDatePickers,
} from 'Widgets';
import routes from 'Constants/routes';
import { useHistory } from 'react-router-dom';
import endpoint from 'Config/endpoint.js';

import { commonAction } from 'Actions/';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from 'Helpers';

import CachedIcon from '@material-ui/icons/Cached';

import './style.scss';

const headerData = [
  'BOOKING DATE',
  'ORDER#',
  'SOURCE',
  'SOURCE PNR',
  'AIRLINE PNR',
  'TRAVEL DATE',
  'PAX NAME',
  'SECTOR',
  'MOBILE',
  'STATUS',
  'TIME LIMIT',
  'ACTION',
];

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const { rowNumber, isBooking } = props;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };
  const viewOrder = (orderNumber, type) => {
    dispatch(utils.HideAlertBox());
    utils.setItemToStorage('searchOrderActionType', type);
    dispatch(
      commonAction(endpoint.orders.viewOrder, {
        orderNumber: orderNumber,
        type: type,
      })
    );
  };
  //const retieveOrder = (orderNo) => {};
  const handleClick = (e) => {
    const selectedOption = e.currentTarget.getAttribute('name');

    let selectedItem = searchResult.data.data[rowNumber];
    const status = selectedItem.status.toUpperCase();

    let orderNo = selectedItem.orderNo;
    // orderNo = 'OKT0000000155';
    //console.log(orderNo);
    switch (selectedOption) {
      case 'view': {
        if (status == 'HOLD' || status == 'CANCELLED')
          viewOrder(orderNo, 'view');
        else
          dispatch(
            utils.showErrorBox(
              'you can perform this action on hold or cancelled status pnr'
            )
          );
        break;
      }
      case 'issue': {
        if (status == 'HOLD') viewOrder(orderNo, 'retieve');
        else
          dispatch(
            utils.showErrorBox('you can perform this action on hold status pnr')
          );
        break;
      }

      case 'viewBooking': {
        if (status == 'BOOKED') viewOrder(orderNo, 'view');
        else
          dispatch(
            utils.showErrorBox(
              'you can perform this action on booked status pnr'
            )
          );

        break;
      }

      default: {
        return;
      }
    }
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
        <div className="SearchUser-tableAction d-flex flex-direction-column">
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="view"
          >
            View PNR{' '}
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="issue"
          >
            Issue Ticket{' '}
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={handleClick}
            name="viewBooking"
          >
            View Booking{' '}
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const SearchOrder = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const firstPageUpdate = useRef(true);
  let history = useHistory();
  let dispatch = useDispatch();
  const userData = JSON.parse(utils.getItemFromStorage('userData'));
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel },
    },
  } = userData;
  const defaultValues = {
    orderNo: '',
    pnr: '',
    officeID: officeId,
  };

  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues,
  });

  const ofId = utils.getItemFromStorage('officeId');
  const searchResult = useSelector(
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items
  );
  const viewPNR = useSelector(
    (state) => state[endpoint.orders.viewOrder.reducerName]?.items
  );
  useEffect(() => {
    //console.log(viewPNR);
    const actionType = utils.getItemFromStorage('searchOrderActionType');
    // console.log(actionType);
    // alert(actionType);
    if (viewPNR != null && actionType != '') {
      const error = utils.checkError(viewPNR);
      if (error == '') {
        utils.setItemToStorage('searchOrderActionType', '');
        if (actionType == 'view') history.push(routes.transaction.viewPNR);
        else if (actionType == 'retieve')
          history.push(routes.transaction.issueTicket);
        else history.push(routes.transaction.viewBooking);
      } else dispatch(utils.showErrorBox(error));
    }
  }, [viewPNR]);
  useEffect(() => {
    if (requestJson !== null) {
      dispatch(utils.HideAlertBox());
      callSearch(page);
    }
  }, [requestJson]);

  useEffect(() => {
    if (searchResult != null) {
      const errMsg = utils.checkError(searchResult);
      if (errMsg !== '') {
        dispatch(utils.showErrorBox(errMsg));
      }
    }
  }, [searchResult]);

  useEffect(() => {
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    callSearch(page);
  }, [page]);

  const handlePage = (newPage) => {
    // console.log(newPage);
    setPage(newPage);
  };

  const callSearch = (page) => {
    //console.log('hi', requestJson);
    try {
      dispatch(
        commonAction(endpoint.orders.searchOrders, {
          ...requestJson,
          page: page,
          size,
          ofid: ofId,
        })
      );
    } catch (err) {
      dispatch(utils.showErrorBox(err.message));
    }
  };

  const onSubmit = (data, e) => {
    // console.log('data', data);
    setReqeustJson(data);
    setPage(1);
  };

  const handleClick = () => {
    history.push(routes.office.createOffice);
    utils.setItemToStorage('selectedOffice', '');
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return (
    <div className="SearchOrder">
      <div className="SearchOrder-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 ">SEARCH ORDER</div>
          <IconWithBackground
            bgColor="#74D3DC33"
            showCursor
            onClick={handleReset}
          >
            <CachedIcon style={{ color: '#74D3DC' }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="ofid" value={ofId} ref={register}></input>
          <input type="hidden" name="size" value={size} ref={register}></input>

          <Text
            showLeftBorder={true}
            text="SEARCH PNR | BOOKING"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextInput
                label="Order Number:"
                placeholder="Order Number"
                name="orderNo"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="pnr"
                selectInputName="sabre"
                data={[]}
                label="PNR: "
                placeholder="PNR Number"
                selectPlaceholder="Sabre"
                errors={errors}
                register={register}
                control={control}
                showValue
                selectWidth="50%"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                label="Origin:"
                name="origin"
                register={register}
                errors={errors}
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                label="Destination:"
                name="destination"
                register={register}
                errors={errors}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectWithDatePickers
                name={{
                  select: 'booking',
                  datePicker1: 'dateFrom',
                  datePicker2: 'dateTo',
                }}
                control={control}
                showValue
                label="Date:"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Booking Category:"
                name="bookingCategory"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <SelectWithTextInput
                name="mobile"
                selectInputName="mobileDialCode"
                data={[]}
                label="PAX Info:"
                placeholder="Mobile Number"
                selectPlaceholder="Mobile"
                errors={errors}
                register={register}
                control={control}
                showValue
                selectWidth="50%"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <TextInput
                label="Office ID:"
                name="officeID"
                register={register}
                control={control}
                errors={errors}
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="User Name:"
                name="userName"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Status:"
                name="status"
                options={[]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <div className="d-flex justify-content-end pt-32">
                {/* <Button
                  text="CHANGE OFFICE"
                  secondary
                  className=" px-48 mr-10"
                  onClick={() => handleClick()}
                /> */}

                <Button type="submit" text="Search" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {searchResult?.status && (
        <PrimaryTable
          header={
            <PrimaryTableHeader
              officeName={officeName}
              officeId={officeId}
              officeLevel={officeLevel}
            />
          }
          headerData={headerData}
          bodyData={searchResult.data}
          page={page}
          AddElement={{
            last: <PopoverAction isBooking={1} />,
          }}
          count={searchResult.data.count}
          size={size}
          columnAlignments={[
            'left',
            'center',
            'left',
            'center',
            'left',
            'center',
            'center',
            'right',
            'left',
            'center',
          ]}
          statusIndex={8}
          handlePage={handlePage}
          hideKeys={['officeId']}
        />
      )}
    </div>
  );
};

export default SearchOrder;
