import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from 'Constants/colors';
import React from 'react';
import { AutoSuggest, Button, MultiSelect, SecondaryAccordion } from 'Widgets';
import EditIcon from '@material-ui/icons/Edit';
import { displayImage } from 'Helpers/utils';

import './style.scss';

const Segments = ({ path }) => {
  const {
    isAgencyDeal,
    isCreateDeal,
    isUpdateDeal,
    isViewDeal,
    isDealHistory,
    countriesList,
  } = path;
  let initialexOrigin = null,
    initialexDestination = null,
    initialOrigin = null,
    initialDestination = null;
  const [errorData, setErrorData] = useState({
    exOrigin: '',
    exDestination: '',
    Origin: '',
    Destination: '',
  });
  const handleSelectSuggestion = (id, value) => {
    if (value !== '') {
      setErrorData({
        ...errorData,
        [id]: '',
      });
    }
    // setFormData({
    //   ...formData,
    //   [id]: value,
    // });
  };
  return (
    <SecondaryAccordion
      text="SEGMENTS"
      defaultOpen={true}
      // className={curData.className}
      className="Segments"
    >
      <div className="Segments-container">
        {!(isViewDeal || isDealHistory || isAgencyDeal) && (
          <Grid
            container
            spacing={1}
            className="Segments-container-form"
            alignItems="flex-end"
          >
            <Grid item xs={3}>
              <AutoSuggest
                icon={
                  <img
                    alt="departure"
                    src={displayImage('departure.svg')}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="exOrigin"
                name="exOrigin"
                label="Ex. Origin:"
                initialValue={initialexOrigin}
                onSelectSuggestion={handleSelectSuggestion}
              />

              {/* <MultiSelect
                name="exOrigin"
                label="Ex. Origin:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={[]}
                width="auto"
                placeholder="Select Origin"
              /> */}
            </Grid>
            <Grid item xs={3}>
              <AutoSuggest
                icon={
                  <img
                    alt="arrival"
                    src={displayImage('arrival.svg')}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="exDestination"
                name="exDestination"
                label="Ex. Destination:"
                initialValue={initialexDestination}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Grid>
            <Grid item xs={3}>
              <AutoSuggest
                icon={
                  <img
                    alt="departure"
                    src={displayImage('departure.svg')}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="Origin"
                name="Origin"
                label="Origin:"
                initialValue={initialOrigin}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Grid>
            <Grid item xs={3}>
              <AutoSuggest
                icon={
                  <img
                    alt="arrival"
                    src={displayImage('arrival.svg')}
                    className="SearchBar-inputs__autoSuggestIcon"
                  />
                }
                id="Destination"
                name="Destination"
                label="Destination:"
                initialValue={initialDestination}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                name="fromCountry"
                label="From Country:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={countriesList.dropDownItems}
                width="auto"
                placeholder="Select Country"
              />
            </Grid>

            <Grid item xs={3}>
              <MultiSelect
                name="toCountry"
                label="To Country:"
                // disabled={isViewSecurityGroup}
                useReactHookForm={false}
                onChange={(value) => console.log(value)}
                showBorder={true}
                changeStyle={true}
                options={countriesList.dropDownItems}
                width="auto"
                placeholder="Select Country"
              />
            </Grid>
            <Grid item xs={3}></Grid>

            <Grid item xs={3}>
              <Button text="Add Segment" className="width-100 mt-12" />
            </Grid>
          </Grid>
        )}

        <TableContainer className="Segments-container-table">
          <Table aria-label="simple table" size="small">
            <TableHead className="Segments-container-table-head">
              <TableRow>
                <TableCell align="center">EX. ORIGIN</TableCell>
                <TableCell align="center">EX. DESTINATION</TableCell>
                <TableCell align="center">ORIGIN</TableCell>
                <TableCell align="center">DESTINATION</TableCell>
                <TableCell align="center">FROM COUNTRY</TableCell>
                <TableCell
                  style={
                    isViewDeal || isDealHistory || isAgencyDeal
                      ? { width: '8%' }
                      : {}
                  }
                  align="center"
                >
                  TO COUNTRY
                </TableCell>
                {!isViewDeal && !isDealHistory && !isAgencyDeal && (
                  <TableCell align="center">ACTION</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="Segments-container-table-body">
              <TableRow>
                <TableCell align="center" scope="row">
                  DXB
                </TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">AE</TableCell>
                <TableCell align="center">PK</TableCell>

                {!isViewDeal && !isDealHistory && !isAgencyDeal && (
                  <TableCell align="center">
                    {isUpdateDeal && (
                      <EditIcon
                        style={{ color: colors.cornflowerBlue }}
                        className="cursor-pointer"
                      />
                    )}
                    <DeleteIcon
                      style={{ color: colors.cornflowerBlue }}
                      className="cursor-pointer"
                    />
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell align="center" scope="row">
                  DXB
                </TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">AE</TableCell>
                <TableCell align="center">PK</TableCell>

                {!isViewDeal && !isDealHistory && !isAgencyDeal && (
                  <TableCell align="center">
                    {isUpdateDeal && (
                      <EditIcon
                        style={{ color: colors.cornflowerBlue }}
                        className="cursor-pointer"
                      />
                    )}
                    <DeleteIcon
                      style={{ color: colors.cornflowerBlue }}
                      className="cursor-pointer"
                    />
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </SecondaryAccordion>
  );
};

export default Segments;
