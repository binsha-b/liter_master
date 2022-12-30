import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import userStore from '../stores/userStore';
import {API_URL} from '../utils';

axios.interceptors.request.use(async data => { 
  const config = data;
  const {user} = userStore;
  try {
    if (user?.api_token !== null) {
      config.headers.Authorization = `Bearer ${user?.api_token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers.appId = 'Adox_Liter_2022';
  } catch (error) {
    console.warn('Some Error occured', error);
  }
  return config;
});

axios.defaults.baseURL = API_URL;

export const loginUser = body => axios.post('login?lang=en', body);

export const getSurveyCount = () => axios.get('survey_count');

export const getSurveyStations = () => axios.get('survey_stations?lang=en');

export const getSurveyQuestions = (station_id, surveyType) =>
  axios.get(
    `survey_questions?lang=en&station_id=${station_id}&type=${surveyType}`,
  );

export const getCompletedSurveys = ({endDate = '', startDate = ''}) =>
  axios.get(
    `completed_survey?lang=en&startdate=${startDate}&enddate=${endDate}`,
  );

export const uploadImage = (formData, config) =>
  axios.post('upload_image', formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // transformRequest: () => {
    //   return formData;
    // },
  });

export const submitSurvey = body => axios.post('add_survey', body);

export const getSurveyStatus = body => axios.post('get_survey_status', body);

export const supervisorHome = () => axios.get('supervisorHome');

export const changeCollectionStatus = body =>
  axios.post('changeCollectionStatus', body);

export const getCollectedTransactions = body =>
  axios.post('getCollectedTransactions', body);

export const collectionCount = () => axios.get('collectionCount');

export const getBanks = () => axios.get('getBanks');

export const getTreasurers = () => axios.get('getTreasurers');

export const depositCollection = body => axios.post('depositCollection', body);
export const getFmrStation = () => axios.get('fmr_stations');

export const addFmr = body => axios.post('add_fmr', body);

export const getCategory = () => axios.post('issue_category');

export const getIssutypes = body => axios.post('issue_type', body);

export const getFmr = (token) =>
  axios.get(`fmr_status?status=${status}&station_id=${stationID}`);

export const FuelOrderList = () => axios.get('list_fuel_order');

export const OrderFuel = body => axios.post('order_fuel', body);


