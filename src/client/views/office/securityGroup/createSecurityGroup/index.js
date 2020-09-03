import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  commonActionWithoutApi,
  commonAction,
  commonActionUpdate,
} from 'Actions';
import useCheckboxData from 'Client/hooks/useCheckboxData';
import endpoint from 'Config/endpoint.js';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { dropDownParam } from 'Constants/commonConstant';
import routes from 'Constants/routes';
import { utils } from 'Helpers';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  CustomCheckbox,
  MultiSelect,
  Panel,
  SecondaryAccordion,
  SecondaryTable,
  Text,
  TextInput,
  IconWithBackground,
} from 'Widgets';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import colors from 'Constants/colors';
import { regex } from 'Helpers/validator';

import './style.scss';

const defaultValues = {
  objectStatusId: '',
  userGroupName: '',
};

const createEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.createSecurityGroup,
    data,
  }));
};

const CreateSecurityGroup = () => {
  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues,
  });
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const path = location.pathname;

  const isViewSecurityGroup = utils.stringComparison(
    path,
    routes.office.viewSecurityGroup
  );
  const isCreateSecurityGroup = utils.stringComparison(
    path,
    routes.office.createSecurityGroup
  );
  const isUpdateSecurityGroup = utils.stringComparison(
    path,
    routes.office.updateSecurityGroup
  );

  const [createResponse, postData] = createEndpoint();
  const [allSection, setAllSection] = useCheckboxData();
  // const [flight, setFlight] = useCheckboxData([]);
  // const [agency, setAgency] = useCheckboxData([]);
  // const [office, setOffice] = useCheckboxData([]);
  // const [reports, setReports] = useCheckboxData([]);
  // const [configAndControl, setConfigAndControl] = useCheckboxData([]);

  const funtionalGroupsList = useSelector(
    (state) => state.funtionalGroups?.items?.data
  );
  const securityGroupNameList = useSelector(
    (state) => state.securityGroupNameList?.items?.data
  );

  let rowNumber = utils.getItemFromStorage('selectedSecurityGroup');
  const securityGroupList =
    useSelector((state) => state.searchSecurityGroup?.items?.data?.data) || [];
  let selectedItem = securityGroupList[rowNumber] || {};

  console.log('selectedItem', selectedItem);

  const {
    userDto: {
      officeDto: { officeId, officeName, officeLevel, ofId },
    },
  } = JSON.parse(utils.getItemFromStorage('userData'));

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const setCreateDefaultValues = () => {
    if (objectStatusesList.dropDownItems.length > 0 && isCreateSecurityGroup) {
      reset({ objectStatusId: objectStatusesList.dropDownItems[3] });
      console.log('allSection', allSection);
      setAllSection([]);
    }
  };

  const setDefaultValues = () => {
    if (
      funtionalGroupsList?.data &&
      objectStatusesList.dropDownItems &&
      !isCreateSecurityGroup
    ) {
      const { objectStatusId, userGroupName } = selectedItem;

      reset({
        objectStatusId: objectStatusesList.dropDownItems.findItem(
          objectStatusId.toUpperCase(),
          'label'
        ),
        userGroupName,
      });
      setAllSection(selectedItem.functionGroups);
    }
  };

  useEffect(() => setCreateDefaultValues(), [objectStatusesList.dropDownItems]);
  useEffect(() => setDefaultValues(), [
    objectStatusesList.dropDownItems,
    funtionalGroupsList,
  ]);

  useEffect(() => {
    if (createResponse !== null) {
      const errMsg = utils.checkError(createResponse);

      if (errMsg)
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
      else {
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: true,
            toastMessage: `Security group  ${
              isUpdateSecurityGroup ? 'updated' : 'created'
            } successfully`,
            isToastVisible: true,
          })
        );
      }
    }
  }, [createResponse]);

  useEffect(() => {
    dispatch(commonAction(endpoint.office.functionalGroups));
  }, []);

  // const splitDataIntoState = () => {
  //   const functionGroups = [1, 12, 5, 6, 8, 10];
  //   let flightArr = [];
  //   let agencyArr = [];

  //   functionGroups.map((cur) => {
  //     if (cur > 0 && cur < 9) flightArr.push(cur);
  //     else if (cur > 9 && cur < 24) agencyArr.push(cur);
  //   });

  //   setFlight(flightArr);
  //   setAgency(agencyArr);
  // };
  // useEffect(() => splitDataIntoState(), []);

  const getCheckboxData = (data, handleChange, name, stateVariable) => {
    const checkboxData = data.map((cur) => {
      return {
        label: cur.label,
        access: (
          <CustomCheckbox
            noLabel={true}
            value={cur.value}
            disabled={isViewSecurityGroup}
            onChange={handleChange}
            useReactHookForm={false}
            name={name}
            checkedValues={stateVariable}
          />
        ),
      };
    });
    return checkboxData;
  };

  const mainData = [
    {
      title: 'All Sections',
      data: funtionalGroupsList?.data
        ? getCheckboxData(
            funtionalGroupsList.data,
            setAllSection,
            'allSection',
            allSection
          )
        : [],
      className: 'mb-32',
    },
    // {
    //   title: 'FLIGHT',
    //   data: flightData,
    //   className: 'mb-32',
    // },
    // {
    //   title: 'AGENCY',
    //   data: agencyData,
    //   className: 'mb-32',
    // },
    // {
    //   title: 'OFFICE',
    //   data: officeData,
    //   className: 'mb-32',
    // },
    // {
    //   title: 'REPORTS',
    //   data: reportData,
    //   className: 'mb-32',
    // },
    // {
    //   title: 'CONFIG & CONTROL',
    //   data: configAndControlData,
    // },
  ];

  const handleClose = () => {
    history.push(routes.office.searchSecurityGroup);
    dispatch(commonActionUpdate(endpoint.office.searchSecurityGroup, null));
  };

  const onSubmit = (data, e) => {
    console.log('data', data);
    const functionGroups = [...allSection];
    postData({
      functionGroups,
      userGroupName: data.userGroupName,
      objectStatusId: data.objectStatusId.value,
      action: isCreateSecurityGroup ? 'I' : 'U',
      ...(isUpdateSecurityGroup && { userGroupId: selectedItem?.userGroupId }),
    });
    // console.log('functionGroups', functionGroups);
  };

  return (
    <div className="CreateSecurityGroup">
      <div className="CreateSecurityGroup-head">
        <div className="d-flex justify-content-between align-items-end pb-4">
          <div className="font-primary-semibold-24 pb-4">
            {` ${
              isViewSecurityGroup
                ? 'VIEW '
                : isCreateSecurityGroup
                ? 'CREATE '
                : 'MODIFY '
            }`}
            SECURITY GROUP
          </div>
          <IconWithBackground
            bgColor={colors.lightRed}
            onClick={() => handleClose()}
            showCursor
          >
            <CloseIcon style={{ color: colors.red }} />
          </IconWithBackground>
        </div>
        <div className="horizontal-grey-divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            showLeftBorder={true}
            text="Security Group"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextInput
                name="userGroupName"
                label="Security Group Name"
                register={register}
                disabled={isViewSecurityGroup}
                validation={{
                  required: 'Please enter the security group name',
                  pattern: {
                    value: regex.securityGroupName,
                    message: 'Please enter valid security group name.',
                  },
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={4}>
              <MultiSelect
                label="Status:"
                name="objectStatusId"
                options={objectStatusesList.dropDownItems}
                placeholder="Select Status"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                width="auto"
                disabled={!isUpdateSecurityGroup}
                isSearchable
              />
            </Grid>

            {!isViewSecurityGroup && (
              <Grid item xs={2} className="d-flex align-items-end">
                <Button
                  type="submit"
                  text={`${isCreateSecurityGroup ? 'Create' : 'Modify'} Group`}
                  className="CreateSecurityGroup-head__btn"
                />
              </Grid>
            )}
          </Grid>
          {isCreateSecurityGroup && (
            <div className="font-primary-italic-14 pt-28">
              <b> Please Note:</b> The Create Group button should only be
              clicked after giving the security rights below to this newly
              created group.
            </div>
          )}
        </form>
      </div>

      <div className="CreateSecurityGroup-panel">
        <Panel hideHeader={true} expand={true}>
          <PrimaryTableHeader
            officeName={officeName}
            officeId={officeId}
            officeLevel={officeLevel}
          />

          {mainData.map((curData, index) => (
            <SecondaryAccordion
              text={curData.title}
              defaultOpen={true}
              className={curData.className}
              key={index}
            >
              <SecondaryTable
                headerData={['FUNCTIONALITY', 'ENABLE [ACCESS RIGHTS]']}
                bodyData={curData.data}
                columnAlignments={['left', 'center']}
                tableStyling={[{ paddingLeft: 30, width: '83%' }]}
              />
            </SecondaryAccordion>
          ))}
        </Panel>
      </div>
    </div>
  );
};

export default CreateSecurityGroup;
