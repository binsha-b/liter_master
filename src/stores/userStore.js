import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';

class UserStore {
  user = null;
  employees = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    if (this.user !== null) {
      return true;
    }

    return false;
  }

  setUser = async user => {
    this.user = user;
    if (user == null) {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } else {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('token', user.api_token);
    }
  };

  loadUser = async () => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      return true;
    }
    return false;
  };

  setEmployees = value => {
    this.employees = value;
  };
}

let userStore = new UserStore();

export default userStore;
