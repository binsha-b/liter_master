import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {myDefaultTheme} from '../../../utils/theme';

import Surveys from '../../../views/Supervisor/Surveys';
import FuelOrder from '../../../views/Foreman/FuelOrder';
import MyAccount from '../../../views/MyAccount';
import {commonStyles} from '../../../utils/commonStyles';
import {responsiveScale} from '../../../utils';
import Deposit from '../../../views/Supervisor/Deposit';
import IncidentReportList from '../../../views/Foreman/IncidentReportList';
import FMR from '../../../views/Supervisor/FMR';

const {colors} = myDefaultTheme;
const Tab = createBottomTabNavigator();

const ForemanTab = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerStyle: commonStyles.headerStyle,
        headerRight: () => (
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/logoUp.png')}
            style={{
              tintColor: colors.background,
              width: responsiveScale(110),
              height: responsiveScale(40),
            }}
          />
        ),
      }}>
      <Tab.Screen 
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/salespng.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Sales',
        }}
        name="Surveys"
        component={Surveys}
      />

       <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/fuelOrderpng.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Fuel Order',
        }}
        name="FuelOrder"
        component={FuelOrder}
      />

      <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/reportpng.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Incident Report',
        }}
        name="IncidentReportList"
        component={IncidentReportList}
      />
      <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/fmrpng.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'FMR',
        }}
        name="Deposit"
        component={Deposit}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/Account.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Account',
        }}
        name="MyAccount"
        component={MyAccount}
      /> 
    </Tab.Navigator>
  );
};

export default ForemanTab;
