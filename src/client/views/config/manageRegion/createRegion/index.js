import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import FlightIcon from '@material-ui/icons/Flight';
import { Source } from 'Components/Agency/Deals';
import { colors, routes } from 'Constants';
import { utils } from 'Helpers';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  IconWithBackground,
  MultiSelect,
  Panel,
  Text,
  TextInput,
} from 'Widgets';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import RegionCriteria from 'Components/Config/RegionCriteria';
import endpoint from 'Config/endpoint';
import { commonConstant } from 'Constants/';
import useDropDown from 'Hooks/useDropDown';

import './style.scss';

const defaultValues = {
  status: null,
};

const CreateRegion = () => {
  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  const [state, setState] = useState(defaultValues);

  const location = useLocation();
  const history = useHistory();

  const path = location.pathname;

  const isCreateRegion = utils.stringComparison(
    path,
    routes.master.createRegion
  );
  const isUpdateRegion = utils.stringComparison(
    path,
    routes.master.modifyRegion
  );
  const isViewRegion = utils.stringComparison(path, routes.master.viewRegion);

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    commonConstant.dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const setCreateDefault = () => {
    console.log(
      'objectStatusesList.dropDownParam[0]',
      objectStatusesList.dropDownItems[3]
    );
    setState({ ...state, status: objectStatusesList.dropDownItems[3] });
  };

  useEffect(() => {
    if (objectStatusesList.dropDownItems) setCreateDefault();
  }, [objectStatusesList?.dropDownItems]);

  const { status } = state;

  return (
    <div className="CreateRegion">
      <div className="CreateRegion-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">REGION</div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => history.push(routes.master.searchRegion)}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <Text
          showLeftBorder={true}
          text={`${
            isCreateRegion
              ? 'CREATE REGION'
              : isUpdateRegion
              ? 'MODIFY REGION'
              : 'VIEW REGION'
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
              disabled={isViewRegion}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Region Name:"
              name="regionName"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Type Region Name"
              disabled={isViewRegion}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              label="Region Description:"
              name="regionDescription"
              onChange={() => console.log('value')}
              useReactHookForm={false}
              placeholder="Name"
              disabled={isViewRegion}
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
              disabled={!isUpdateRegion}
              value={status}
            />
          </Grid>
        </Grid>

        <div className="d-flex justify-content-between pt-32">
          {!isViewRegion && (
            <>
              <div className="font-primary-italic-14">
                <b>Please Note:</b> The Create Region button should only be
                clicked after giving the below details to this newly created
                Region.
              </div>
              <Button
                type="submit"
                text={`${isCreateRegion ? 'Create Region' : 'MODIFY Region'}`}
                className=" px-48"
              />
            </>
          )}
        </div>
      </div>
      <div className="CreateRegion-panel">
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

          <RegionCriteria
            path={{ isCreateRegion, isUpdateRegion, isViewRegion }}
          />
        </Panel>
      </div>
    </div>
  );
};

export default CreateRegion;
