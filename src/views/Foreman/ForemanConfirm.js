import React, {useLayoutEffect,useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
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
 

 const [modalVisible, setModalVisible] = useState(false);

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
    <View style={commonStyles.container}>
        <ScrollView>
      <View
        contentContainerStyle={{
          padding: scale(8),
          height: height,
        }}
        showsVerticalScrollIndicator={false}>
         <View style={(styles.title,{alignItems:'center',
         backgroundColor:colors.secondary2,width:'92%',borderRadius:10,marginLeft:16,})}>
          <Text style={styles.boldText}>Riyadh</Text>
          
        
        </View>
        <View style={{flexDirection: 'row',paddingTop:8, paddingLeft:20,paddingEnd:20}}>
            <View style={{flex: 0.7,marginTop:5,}}>
              <Text style={styles.dateLocation}>Date</Text>
            </View>
            <View style={styles.totalPriceContain}>
              <Text style={styles.dateLabel}>21-10-2022</Text>
            </View>
            
          </View>
          <View style={{flexDirection: 'row', paddingLeft:20,paddingEnd:20,marginTop:-8}}>
            <View style={{flex: 0.7,marginTop:5,}}>
              <Text style={styles.dateLocation}>Location</Text>
            </View>
            <View style={styles.totalPriceContain}>
              <Text style={styles.dateLabel}>Saudi Arabia</Text>
            </View>
          </View>


        <View style={styles.title}>
          <View style={{flexDirection: 'row',marginTop:4,}}>
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
          </View>
        </View>

        <View style={styles.title}>
          <View style={{flexDirection: 'row',marginTop:4,}}>
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
          </View>
        </View>

    
        <View style={{flexDirection: 'row',marginTop:19,marginLeft:10}}>
            <View style={{flex: 0.7,}}>
              <Text style={styles.totalLabel}>Total Amount(SAR)</Text>
            </View>
            <View style={styles.totalPriceContain}>
              <Text style={styles.totalPrice}>50,000</Text>
            </View>
          </View>
          <View style={{borderBottomWidth:1,borderBottomColor:colors.background2, marginTop:13}}></View>
          <View style={{flexDirection: 'row',marginTop:19,marginLeft:10}}>
            <View style={{flex: 0.7,}}>
              <Text style={styles.totalLabel}>Attachment</Text>
            </View>
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{flex: 0.9,marginTop:19,alignItems:'center'}}>
                <Image
                  source={require('./../../assets/images/sampleDesign/testImage.png')}
                  //style={{marginLeft:40}}
                />
                <Text style={{color:'#f7a9a3',marginTop:5,fontStyle: 'italic'}}>Remove</Text>
            </View>
            <View style={{flex: 0.6}}>
                <Image
                  source={require('./../../assets/icons/noimage.png')}
                  style={{height:85}}
                />
                <Text style={{fontStyle: 'italic'}}>Add Image</Text>
            </View>
            <View style={{flex: 0.6}}>
                <Image
                  source={require('./../../assets/icons/noimage.png')}
                  style={{height:85}}
                />
                <Text style={{fontStyle: 'italic'}}>Add Image</Text>
            </View>
        </View>
        
          
        <View style={{flexDirection: 'row',marginTop:19,marginLeft:10}}>
            <View style={{flex: 0.7,}}>
              <Text style={styles.totalLabel}>Description</Text>
            </View>
        </View>
        <View style={styles.title}>
          <View style={{flexDirection: 'row',marginTop:0}}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.</Text>

          </View>
        </View>
        
         
        
        <View style={styles.buttonContainer}>
          <View style={{width: '100%'}}>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.buttonSubmit}>
                CONFIRM
              </Text>
            </Button>
          </View>
        </View>
      </View>
      </ScrollView>
      <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          transparent={true}
          visible={modalVisible}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView} >
               <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Feather name="check" color={'#fff'} size={scale(20)} />
              </Pressable> 
              <Text style={styles.modalText1}>Submitted Successfully</Text>
              <Text style={styles.modalText2}>
                Thank you for making
              </Text>
              
            </View>
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    dateLocation: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    color: colors.secondary,
    },
  dateLabel: {
    justifyContent :'flex-end',
    color: colors.secondary,
    marginLeft:20,
    },
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
    marginBottom:10,
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
    fontSize: scale(13),
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
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(15),
    color: colors.secondary,
  },
  title: {
    marginTop: scale(15),
    backgroundColor: colors.secondary2,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    marginRight:10,
    marginLeft:10,
    textAlign:'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2ECC71',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    marginTop:10,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: scale(18),
    color: colors.secondary,
    fontFamily: FONT_FAMILY.bold,
  },
  modalText2: {
    marginTop:-10,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: scale(12),
    color: colors.disableText,
    fontFamily: FONT_FAMILY.semibold,
  },
});
export default ForemanFuelType;
