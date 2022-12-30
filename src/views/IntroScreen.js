import React, {useEffect, useRef} from 'react';
import {Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {observer} from 'mobx-react';
import userStore from '../stores/userStore';
import {responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const colors = myDefaultTheme;

const IntroScreen = ({navigation}) => {
  const animRef = useRef(null);
  const {loadUser} = userStore;

  useEffect(() => {
    animRef.current.zoomIn();
    setTimeout(() => {
      getUser();
    }, 2000);
  }, []);

  const getUser = async () => {
    let alreadyLogged = await loadUser();
    if (!alreadyLogged) {
      navigation.replace('Login');
    } else {
      const {user} = userStore;
      if (user.login_type === 'Supervisor') {
        navigation.replace('Home', {screen: 'SupervisorStack'});
        return false;
      } else if(user.login_type === 'Station Foreman'){
        navigation.replace('Survey', {screen: 'ForemanStack'});
        return false;
      } else {

      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animatable.Image
        easing="ease-out"
        ref={animRef}
        resizeMode="contain"
        style={{width: responsiveScale(200), height: responsiveScale(200)}}
        source={require('../assets/images/logoUp.png')}
      />

      <Image
        resizeMode="cover"
        source={require('../assets/images/introImage.png')}
        style={{
          width: responsiveScale(250),
          height: responsiveScale(250),
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default observer(IntroScreen);
