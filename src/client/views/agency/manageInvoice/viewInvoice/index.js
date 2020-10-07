import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import colors from 'Constants/colors';
import React from 'react';
import { IconWithBackground, PrimaryTable } from 'Widgets';
import { useHistory } from 'react-router-dom';
import InvoiceTableHeader from 'Components/Common/InvoiceTableHeader';
import viewInvoiceData from './viewInvoice.json';
import routes from 'Constants/routes';

import './style.scss';

const headerData = [
  { id: 'date', value: 'DATE', alignment: 'center' },
  { id: 'officeId', value: 'OFFICE ID', alignment: 'center' },
  { id: 'txnType', value: 'TXN TYPE', alignment: 'left' },
  { id: 'ordersNumber', value: 'ORDERS NO.', alignment: 'center' },
  { id: 'currency', value: 'CURRENCY', alignment: 'center' },
  { id: 'totalAmount', value: 'TOTAL AMT.', alignment: 'right' },
  { id: 'totalCommission', value: 'TOTAL COMN.', alignment: 'right' },
  { id: 'vatAmount', value: 'VAT/GST AMT.', alignment: 'right' },
  { id: 'payMode', value: 'PAY MODE', alignment: 'left' },
  { id: 'netAmtPaid', value: 'NET AMT PAID', alignment: 'right' },
];

const ViewInvoice = () => {
  const history = useHistory();
  return (
    <div className="ViewInvoice">
      <div className="ViewInvoice-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24">MANAGE INVOICE </div>

          <div className="d-flex">
            <IconWithBackground
              bgColor={colors.california1}
              showCursor
              className="mr-6"
            >
              <PrintIcon style={{ color: colors.california }} />
            </IconWithBackground>

            <IconWithBackground bgColor={colors.lightRed} showCursor>
              <CloseIcon
                style={{ color: colors.red }}
                onClick={() => history.push(routes.agency.searchInvoice)}
              />
            </IconWithBackground>
          </div>
        </div>
        <div className="horizontal-grey-divider"></div>
      </div>
      <div className="ViewInvoice-table">
        {viewInvoiceData && (
          <PrimaryTable
            header={<InvoiceTableHeader />}
            headerInArrOfObjFormat
            headerData={headerData}
            subHeaderData={{
              ...viewInvoiceData.data.data.subHeaderData,
            }}
            bodyData={viewInvoiceData.data.data}
            count={viewInvoiceData.data.count}
          />
        )}
      </div>
    </div>
  );
};

export default ViewInvoice;
