import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {myDefaultTheme} from '../../../utils/theme';
import Collection from '../../../views/Supervisor/Collection';
import FMR from '../../../views/Supervisor/FMR';
import Surveys from '../../../views/Supervisor/Surveys';
import MyAccount from '../../../views/MyAccount';
import {commonStyles} from '../../../utils/commonStyles';
import {responsiveScale} from '../../../utils';
import Deposit from '../../../views/Supervisor/Deposit';

const {colors} = myDefaultTheme;
const Tab = createBottomTabNavigator();

const SupervisorTab = () => {
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
              source={require('../../../assets/icons/Survey.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Survey',
        }}
        name="Survey"
        component={Surveys}
      />

      <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/FMR.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'FMR',
        }}
        name="FMR"
        component={FMR}
      />

      <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/Collection.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Collection',
        }}
        name="Collection"
        component={Collection}
      />
      <Tab.Screen
        options={{
          headerTitle: '',
          tabBarIcon: ({size, color}) => (
            <Image
              resizeMode="contain"
              source={require('../../../assets/icons/Deposit.png')}
              style={{
                tintColor: color,
                width: responsiveScale(25),
                height: responsiveScale(25),
              }}
            />
          ),
          tabBarLabel: 'Deposit',
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
        name="Account"
        component={MyAccount}
      />
    </Tab.Navigator>
  );
};

export default SupervisorTab;
