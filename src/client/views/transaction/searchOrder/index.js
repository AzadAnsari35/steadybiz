import Grid from '@material-ui/core/Grid';
import CachedIcon from '@material-ui/icons/Cached';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { commonAction } from 'Actions/';
import endpoint from 'Config/endpoint.js';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  PNR_STATUS,
  PNR_TYPE,
  BOOKING_CATEGORY,
  SEARCH_DATE_TYPE,
} from 'Constants/commonConstant';
import useDropDownApi from 'Hooks/useDropDownApi';
import {
  Button,
  IconWithBackground,
  MultiSelect,
  PrimaryTable,
  PrimaryTableHeader,
  SelectWithDatePickers,
  SelectWithTextInput,
  SimplePopover,
  Text,
  TextInput,
} from 'Widgets';
import securityOptionConstant from 'Constants/securityOptionConstant';
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
    (state) => state[endpoint.orders.searchOrders.reducerName]?.items?.data
  );

  const dispatch = useDispatch();

  const { rowNumber } = props;

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

  const actualStatus = searchResult?.data[rowNumber]?.actualStatus;

  //console.log('rowNumber', status);
  //const retieveOrder = (orderNo) => {};
  const handleClick = (e) => {
    const selectedOption = e.currentTarget.getAttribute('name');

    let selectedItem = searchResult.data.data[rowNumber];

    let orderNo = selectedItem.orderNo;
    // orderNo = 'OKT0000000155';
    //console.log(orderNo);
    switch (selectedOption) {
      case 'view': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.transaction.viewOrder
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        viewOrder(orderNo, 'view');

        break;
      }
      case 'issue': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.flights.issueTicket
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        viewOrder(orderNo, 'retieve');

        break;
      }

      case 'viewBooking': {
        const securityMessage = utils.checkSecurityGroup(
          securityOptionConstant.transaction.viewBooking
        );
        if (securityMessage !== '') {
          dispatch(utils.showErrorBox(securityMessage));
          return;
        }
        viewOrder(orderNo, 'view');

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
          {actualStatus === 'HOLD_PNR' ||
            actualStatus === 'PNR_CANCELLED' ||
            (actualStatus === 'FAILED_PNR' && (
              <div
                className="font-primary-regular-14 cursor-pointer"
                onClick={handleClick}
                name="view"
              >
                View PNR{' '}
              </div>
            ))}
          {actualStatus === 'HOLD_PNR' && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="issue"
            >
              Issue Ticket{' '}
            </div>
          )}
          {actualStatus === 'BOOKED' && (
            <div
              className="font-primary-regular-14 cursor-pointer"
              onClick={handleClick}
              name="viewBooking"
            >
              View Booking{' '}
            </div>
          )}
        </div>
      </SimplePopover>
    </>
  );
};

const SearchOrder = () => {
  const [requestJson, setReqeustJson] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
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
    origin: '',
    destination: '',
    paxSearchValue: '',
    paxInfoType: '',
    bookingCategory: '',
    bookingStatus: '',
    userId: '',
    officeID: officeId,
  };

  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues,
  });

  const ofId = utils.getItemFromStorage('officeId');
  const userNameList = useDropDownApi(endpoint.office.searchUserDropDown, {
    ofid: ofId,
    size: 1000,
    page: 0,
  });
  // console.log('jj', userNameList.dropDownItems);
  // console.log(PNR_STATUS);
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
      const securityMessage = utils.checkSecurityGroup(
        securityOptionConstant.transaction.searchOrder
      );
      if (securityMessage !== '') {
        dispatch(utils.showErrorBox(securityMessage));
        return;
      }
      dispatch(
        commonAction(endpoint.orders.searchOrders, {
          ...requestJson,
          page: page - 1,
          size,
          ofid: ofId,
        })
      );
    } catch (err) {
      dispatch(utils.showErrorBox(err.message));
    }
  };
  const handelPaxInfoType = (e) => {
    alert(e);
  };
  const onSubmit = (data) => {
    // console.log('data', data);
    setPage(1);
    setReqeustJson(data);
    //setPage(1);
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
                data={PNR_TYPE}
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
                data={SEARCH_DATE_TYPE}
                control={control}
                selectPlaceholder="Booking"
                label="Date:"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Booking Category:"
                name="bookingCategory"
                options={BOOKING_CATEGORY}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <SelectWithTextInput
                name="paxSearchValue"
                selectInputName="paxInfoType"
                data={[
                  { value: 'M', label: 'Mobile Number' },
                  { value: 'L', label: 'Last Name' },
                  { value: 'E', label: 'Email ID' },
                ]}
                label="PAX Info:"
                placeholder="Mobile Number"
                selectPlaceholder="Mobile Number"
                errors={errors}
                register={register}
                control={control}
                onSelectChange={handelPaxInfoType}
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
                name="userId"
                options={userNameList.dropDownItems}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                isSearchable
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                label="Status:"
                name="bookingStatus"
                options={PNR_STATUS}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
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
            last: <PopoverAction />,
          }}
          count={searchResult.data.count}
          size={size}
          columnAlignments={[
            'center',
            'center',
            'left',
            'center',
            'center',
            'center',
            'left',
            'center',
            'center',
            'center',
          ]}
          statusIndex={8}
          handlePage={handlePage}
          hideKeys={['actualStatus', 'officeId']}
        />
      )}
    </div>
  );
};

export default SearchOrder;
