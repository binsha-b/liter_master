import {Linking, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export const API_URL = 'https://odoos.in/apps/Liter/api/'; // current app api base url

export const ASSET_URL = 'https://odoos.in/apps/Liter'; // current app api base

export const SOUND_URL = 'https://odoos.in/apps/Liter/public/assets/tone.mp3';

export const profilePlaceholder =
  'https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png';

export const SUPPORT_URL = 'https://www.adoxsolutions.com/';

export const responsiveScale = value =>
  moderateScale(Platform.OS === 'ios' ? value : value);

export const responsiveFont = value =>
  moderateScale(Platform.OS === 'ios' ? value : value);

export const HIT_SLOP = {top: 10, bottom: 10, left: 15, right: 15};

export const FULL_ACCESS_USERS = ['Station Supervisor'];

export const openURLInBrowser = (url = '') => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn(`Failed to open the URI: ${url}`);
    }
  });
};
