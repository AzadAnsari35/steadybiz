import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import FlightIcon from '@material-ui/icons/Flight';
import { utils } from 'Helpers';
import React, { useEffect, useState } from 'react';
import {
  Button,
  CustomCheckbox,
  DatePicker,
  IconWithBackground,
  MultiSelect,
  Panel,
  Text,
  TextInput,
} from 'Widgets';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import {
  Commission,
  Incentive,
  GdsDiscount,
  Markup,
  Discount,
} from 'Components/Agency/AgencyGroup';
import { useHistory, useLocation } from 'react-router-dom';
import endpoint from 'Config/endpoint';
import useDropDown from 'Hooks/useDropDown';
import { colors, routes, commonConstant } from 'Constants';

import './style.scss';

const defaultValues = {
  status: null,
};

const CreateAgencyGroup = () => {
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  const location = useLocation();
  const history = useHistory();
  const path = location.pathname;

  const isCreate = utils.stringComparison(
    path,
    routes.agency.createAgencyGroup
  );
  const isUpdate = utils.stringComparison(
    path,
    routes.agency.modifyAgencyGroup
  );
  const isView = utils.stringComparison(path, routes.agency.viewAgencyGroup);
  const isDealHistory = utils.stringComparison(
    path,
    routes.agency.agencyGroupHistory
  );

  const [state, setState] = useState(defaultValues);

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    commonConstant.dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const setCreateDefault = () => {
    if (isCreate)
      setState({ ...state, status: objectStatusesList.dropDownItems[3] });
  };

  useEffect(() => {
    if (objectStatusesList.dropDownItems) setCreateDefault();
  }, [objectStatusesList?.dropDownItems]);

  const { status } = state;

  return (
    <div className="CreateAgencyGroup">
      <div className="CreateAgencyGroup-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">AGENCY GROUP</div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.agency.searchAgencyGroup)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <Text
          showLeftBorder={true}
          text={`${
            isCreate
              ? 'CREATE AGENCY GROUP'
              : isUpdate
              ? 'MODIFY AGENCY GROUP'
              : isView
              ? 'VIEW AGENCY GROUP'
              : 'AGENCY GROUP HISTORY'
          }`}
          className="font-primary-medium-18 my-24"
        />
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MultiSelect
              label="Service:"
              name="service"
              options={[]}
              showBorder={true}
              changeStyle={true}
              showValue
              width="auto"
              useReactHookForm={false}
              disabled={!isCreate}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Name:"
              name="groupName"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={isView || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Description:"
              name="groupDescription"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={isView || isDealHistory}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="Status:"
              name="status"
              options={[]}
              showBorder={true}
              changeStyle={true}
              width="auto"
              useReactHookForm={false}
              disabled={!isUpdate}
              value={status}
            />
          </Grid>
        </Grid>

        {!isView && (
          <Grid item xs={12} className="d-flex justify-content-between pt-32">
            <Grid
              container
              spacing={3}
              direction="row"
              justify="space-between"
              alignItems={isDealHistory ? 'flex-end' : 'center'}
            >
              {isDealHistory ? (
                <Grid item xs={3}>
                  <MultiSelect
                    label="Agency Group History Date:"
                    name="historyDate"
                    options={[]}
                    showBorder={true}
                    changeStyle={true}
                    width="auto"
                    useReactHookForm={false}
                    placegolder="Select Agency Group History Date"
                  />
                </Grid>
              ) : (
                <Grid item xs={9} className="font-primary-italic-14">
                  <b>Please Note:</b> The Create Group button should only be
                  clicked after giving the security rights below to this newly
                  created group.
                </Grid>
              )}
              <Grid item xs={3} className="d-flex justify-content-end">
                <Button
                  type="submit"
                  text={`${
                    isCreate
                      ? 'Create Group'
                      : isUpdate
                      ? 'MODIFY Group'
                      : 'Search Deal History'
                  }`}
                  className="px-48"
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
      <div className="CreateAgencyGroup-panel">
        <Panel hideHeader={true} expand={true} panelBodyClassName="px-32">
          <PrimaryTableHeader
            officeName={officeName}
            officeId={officeId}
            officeLevel={officeLevel}
            showServiceIcon={{
              icon: (
                <FlightIcon
                  style={{ transform: 'rotate(90deg)', fontSize: 18 }}
                />
              ),
              text: 'Flight',
            }}
          />

          <Commission path={{ isCreate, isUpdate, isView, isDealHistory }} />
          <Incentive path={{ isCreate, isUpdate, isView, isDealHistory }} />
          <GdsDiscount path={{ isCreate, isUpdate, isView, isDealHistory }} />
          <Markup path={{ isCreate, isUpdate, isView, isDealHistory }} />
          <Discount path={{ isCreate, isUpdate, isView, isDealHistory }} />
        </Panel>
      </div>
    </div>
  );
};

export default CreateAgencyGroup;
