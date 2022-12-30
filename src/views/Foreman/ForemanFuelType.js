import {calendarFormat} from 'moment';
import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/Input';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';


const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const ForemanFuelType = ({navigation}) => {
 
const toSubmit = () => {
    navigation.navigate('ForemanProceed');
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
    <View style={(commonStyles.container, {backgroundColor: colors.background1})}>
      <View 
        contentContainerStyle={{
          padding: scale(8),
          height: height,
         
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.fuelTitle}>
          <Text style={styles.boldText}>Fuel Type</Text>
          <View style={styles.dieselStyle}>
            <Text style={styles.fuelLabelDisable}>Diesel</Text>
            
            </View>

            <View style={styles.petrolStyle}>
            <Text style={styles.fuelLabelActive}>Petrol</Text>
            
            </View>

                <View style={styles.lpgStyle}>
                    <Text style={styles.fuelLabelDisable}>LPG</Text>
                </View>
        </View>

        
       

        <View style={styles.quantityContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.quantityLabel}>Quantity</Text>
            </View>
          </View>

            <View style={styles.description}>
          <View style={{flexDirection:'row',fontFamily: FONT_FAMILY.bold}}>
            <Input
              inputStyle={{
                minHeight: scale(10),
                marginTop: scale(10),
                backgroundColor: colors.secondary2,
              }}
              style={{width: '50%', fontFamily: FONT_FAMILY.bold, fontSize:15}}
              multiline={true}
              numberOfLines={1}
             // placeholder={'Type here...'}
               value="150 L"
              textAlignVertical="top"
              
            />
            <Image
            style={{marginTop:30,marginLeft:-30,}}
            source={require('./../../assets/icons/rightArrow.png')}
          /> 
          
          <Input
              inputStyle={{
                minHeight: scale(10),
                marginTop: scale(10),
                marginLeft:scale(20),
                backgroundColor: colors.secondary2,
              }}
              style={{width: '55%', fontFamily: FONT_FAMILY.bold,}}
              multiline={true}
              numberOfLines={1}
             // placeholder={'Type here...'}
               value="SAR 18,000"
              textAlignVertical="top"
              
            />
          </View>
        </View>
           
          
        </View>


        </View>
          <View style={styles.buttonContainer}>
            <Button onPress={toSubmit}>
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
    marginTop:195,
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
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    paddingVertical: scale(10),
   // width: '100%',
    alignSelf: 'center',
    marginTop:15,
    marginBottom:10,
    marginRight:10,
    marginLeft:10,
  },
  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
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
    backgroundColor: '#F15A22',
    borderColor:'#F15A22',
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
    paddingHorizontal: scale(8),
    borderRadius: scale(10),
    width: '100%',
    alignSelf: 'center',
  },
});
export default ForemanFuelType;
