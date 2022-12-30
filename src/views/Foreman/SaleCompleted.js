import React, {useLayoutEffect,useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  Text,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
//import Input from '../../common/InputOld';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import ForemanSaleCard from './../../common/foremanSaleCard';


const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const SaleCompleted = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [ToggleCheckBoxCash, setToggleCheckBoxCash] = useState(false)
  const [toggleCheckBoxCredit, setToggleCheckBoxCredit] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState('Approve');
   

    const onSelect = (label) => {
       setStatus(label);
     };

    const CountBox = ({
       label = 'Approve',
       onSelect,
       selected,
     }) => {
       return (
         <TouchableOpacity 
         onPress={() => onSelect(label)}
         style={[styles.countBoxContainer,{height:38,paddingTop:4,},
         {backgroundColor: selected ? "black" : colors.background2},
       ]}
        >
         <Text style={{ color: selected ? "white" : "black",
        fontFamily: FONT_FAMILY.medium,
        fontSize: scale(13),}}
           >
             {label}
           </Text>
           
         </TouchableOpacity>
       );
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
    <View style={commonStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View 
        contentContainerStyle={{
          padding: scale(8),
          height: height,
        }}
        showsVerticalScrollIndicator={false} style={{alignItems:'center'}}>
            <View style={styles.container1}>
               <View
               style={{
                 flexDirection: 'row',
                 justifyContent: 'space-around',
                 flexWrap: 'wrap',
                 
               }}>
               <CountBox
                 label={'Approve'}
                 onSelect={onSelect}
                 selected={status === 'Approve'}
               />
               <CountBox
                 label={'Reject'}
                 onSelect={onSelect}
                 selected={status === 'Reject'}
               />
             </View>
             
             </View>
             
              <ForemanSaleCard></ForemanSaleCard>
              <ForemanSaleCard></ForemanSaleCard>
              <ForemanSaleCard></ForemanSaleCard>
              <ForemanSaleCard></ForemanSaleCard>

              <ForemanSaleCard></ForemanSaleCard>

              <ForemanSaleCard></ForemanSaleCard>
  

        
       
            


        </View>
          
        
        </ScrollView>
          <View style={styles.buttonContainer}>
      <View style={{flex: 0.34}}>
          <TouchableOpacity
           onPress={() => setModalVisible(true)}
            style={{
              height: scale(34),
              borderRadius: scale(18),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              flexDirection: 'row',
              //position:'absolute',
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: scale(13),
                color: colors.background,
                marginRight: scale(0),
              }}>
              Filter &nbsp; <Image
            
              source={require('./../../assets/icons/filter.png')}
            /> 
            </Text>
          </TouchableOpacity>
        </View>
          </View>
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          {/*<Button  onPress={showDatePicker} ><Text style={{fontFamily: FONT_FAMILY.bold,
                fontSize: scale(12),
                color: colors.background,
                marginRight: scale(0),}}>Date</Text></Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
          />*/}
        
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(20),
              fontFamily: FONT_FAMILY.bold,
              //textAlign: 'left',
              //paddingBottom: scale(3),
              marginTop:8,
              color: colors.secondary,
              
            }}>
            service type
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={toggleCheckBox} 
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
               
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: toggleCheckBox ? '#F15927' : colors.secondary,
                marginLeft: scale(10)}}>MADA</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={ToggleCheckBoxCash} height={30} width={30}
                  onValueChange={(newValue) => setToggleCheckBoxCash(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: ToggleCheckBoxCash ? '#F15927' : colors.secondary,
                marginLeft: scale(10),}}>Cash</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={toggleCheckBoxCredit} height={30} width={30}
                  onValueChange={(newValue) => setToggleCheckBoxCredit(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: toggleCheckBoxCredit ? '#F15927' : colors.secondary,
                marginLeft: scale(10),}}>Credit Card</Text>
                </View>
             


            <View style={{width: '100%',height:81,marginTop:10,}}>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontFamily: FONT_FAMILY.bold,marginTop:-5,
                fontSize: scale(15),
                color: colors.background,
                marginRight: scale(0),}}>APPLY FILTER</Text>
            </Button>
         
        </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container1: {
        alignItems: "center",
        justifyContent: "center",
        marginTop:10,
        backgroundColor:colors.background2,
        width: 370,
        borderRadius:24,
        height:45,
        marginBottom:5
        
      },
      countBoxContainer: {
        //borderWidth: 1,
        //borderColor: "#DDDDDD",
        borderRadius: 22,
        alignItems: 'center',
       // paddingVertical: 8,
        width: 180,
       // marginBottom: 8,
       //height:55,
       
      },
      buttonContainer: {
        alignSelf: 'center',
        position:'absolute',
        width:'25%',
       height:70,
        fontFamily: FONT_FAMILY.bold,
        marginBottom:20,
        marginTop:490,
       
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        //alignItems: "center",
        //marginTop: 100,
        //activeOpacity:0.9,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width:'100%'
      },
      modalView: {
        marginTop:520,
        margin: 1,
        backgroundColor: "white",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        // borderRadius: 20,
        padding: 20,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height:435,
      },
      
      
      
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
        
    
});
export default SaleCompleted;
