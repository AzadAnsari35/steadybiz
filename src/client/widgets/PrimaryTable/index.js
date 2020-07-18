import React, { Fragment, useState, Children } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from 'Widgets/Avatar';

// import { SimplePopover } from "../popover";
import { Link, withRouter } from 'react-router-dom';
import './style.scss';

const PrimaryTable = (props) => {
  const {
    headerData,
    bodyData = [],
    AddElement,
    header,
    count,
    size,
    children,
    columnAlignments,
    statusIndex = -1,
    imageIndex = -2,
  } = props;

  const [lowOffset, setLowOffset] = React.useState(1);
  const [highOffset, setHighOffset] = React.useState(3);
  const [page, setPage] = React.useState(1);

  const statusColor = (status) => {
    switch (status) {
      case 'Active': {
        return ' PrimaryTable-status PrimaryTable-status-active';
      }
      case 'Inactive': {
        return ' PrimaryTable-status PrimaryTable-status-inactive';
      }
      case 'Freeze': {
        return ' PrimaryTable-status PrimaryTable-status-freeze';
      }
      case 'Register': {
        return 'PrimaryTable-status PrimaryTable-status-register';
      }
      case 'Reject': {
        return 'PrimaryTable-status PrimaryTable-status-reject';
      }
    }
  };

  const handleChangePage = (event) => {};

  const setAlignment = (index) => {
    return columnAlignments[index];
  };

  return (
    <Fragment>
      <TableContainer>
        <div className="PrimaryTable">
          {header}
          <div>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headerData.map((header, index) => (
                    <TableCell
                      key={`head-${index}`}
                      align={setAlignment(index)}
                      className="PrimaryTable-head-cell "
                      style={index === imageIndex ? { paddingLeft: 72 } : {}}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="PrimaryTable-body">
                {bodyData.data.length > 0 &&
                  bodyData.data.map((body, ind) => (
                    <TableRow key={ind}>
                      {Object.keys(body).map((key, index) => (
                        <TableCell
                          component="th"
                          scope="row"
                          key={`body-${index}`}
                          align={setAlignment(index)}
                          style={
                            index === imageIndex ? { paddingLeft: 72 } : {}
                          }
                          className={`PrimaryTable-body-cell position-relative ${
                            index === statusIndex ? statusColor(body[key]) : ''
                          }`}
                        >
                          {index === imageIndex && (
                            <Avatar
                              className="font-primary-medium-16 PrimaryTable-body-imageCell"
                              size="18px"
                            ></Avatar>
                          )}
                          {body[key]}
                        </TableCell>
                      ))}
                      {AddElement.last && (
                        <TableCell component="th" scope="row" align="center">
                          {AddElement.last}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                {children}
              </TableBody>
            </Table>
          </div>
          <div className="PrimaryTable-footer">
            {highOffset - lowOffset >= count && page === 0 ? null : (
              <div className="PrimaryTable-footer-records">
                Showing{' '}
                <span>
                  {lowOffset} - {highOffset}{' '}
                </span>
                of {count} Records
              </div>
            )}

            <div>
              {count > size ? (
                <Pagination
                  count={Math.ceil(count / size)}
                  page={page}
                  total={count}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                />
              ) : null}
            </div>
          </div>
        </div>
      </TableContainer>
    </Fragment>
  );
};

export default PrimaryTable;
