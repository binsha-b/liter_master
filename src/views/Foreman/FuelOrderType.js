import {calendarFormat} from 'moment';
import moment from 'moment/moment';
import React, {useLayoutEffect,useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  Keyboard,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/Input';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {OrderFuel} from './../../api';
import {showMessage} from 'react-native-flash-message';
import userStore from './../../stores/userStore';
const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const FuelOrderType = ({navigation}) => {
  const {user, setUser} = userStore;
 const [stations, setStations] = useState(user?.stations);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//const [selectDate,setSelectDate] = useState('');
 const [selectDate, setselectDate] = useState(null);
 const [FuelType, setFuelType] = useState(null);
 const [capacity, setCapacity] = useState(null);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
    
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (value) => {
    setselectDate(value);
    //console.log("A date has been picked: ", value);
   
    hideDatePicker();
  };
  /*const selectFuelType = (value)=>{
    setFuelType(value);

  };|*/
  const onSubmit = async () => {
    const body = {
      fuel_type:FuelType,
      capacity:capacity,
      date: moment(selectDate).format('DD-MM-YYYY'),
      station_id:stations     
    };
console.log(body);
    try {
      let {data} = await OrderFuel(body);
console.log(data);
      if (data) {
        showMessage({
          message: ('Order No: '+data+' has been Placed'),
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: data?.message,
          type: 'danger',
        });
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      showMessage({
        message: 'failed',
        description: '' + error,
        type: 'danger',
      });
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Liter Gas Station',
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);

  return (
    <View style={[commonStyles.container, {backgroundColor:'#e8e6e6'}]}>
      <View 
        contentContainerStyle={{
          padding: scale(8),
          height: height,
         
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.fuelTitle}>
        <Text style={{fontFamily: FONT_FAMILY.bold,
    fontSize: scale(11),marginTop:5}}>You don't have to worry</Text>
          <Text style={styles.boldText}>Fuel Type</Text>
          <View style={[styles.dieselStyle,{backgroundColor: (FuelType === 'Diesel')? '#F15A22' : 'white',}]} >
            <Text style={[styles.fuelLabelDisable,
              {color: (FuelType === 'Diesel')? colors.background : colors.secondary,
            }
              ]}  onPress={()=> setFuelType("Diesel")}>Diesel</Text>
            </View>

            <View style={[styles.petrolStyle,{backgroundColor: (FuelType === 'Petrol')? '#F15A22' : 'white',}]}>
            <Text style={[styles.fuelLabelActive,
              {color: (FuelType === 'Petrol')? colors.background : colors.secondary,
            }
              ]} onPress={()=> setFuelType("Petrol")}>Petrol</Text>
            
            </View>

                <View style={[styles.lpgStyle,{backgroundColor: (FuelType === 'LPG')? '#F15A22' : 'white',}]}>
                    <Text style={[styles.fuelLabelDisable,
              {color: (FuelType === 'LPG')? colors.background : colors.secondary,
            }
              ]}  onPress={()=> setFuelType("LPG")}
                    >LPG</Text>
                </View>
        </View>

        
       

        <View style={styles.quantityContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.quantityLabel}>Tanker Capacity</Text>
            </View>
          </View>

          <View style={[styles.description]}>
            <Input placeholder={'Capacity'} onChangeText={newText => setCapacity(newText)}
        defaultValue={capacity}
              />

             <Image style={{marginTop:12,marginLeft:320,padding:5,flex:1,position:'absolute'}}
                    source={require('./../../assets/icons/rightArrow.png')}
                    />   
                
                
               
            </View>
        </View>
        <View style={styles.quantityContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.quantityLabel}>Select Date</Text>
            </View>
          </View>

            <View style={styles.description}>
                <Pressable onPress={showDatePicker}>
                <Input placeholder={'Date'} disabled={true} value={selectDate ? moment(selectDate).format('yyyy-MM-DD') : ''}
                 onFocus={showDatePicker} />
                     
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
                      
                
                </Pressable> 
        </View> 
           
          
        </View>


        </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onSubmit}>
              <Text style={styles.buttonSubmit}>
                SUBMIT
              </Text>
            </Button>
          </View>
        
     
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(14),
    includeFontPadding: false,
    color: colors.background,
  },
  buttonContainer: {
    marginTop:70,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  quantityLabel: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
  },
  quantityContainer: {
    backgroundColor: colors.background, 
    borderRadius: scale(10),
    marginTop:scale(10),
    width:'95%',
    marginLeft:scale(8),
    padding:10,
  },
  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
    marginTop:-8,
  },
  fuelTitle: {
    marginTop: scale(15),
    backgroundColor: colors.background,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    marginRight:10,
    marginLeft:10,
  },
  fuelLabelDisable: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    color: colors.secondary,
   
  },
  fuelLabelActive: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    color: colors.background,
  },
  dieselStyle: {
    width: 75,
    height: 32,
    marginLeft: 22,
    marginTop: 25, 
    borderColor:'#CDCDCD',
    borderWidth:1,
    borderRadius: 4,
    alignItems: 'center',
  },
  petrolStyle : {
    width: 75,
    height: 32,
    marginLeft: 140,
    marginTop: -31,
    //backgroundColor: '#F15A22',
    borderColor:'#CDCDCD',
    borderRadius: 4,
    alignItems: 'center',
    borderWidth:1,
    padding:2,
  },
  lpgStyle : {
    width: 75,
    height: 32,
    marginLeft: 260,
    marginTop: -32,
    borderColor:'#CDCDCD',
    borderWidth:1,
    borderRadius: 4,
    marginBottom:10,
    alignItems: 'center',
  },
  description: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(18),
    borderRadius: scale(10),
   
  },
});
export default FuelOrderType;
