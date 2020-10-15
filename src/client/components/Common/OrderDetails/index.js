import React from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import CachedIcon from '@material-ui/icons/Cached';
import { Text, IconWithBackground } from 'Widgets';

import './style.scss';

const OrderDetails = (props) => {
  const {
    isTicketing = false,
    pnrStatus = '',
    actualStatus = '',
    orderNumber = '',
    sourceName = '',
    sourcePnr = '',
    ticketTimeLimit = '',
    refreshOrder,
  } = props;
  const isWaiting =
    actualStatus === 'HOLD_PNR' || actualStatus === 'SEGMENT_UNCONFIRMED';
  //console.log(actualStatus);
  const handleRefresh = () => {
    refreshOrder(orderNumber);
  };
  return (
    <div className="OrderDetails">
      <Grid item xs={12} md={6}>
        <Text
          className="OrderDetails-orderNo font-primary-medium-32"
          text={`Order # : ${orderNumber}`}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="d-flex OrderDetails-summary">
          <div className="OrderDetails-summary__itemContainer font-primary-medium-16">
            <div className="OrderDetails-summary__item d-flex">
              <Text
                className="mr-4"
                text={`${isTicketing ? 'Booking' : 'PNR'} Date`}
              />
              <Text className="ml-4" text=" : " />
            </div>
            {!!sourcePnr && (
              <div className="OrderDetails-summary__item d-flex">
                <Text className="mr-4" text={`${sourceName} PNR`} />
                <Text className="ml-4" text=" : " />
              </div>
            )}
            <div className="OrderDetails-summary__item d-flex">
              <Text className="mr-4" text="Status" />
              <Text className="ml-4" text=" : " />
            </div>
            {isWaiting && (
              <div className="OrderDetails-summary__item d-flex">
                <Text className="mr-4" text="Time Limit" />
                <Text className="ml-4" text=" : " />
              </div>
            )}
          </div>
          <div className="position-relative font-primary-semibold-16-1 text-align-right">
            <Text text={moment().format('DD MMM YYYY')} />
            {!!sourcePnr && <Text text={sourcePnr} />}
            <Text text={pnrStatus ? pnrStatus : '-'} />{' '}
            {isWaiting && (
              <IconWithBackground
                bgColor="#74D3DC33"
                showCursor
                onClick={handleRefresh}
                className="OrderDetails-summary__refresh"
              >
                <CachedIcon style={{ color: '#74D3DC' }} />
              </IconWithBackground>
            )}
            {/* <Text text={!!isTicketing ? "Confirmed" : "Hold"} /> */}
            {isWaiting && (
              <Text
                className="text-align-right"
                text={
                  ticketTimeLimit == '' ||
                  ticketTimeLimit == null ||
                  ticketTimeLimit == undefined
                    ? 'Waiting'
                    : `${moment(ticketTimeLimit).format(
                        'DD MMMM YYYY, hh:mm'
                      )} Hrs`
                }
              />
            )}
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default OrderDetails;
