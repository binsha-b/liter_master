import React, {useState} from 'react';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {loginUser} from '../api';
import Button from '../common/Button';
import userStore from '../stores/userStore';
import {responsiveFont, responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';
import Input from '../common/Input';
import {commonStyles} from '../utils/commonStyles';

const colors = myDefaultTheme;

const Login = ({navigation}) => {
  const {setUser} = userStore;
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!username && !password) {
      showMessage({
        message: 'Validation Error',
        description:
          'Username and password cannot be empty. Please provide a value',
      });
      return false;
    }
    if (!username) {
      showMessage({
        message: 'Validation Error',
        description: 'Username  cannot be empty. Please provide a value',
      });
    }
    if (!password) {
      showMessage({
        message: 'Validation Error',
        description: 'Password cannot be empty. Please provide a value',
      });
      return false;
    }

    try {
      setloading(true);

      const body = {
        username: username,
        password,
        api_token: 'test',
      };
      let {data} = await loginUser(body);
console.log(data);
      if (data === 'Invalid login details') {
        setloading(false);
        showMessage({
          message: data,
          type: 'danger',
        });

        return false;
      }
      const {user_details} = data;
      if (user_details.length) {
        let user = user_details[0];
        if (user.login_type === 'Supervisor') {
          await AsyncStorage.setItem('token', user.api_token);
          setUser(user);

          navigation.replace('Home', {screen: 'SupervisorStack'});
          return false;
        } else if (user.login_type === 'Station Foreman') {
          await AsyncStorage.setItem('token', user.api_token);
          setUser(user);

          navigation.replace('Survey', {screen: 'ForemanStack'});
          return false;
        } else {
         // console.log(data);

        }
      }

      setloading(false);
    } catch (error) {
      showMessage({
        message: 'Something went wrong !',
        description: '' + error,
        type: 'danger',
      });
      setloading(false);
    }

    return false;
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top ? insets.top : 0,
      }}>
      <View
        style={{
          flex: 0.45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: responsiveScale(152),
            height: responsiveScale(93),
          }}
          source={require('../assets/images/logoUp.png')}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 0.35,
          backgroundColor: colors.background,
          paddingHorizontal: responsiveScale(15),
        }}>
        <View>
          <Input
            placeholder={'Username'}
            value={username}
            onChangeText={setUsername}
          />

          <Input
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View>
          <Button onPress={onSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.secondaryLight} />
            ) : (
              <Text style={commonStyles.buttonLabel}>Login</Text>
            )}
          </Button>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center', paddingVertical: responsiveScale(10)}}
          disabled={loading}
          hitSlop={{top: 10, bottom: 10, left: 15, right: 10}}>
          <Text
            style={[
              commonStyles.labelText,
              {color: colors.secondaryLight, fontSize: responsiveFont(14)},
            ]}>
            {'Forgot Password?'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default observer(Login);
