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
    headerInArrOfObjFormat = false,
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
      <div className="PrimaryTable">
        {header}
        {count ? (
          <div>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {!headerInArrOfObjFormat
                      ? headerData.map((header, index, arr) =>
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
                                  <div className=" PrimaryTable-head-cell">
                                    {cur}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell
                              key={`head-${index}`}
                              className="PrimaryTable-head-cell "
                              style={
                                index === imageIndex ? { paddingLeft: 72 } : {}
                              }
                              align={setAlignment(index)}
                              style={applyStyle(index)}
                            >
                              {header}
                            </TableCell>
                          )
                        )
                      : headerData.map((header, index, arr) => {
                          if (showEntries(header.id)) {
                            return (
                              <TableCell
                                key={`head-${index}`}
                                className="PrimaryTable-head-cell "
                                style={
                                  index === imageIndex
                                    ? { paddingLeft: 72 }
                                    : {}
                                }
                                // align={setAlignment(index)}
                                align={header.alignment}
                                style={applyStyle(index)}
                              >
                                {header.value}
                              </TableCell>
                            );
                          }
                        })}
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
                              className="PrimaryTable-head-cell "
                              style={
                                index === imageIndex ? { paddingLeft: 72 } : {}
                              }
                              align={
                                !!headerData.find((item) => item.id === key) &&
                                !!headerData.find((item) => item.id === key)
                                  .alignment
                                  ? headerData.find((item) => item.id === key)
                                      .alignment
                                  : 'center'
                              }
                              style={applyStyle(index)}
                            >
                              {subHeaderData[key]}
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
                                  headerInArrOfObjFormat
                                    ? headerData.find((item) => item.id === key)
                                        ?.alignment
                                    : setAlignment(
                                        index -
                                          hideKeys.length +
                                          (AddElement?.first ? 1 : 0)
                                      )
                                }
                                style={
                                  index === imageIndex
                                    ? { paddingLeft: 72 }
                                    : {}
                                }
                                style={applyStyle(index - hideKeys.length)}
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

export default PrimaryTable;
