import {makeAutoObservable} from 'mobx';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

class AppStore {
  refreshing = false;
  surveyQuestionAnswers = {};
  isPermitted = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRefreshing = value => {
    this.refreshing = value;
  };

  setSurveyQuestionAnswers = value => {
    this.surveyQuestionAnswers = value;
  };

  isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        Alert.alert('Write Permission Error', err);
        return false;
      }
    } else {
      return true;
    }
  };
}

let appStore = new AppStore();

export default appStore;
