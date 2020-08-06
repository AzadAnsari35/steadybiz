import React, { Fragment, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import Avatar from 'Widgets/Avatar';
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
    hideKeys = '',
    page = 1,
    handlePage,
    tableStyling,
  } = props;

  const [lowOffset, setLowOffset] = React.useState(1);
  const [highOffset, setHighOffset] = React.useState(size);

  const statusColor = (status) => {
    return `PrimaryTable-status ${status} `;
  };

  const handleChangePage = (event, newPage) => {
    handlePage(newPage);
    handleOffset(newPage);
  };

  const handleOffset = (newPage) => {
    setLowOffset(size * (newPage - 1) + 1);
    let updatedHightOffset = newPage * size;
    setHighOffset(count > updatedHightOffset ? updatedHightOffset : count);
  };

  const setAlignment = (index) => {
    return columnAlignments[index];
  };

  const applyStyle = (index) => {
    return tableStyling?.length && tableStyling[index];
  };

  const showEntries = (key) => {
    const index = hideKeys.indexOf(key);
    return index < 0;
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
                  {headerData.map((header, index, arr) =>
                    Array.isArray(header) ? (
                      <TableCell
                        className="PrimaryTable-head-cell PrimaryTable-nestedHead-cell"
                        colSpan={3}
                        padding="none"
                        align="center"
                      >
                        {header[0]}
                        <div
                          className={`d-flex justify-content-between PrimaryTable-nestedHead-cell__subHead ${
                            Array.isArray(arr[index + 1])
                              ? 'border-right-gray-thin'
                              : ''
                          } `}
                        >
                          {header.slice(1).map((cur) => (
                            <div className=" PrimaryTable-head-cell">{cur}</div>
                          ))}
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell
                        key={`head-${index}`}
                        className="PrimaryTable-head-cell "
                        style={index === imageIndex ? { paddingLeft: 72 } : {}}
                        align={setAlignment(index)}
                        style={applyStyle(index)}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody className="PrimaryTable-body">
                {bodyData.data.length > 0 &&
                  bodyData.data.map((body, ind) => (
                    <TableRow key={ind}>
                      {AddElement?.first && (
                        <TableCell component="th" scope="row" align="center">
                          {React.cloneElement(AddElement.first, {
                            rowNumber: ind + 1,
                          })}
                        </TableCell>
                      )}

                      {Object.keys(body).map(
                        (key, index) =>
                          showEntries(key) && (
                            <TableCell
                              component="th"
                              scope="row"
                              key={`body-${index}`}
                              align={setAlignment(index - hideKeys.length)}
                              style={
                                index === imageIndex ? { paddingLeft: 72 } : {}
                              }
                              style={applyStyle(index)}
                              className={`PrimaryTable-body-cell position-relative ${
                                index === statusIndex + hideKeys.length
                                  ? statusColor(body[key])
                                  : ''
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
                          )
                      )}
                      {AddElement?.last && (
                        <TableCell component="th" scope="row" align="center">
                          {React.cloneElement(AddElement.last, {
                            rowNumber: ind,
                          })}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                {children}
              </TableBody>
            </Table>
            <div className="PrimaryTable-footer">
              {
                <div className="PrimaryTable-footer-records">
                  Showing{' '}
                  <span>
                    {lowOffset} - {highOffset}{' '}
                  </span>
                  of {count} Records
                </div>
              }

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
        </div>
      </TableContainer>
    </Fragment>
  );
};

export default PrimaryTable;
