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
  TransferList,
  SecondaryAccordion,
} from 'Widgets';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';

import { useHistory, useLocation } from 'react-router-dom';
import endpoint from 'Config/endpoint';
import useDropDown from 'Hooks/useDropDown';
import { colors, routes, commonConstant } from 'Constants';

import './style.scss';

const defaultValues = {
  status: null,
};

const CreateAgencyMapping = () => {
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
    routes.agency.createAgencyMapping
  );
  const isUpdate = utils.stringComparison(
    path,
    routes.agency.modifyAgencyMapping
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
    <div className="CreateAgencyMapping">
      <div className="CreateAgencyMapping-head">
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
            isCreate ? 'CREATE AGENCY MAPPING' : 'MODIFY AGENCY MAPPING'
          }`}
          className="font-primary-medium-18 my-24"
        />
        <Grid container direction="row" alignItems="flex-end" spacing={3}>
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
              disabled={true}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Name:"
              name="groupName"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={true}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Group Description:"
              name="groupDescription"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={true}
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
              disabled={true}
              value={status}
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="country"
              label="Country:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Country"
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="city"
              label="City:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[[]]}
              width="auto"
              placeholder="Select City"
            />
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={3} className="d-flex justify-content-end">
            <Button type="submit" text="Search" className="mr-10" secondary />
            <Button
              type="submit"
              text={`${
                isCreate ? 'CREATE AGENCY MAPPING' : 'MODIFY AGENCY MAPPING'
              }`}
            />
          </Grid>

          <Grid item xs={9} className="font-primary-italic-14">
            <b>Please Note:</b> The Create Agency Mapping button should only be
            clicked after mapping agencie(s) below with this group.
          </Grid>
        </Grid>
      </div>
      <div className="CreateAgencyMapping-panel">
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
          <SecondaryAccordion text="MAP AGENCIE(S)" defaultOpen={true}>
            <div className="CreateAgencyMapping-panel-transferList">
              <TransferList
                leftList={[
                  'Asian Gulf Travel Verified',
                  'Bin Dasmal Tourism LLC',
                  'Al Abbas Travels LLC',
                  'Al Arabi Travel Agency',
                  'Fardan Al Fardan Tourism LLC',
                  'Axis tours and travel',
                  'Urban Travelers',
                  'Wonderland tours',
                  '360 degree Travelers',
                  'Travel with me',
                ]}
                leftHeading={isCreate? "Agency Name (Unassigned):":"Agency Name (Mapped):"}
                leftHeadContent={
                  <Grid container spacing={2} className="pb-20">
                    {!isUpdate&& <Grid item xs={6}>
                      <DatePicker
                        name="startDate"
                        label="Start Date:"
                        onChange={() => console.log('value')}
                        useReactHookForm={false}
                      />
                    </Grid>}
                    <Grid item xs={6}>
                      <DatePicker
                        name="endDate"
                        label="End Date:"
                        onChange={() => console.log('value')}
                        useReactHookForm={false}
                      />
                    </Grid>
                  </Grid>
                }
                rightList={[
                  'Arabian Nights Tours LLC',
                  'Al Majid Travel and Tourism',
                  'Al Noobi Travel & Tourism',
                ]}
                rightHeading={isCreate?"Agency Name (Selected):" : "Agency Name (Unassigned):"}
                rightHeadContent={
                  <Grid container spacing={2} className={`pb-20 ${isUpdate?"visibility-hidden": ""}`}>
                    <Grid item xs={6}>
                      <DatePicker
                        name="startDate"
                        label="Start Date:"
                        onChange={() => console.log('value')}
                        useReactHookForm={false}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        name="endDate"
                        label="End Date:"
                        onChange={() => console.log('value')}
                        useReactHookForm={false}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>
                }
              />
            </div>
          </SecondaryAccordion>
        </Panel>
      </div>
    </div>
  );
};

export default CreateAgencyMapping;
