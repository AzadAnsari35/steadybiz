import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './style.scss';

const SecondaryTable = (props) => {
  const setAlignment = (index) => {
    return columnAlignments[index];
  };

  const applyStyle = (index) => {
    return tableStyling.length && tableStyling[index];
  };

  const {
    headerData,
    bodyData,
    columnAlignments = [],
    tableStyling = [],
  } = props;
  return (
    <Table className="SecondaryTable" aria-label="simple table">
      <TableHead className="SecondaryTable-head">
        <TableRow>
          {headerData &&
            headerData.map((header, index) => (
              <TableCell
                key={`head-${index}`}
                align={
                  columnAlignments.length > 0 ? setAlignment(index) : 'left'
                }
                style={tableStyling.length > 0 && applyStyle(index)}
              >
                {header}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody className="SecondaryTable-body">
        {bodyData.map((body, i) => (
          <TableRow key={`head-${i}`}>
            {Object.keys(body).map((current, index) => (
              <TableCell
                key={`bodyCell-${index}`}
                align={setAlignment(index)}
                component="th"
                scope="row"
                style={applyStyle(index)}
              >
                {body[current]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SecondaryTable;
