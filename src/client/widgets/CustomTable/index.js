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

const CustomTable = (props) => {
  const {
    headerData,
    subHeaderData,
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
    showPagination = true,
  } = props;

  const [lowOffset, setLowOffset] = React.useState(1);
  const [highOffset, setHighOffset] = React.useState(
    count > size ? size : count
  );

  // console.log('page', page);

  useEffect(() => {
    showPagination
      ? setHighOffset(count > size ? size : count)
      : setHighOffset(count);
    setLowOffset(1);
  }, [count]);

  useEffect(() => {
    handleOffset(page);
  }, [page]);

  const statusColor = (status) => {
    return `PrimaryTable-status ${status} `;
  };

  // console.log('Primary Table', bodyData);

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
    // const itemIndex =
    //   hideKeys?.length > 0
    //     ? hideKeys.length > index
    //       ? hideKeys.length - index - 1
    //       : index - hideKeys.length - 1
    //     : index;
    return columnAlignments && columnAlignments[index];
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
      {/* <TableContainer> */}
      <div className="CustomTable">
        {header}
        {count ? (
          <div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {headerData.map(
                      (header, index, arr) =>
                        showEntries(header.id) &&
                        (header.hasOwnProperty('subHeaderList') ? (
                          <TableCell
                            className="CustomTable-head-cell CustomTable-nestedHead-cell"
                            colSpan={header.colSpan}
                            padding="none"
                            align="center"
                          >
                            {header.value}
                            <div
                              className={`d-flex justify-content-between CustomTable-nestedHead-cell__subHead 
                                 ${
                                   arr[index + 1]
                                     ? ' border-right-gray-thin'
                                     : ''
                                 }`}
                            >
                              {header.subHeaderList.map((subHeader) => (
                                <div className=" CustomTable-head-cell">
                                  {subHeader.value}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        ) : (
                          <TableCell
                            key={`head-${index}`}
                            className="CustomTable-head-cell "
                            style={
                              index === imageIndex
                                ? { paddingLeft: 72 }
                                : applyStyle(index)
                            }
                            // align={setAlignment(index)}
                            align={header.alignment}
                          >
                            {header.value}
                          </TableCell>
                        ))
                    )}
                  </TableRow>
                </TableHead>
                <TableHead>
                  <TableRow>
                    {subHeaderData &&
                      Object.keys(subHeaderData).map(
                        (key, index) =>
                          showEntries(key) && (
                            <TableCell
                              key={`head-${index}`}
                              className="CustomTable-head-cell "
                              style={
                                index === imageIndex ? { paddingLeft: 72 } : {}
                              }
                              align={
                                headerData.find((item) => item.id === key)
                                  ?.alignment
                              }
                              style={applyStyle(index)}
                            >
                              {subHeaderData[key]}
                            </TableCell>
                          )
                      )}
                  </TableRow>
                </TableHead>
                <TableBody className="CustomTable-body">
                  {bodyData.data.length > 0 &&
                    bodyData.data.map((body, ind) => (
                      <TableRow key={ind}>
                        {AddElement?.first && (
                          <TableCell component="td" scope="row" align="center">
                            {React.cloneElement(AddElement.first, {
                              rowNumber: ind + 1,
                            })}
                          </TableCell>
                        )}
                        {Object.keys(body).map(
                          (key, index) =>
                            showEntries(key) && (
                              <TableCell
                                component="td"
                                scope="row"
                                key={`body-${index}`}
                                // align={setAlignment(index - hideKeys.length)}
                                align={
                                  headerData.find((item) => item.id === key)
                                    ?.alignment
                                }
                                style={
                                  index === imageIndex
                                    ? { paddingLeft: 72 }
                                    : {}
                                }
                                style={applyStyle(index - hideKeys.length)}
                                className={`CustomTable-body-cell position-relative ${
                                  index === statusIndex + hideKeys.length
                                    ? statusColor(body[key])
                                    : ''
                                }`}
                              >
                                {index === imageIndex && (
                                  <Avatar
                                    className="font-primary-medium-16 CustomTable-body-imageCell"
                                    size="18px"
                                  ></Avatar>
                                )}
                                {body[key]}
                              </TableCell>
                            )
                        )}
                        {AddElement?.last && (
                          <TableCell component="td" scope="row" align="center">
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
            </TableContainer>
            <div className="CustomTable-footer">
              {
                <div className="CustomTable-footer-records">
                  Showing{' '}
                  <span>
                    {lowOffset} - {highOffset}{' '}
                  </span>
                  of {count} Records
                </div>
              }

              <div>
                {count > size && showPagination ? (
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
        ) : (
          'No Record Found'
        )}
      </div>
      {/* </TableContainer> */}
    </Fragment>
  );
};

export default CustomTable;
