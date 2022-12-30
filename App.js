import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {I18nManager, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {myDefaultTheme} from './src/utils/theme';
import IntroScreen from './src/views/IntroScreen';
import Login from './src/views/Login';
import {commonStyles} from './src/utils/commonStyles';
import HeaderBackIcon from './src/common/HeaderBackIcon';
import SupervisorStack from './src/common/Stacks/Supervisor/SupervisorStack';
import ForemanStack from './src/common/Stacks/Foreman/ForemanStack';
import PDFViewer from './src/common/PDFViewer';
import {responsiveScale} from './src/utils';
import CompletedCollections from './src/views/Supervisor/CompletedCollections';

const {colors} = myDefaultTheme;

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={myDefaultTheme}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        animated
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerRightContainerStyle: commonStyles.headerRightContainerStyle,
          headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: commonStyles.headerTitle,
          headerBackImage: () => (
            <HeaderBackIcon
              icon={I18nManager?.isRTL ? 'chevron-right' : 'chevron-left'}
            />
          ),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerPressColor: colors.primaryLight,
        }}>
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={SupervisorStack} />
        <Stack.Screen name="Survey" component={ForemanStack} />
        <Stack.Screen
          name="CompletedCollections"
          component={CompletedCollections}
          options={{headerShown: true, headerTitle: 'Completed Collections'}}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Survey Response',
          }}
          name="PDFViewer"
          component={PDFViewer}
        />
      </Stack.Navigator>
      <FlashMessage
        position="bottom"
        titleStyle={{
          color: colors.card,
          fontSize: responsiveScale(12),
        }}
        textStyle={{
          color: colors.card,
          fontSize: responsiveScale(12),
        }}
      />
    </NavigationContainer>
  );
};

export default App;
