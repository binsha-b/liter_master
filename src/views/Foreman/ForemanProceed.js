import React, {useLayoutEffect,} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import Feather from 'react-native-vector-icons/Feather';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/Input';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const ForemanFuelType = ({navigation}) => {
 
const proceed = () => {
  navigation.navigate('ForemanConfirm');
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
         <View style={styles.title}>
          <Text style={styles.boldText}>Add Item</Text>
          <View style={{flexDirection: 'row',marginTop:5,}}>
            <View style={{flex: 0.7,marginTop:5,}}>
              <Text style={styles.totalLabel}>Total Sales</Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>10,0000</Text>
            </View>
          </View>
        
        </View>


        <View style={styles.title}>
          <View style={{flexDirection: 'row',marginTop:5,}}>
            <View style={{flex: 0.7,marginTop:5,}}>
              <Text style={styles.totalLabel}>Method</Text>
            </View>
            <View style={styles.cashContainer}>
            <View style={styles.cashButton}>
                <Text style={styles.cashAmount}>MADA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Image
            source={require('./../../assets/icons/downArrow.png')}
          />
                 </Text>
                 
              </View>
            </View>
            
          </View>
          <View style={{flexDirection: 'row',marginTop:15,}}>
            <View style={{flex: 0.7,marginTop:4,}}>
              <Text style={styles.totalLabel}>Amount</Text>
            </View>
            <View style={{flex: 0.3,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                }}>
                <View style={{ 
                width: 150,
                alignSelf: 'center',}}>
            <Input
              inputStyle={{
                marginTop: scale(0),
               textAlign:'center',fontFamily: FONT_FAMILY.semibold,
                backgroundColor:colors.background2,
              }}
              style={{width: '100%',height:43}}
              multiline={true}
              numberOfLines={1}
               value="600"
              //textAlignVertical="top"
             
            />
            </View>
            </View>
            {/* <View style={styles.cashContainer}>
            <View style={styles.cashButton}>
                <Text style={styles.cashAmount}>600</Text>
              </View>
            </View> */}
            
          </View>
        
        </View>

        <View style={{width: 137,height: 37,marginLeft: 127,marginTop: 15,
        backgroundColor: '#F15A22',borderRadius: 96,}}>
          <Text style={styles.plus}><Image
            source={require('./../../assets/icons/smallplus.png')}
          /></Text>
        </View>
        
        <View style={{borderBottomWidth:1,borderBottomColor:'white', marginTop:15}}></View>

        <View style={{flexDirection: 'row',marginTop:10,marginLeft:10}}>
            <View style={{flex: 0.7,}}>
              <Text style={styles.totalLabel}>Total Amount(SAR)</Text>
            </View>
            <View style={styles.totalPriceContain}>
              <Text style={styles.totalPrice}>50,000</Text>
            </View>
          </View>

          <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 10, bottom: 20, left: 50, right: 50}}
          style={{
            borderRadius: scale(10),

            marginTop: scale(8),
            width: '97%',
            alignSelf: 'center',

            backgroundColor: colors.background,
            paddingVertical: scale(10),
            paddingHorizontal: scale(5),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
            source={require('./../../assets/icons/docu.png')}
          />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(12),
                flex: 1,
                textAlign: 'left',
                color: colors.secondary,
                marginHorizontal: scale(10),
              }}>
              Attachment
            </Text>
             <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: scale(12),
              color: colors.disableText,
                //marginHorizontal: scale(10),
             }}>
              Images
            </Text>
            <View
              style={{
                width: scale(26),
                height: scale(26),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
               
              <View
                style={{
                  width: scale(15),
                  height: scale(15),
                  borderRadius: scale(50),
                  backgroundColor: colors.secondary,
                  paddingVertical: scale(2),
                }}>
                   
                <Feather
                  style={{alignSelf: 'center'}}
                  color={colors.background}
                  size={scale(10)}
                  name={'plus'}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>


        
          
            <Input
              inputStyle={{

                //minHeight: scale(90),
                marginTop: scale(12),
                backgroundColor: colors.background,
                borderRadius:22
              }}
              style={{width: '97%'}}
              multiline={true}
              numberOfLines={2}
              placeholder={'Description'}
              // value={notes}
              textAlignVertical="top"
            />
         
        
        <View style={styles.buttonContainer}>
          <View style={{width: '100%'}}>
            <Button  onPress={proceed}>
              <Text style={styles.buttonSubmit}>
                PROCEED
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(15),
    includeFontPadding: false,
    color: colors.background,
  },
  buttonContainer: {
    //backgroundColor: colors.background,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    marginTop:scale(-5),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  totalPriceContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    //position: absolute,
   backgroundColor: '#FBE1DD',
   borderRadius: 10,
   height:42,
  },
  totalPriceContain: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    //position: absolute,
   //backgroundColor: '#FBE1DD',
   borderRadius: 10,
   height:42,
  },
  totalPrice: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(15),
    color: colors.primary,
  },
  totalLabel: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(14),
    color: colors.secondary,
  },
  cashAmount: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    alignSelf: 'center',
    color: colors.secondary,
  },
  plus: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(18),
    alignSelf: 'center',
    color: colors.background,
    marginBottom:5,
    marginTop:10,
  },
  cashButton: {
    backgroundColor: colors.background2,
    borderRadius: scale(10),
    paddingVertical: scale(5),
    width: 150,
    alignSelf: 'center',
  },
  cashContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
  },
  title: {
    marginTop: scale(15),
    backgroundColor: colors.background,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    marginRight:10,
    marginLeft:10,
  },
});
export default ForemanFuelType;
