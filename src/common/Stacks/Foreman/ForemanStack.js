import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SurveyQuestions from '../../../views/Supervisor/SurveyQuestions';
import SurveyConfirm from '../../../views/Supervisor/SurveyConfirm';
import SurveyResponse from '../../../views/Supervisor/SurveyResponse';
import SurveyType from '../../../views/Supervisor/SurveyType';
import CompletedSurveys from '../../../views/Supervisor/CompletedSurveys';
import ForemanTab from './ForemanTab'

import CollectionApproval from '../../../views/Supervisor/CollectionApproval';
import DepositConfirm from '../../../views/Supervisor/DepositConfirm';
import CompletedCollections from '../../../views/Supervisor/CompletedCollections';
import FMRStart from '../../../views/Supervisor/FMRStart';
import {commonStyles} from '../../../utils/commonStyles';
import HeaderBackIcon from '../../HeaderBackIcon';
import FMRStationDetails from '../../../views/Supervisor/FMRStationDetails';
import MyProfile from '../../../views/MyProfile';
import ChangePassword from '../../../views/ChangePassword';
import ForemanFuelType from '../../../views/Foreman/ForemanFuelType';
import ForemanProceed from '../../../views/Foreman/ForemanProceed';
import ForemanConfirm from '../../../views/Foreman/ForemanConfirm';
import SaleCompleted from '../../../views/Foreman/SaleCompleted';
import FuelOrder from '../../../views/Foreman/FuelOrder';
import FuelOrderType from './../../../views/Foreman/FuelOrderType';
import IncidentReportList from './../../../views/Foreman/IncidentReportList';
import AddIncidentReport from './../../../views/Foreman/AddIncidentReport';
const Stack = createStackNavigator();

const ForemanStack = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: true,
        headerRightContainerStyle: commonStyles.headerRightContainerStyle,
        headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: commonStyles.headerTitle,
        headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
      }}>
      <Stack.Screen
        name="ForemanTab"
        options={{headerShown: false}}
        component={ForemanTab}
      />
       <Stack.Screen name="ForemanFuelType" 
       options={{headerShown: false}} component={ForemanFuelType} />
         <Stack.Screen name="ForemanProceed" options={{headerShown: false}} component={ForemanProceed} />
         <Stack.Screen name="ForemanConfirm" options={{headerShown: false}} component={ForemanConfirm} />
        
         <Stack.Screen
              name="SaleCompleted" 
              options={{headerShown: false}}
              component={SaleCompleted} 
          />
          <Stack.Screen
              name="FuelOrder"
              component={FuelOrder}
              options={{headerShown: true, headerTitle: ''}}
          />
          <Stack.Screen name="FuelOrderType" component={FuelOrderType} />
     <Stack.Screen
        name="IncidentReportList"
        component={IncidentReportList}
        options={{headerShown: true, headerTitle: ''}}
      />
        <Stack.Screen
        name="AddIncidentReport"
        component={AddIncidentReport}
        options={{headerShown: true, headerTitle: ''}}
      />
      {/*<Stack.Screen
        name="SurveyConfirm"
        component={SurveyConfirm}
        options={{headerShown: true, headerTitle: 'Confirm Survey'}}
      />
      <Stack.Screen
        name="CompletedSurveys"
        component={CompletedSurveys}
        options={{headerShown: true, headerTitle: 'Completed Surveys'}}
      />
      <Stack.Screen
        name="SurveyResponse"
        component={SurveyResponse}
        options={{headerShown: true, headerTitle: 'Survey Response'}}
      />
      <Stack.Screen
        name="CollectionApproval"
        component={CollectionApproval}
        options={{headerShown: true, headerTitle: 'Collection Approval'}}
      />

      <Stack.Screen
        name="DepositConfirm"
        component={DepositConfirm}
        options={{headerShown: true, headerTitle: 'Deposit'}}
      />
      <Stack.Screen
        name="FMRStart"
        component={FMRStart}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen
        name="FMRStationDetails"
        component={FMRStationDetails}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen name="Profile" component={MyProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
    </Stack.Navigator>
  );
};

export default ForemanStack;
