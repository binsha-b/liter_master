import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SurveyQuestions from '../../../views/Supervisor/SurveyQuestions';
import SurveyConfirm from '../../../views/Supervisor/SurveyConfirm';
import SurveyResponse from '../../../views/Supervisor/SurveyResponse';
import SurveyType from '../../../views/Supervisor/SurveyType';
import CompletedSurveys from '../../../views/Supervisor/CompletedSurveys';
import SupervisorTab from '../../../common/Stacks/Supervisor/SupervisorTab';
import CollectionApproval from '../../../views/Supervisor/CollectionApproval';
import DepositConfirm from '../../../views/Supervisor/DepositConfirm';
import CompletedCollections from '../../../views/Supervisor/CompletedCollections';
import FMRStart from '../../../views/Supervisor/FMRStart';
import {commonStyles} from '../../../utils/commonStyles';
import HeaderBackIcon from '../../HeaderBackIcon';
import FMRStationDetails from '../../../views/Supervisor/FMRStationDetails';
import MyProfile from '../../../views/MyProfile';
import ChangePassword from '../../../views/ChangePassword';

const Stack = createStackNavigator();

const SupervisorStack = () => {
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
        name="SupervisorTab"
        options={{headerShown: false}}
        component={SupervisorTab}
      />
      <Stack.Screen
        name="SurveyType"
        component={SurveyType}
        options={() => ({headerTitle: ''})}
      />
      <Stack.Screen
        name="SurveyQuestions"
        component={SurveyQuestions}
        options={{headerShown: true, headerTitle: ''}}
      />
      <Stack.Screen
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
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default SupervisorStack;
