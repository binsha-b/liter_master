//import {useIsFocused} from '@react-navigation/native';
import React, {useLayoutEffect,useState,useEffect} from 'react';
import moment from 'moment/moment';   
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import {FONT_FAMILY} from '../../assets/fonts';
import CountBox from '../../common/CountBox';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {responsiveScale} from '../../utils';
import {showMessage} from 'react-native-flash-message';
import {FuelOrderList} from '../../api';
import Feather from 'react-native-vector-icons/Feather';


const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const keyExtractor = item => item.order_no;
const OrderCard = React.memo(({navigation, item}) => {
  const getBackgroundColor = () => {
    let color;
    if ((item?.status) === 'New') {
        color = {color:"#2bb3c2",backgroundColor:"#e3f7fa"};
    } else if ((item?.status) === 'Completed') {
        color = {color:"#449667",backgroundColor:"#E2F5EA"};
    } else if ((item?.status) === 'Ongoing') {
        color = {color:"#00396D",backgroundColor:"rgba(90, 139, 234, 0.2)"}
    } else if ((item?.status) === 'Delayed') {
        color = {color:"#F15A22",backgroundColor:"#F5E2E2"}
    } 
    return color;
};
  return (
    <TouchableOpacity style={{backgroundColor:colors.background,
              height:190,width:"99%",marginTop:8,
              borderRadius: 12, marginBottom:10,padding:14,
              }}>
        <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
        fontSize: scale(14),color:"black"}}>{item?.order_no}</Text>


        <View style={styles.containertab}>
            <View style={styles.tableContainer}>
              
              <View style={styles.tableRow}>
                  <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>FuelType</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>Tanker Capacity</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>Date </Text>
                  </View>
              </View>
              <View style={styles.tableRow}>
                  <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.categoryStyle}>{item?.fuel_type}</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.categoryStyle}>{item?.capacity}</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.categoryStyle}>{(moment(item?.date).format('DD-MMM-YYYY'))} </Text>
                  </View>
              </View> 
              
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.tableColumnClockInOutTimes}>
                <Text style={styles.textLineItem}>Status</Text>
            </View>
        </View>    
        <View style={styles.tableRow}>
            <View style={styles.tableColumnClockInOutTimes}>
                <Text style={[styles.statusStyle,getBackgroundColor()]}>{item?.status}</Text>
            </View>
        </View>
                  
              

        </TouchableOpacity>
          );
});



const FuelOrder = ({navigation}) => {
 // const [counts, setCounts] = useState({});
    const [loadingCount, setLoadingCount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresing, setRefreshing] = useState(false);
    const [orders, setorders] = useState([]);
    const [newCount,setNewCount] = useState(null);
    const [completedCount,setCompletedCount] = useState(null);
   // const focusedScreen = useIsFocused();
   console.log(orders)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);
  // if (loading) {
  //   return (
  //     <View style={{flex: 1}}>
  //       <View style={{flex: 1, justifyContent: 'center'}}>
  //         <ActivityIndicator color={colors.primary} />
  //       </View>
  //     </View>
  //   );
  // }
     
  useEffect(() => {
    setLoading(true);
   
     const getData = async (intial = false) => {
      try {
        let {data} = await FuelOrderList();
        setNewCount(data?.New);
        setCompletedCount(data?.completed);
         
        intial ? setLoading(false) : setRefreshing(false);
        console.log(data)
       setorders(data?.orders);
      } catch (error) {
        intial ? setLoading(false) : setRefreshing(false);
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the completed surveys. Please try again later',
        });
      }
    };
    getData();
  },[]);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };
  const _renderItems = ({item}) => {
    return <OrderCard  navigation={navigation}  item={item} />;
   
  };
  const AddOrder = () => {
    navigation.navigate('FuelOrderType', {
     // depositMode: mode,
      //cashInHand: counts?.collection_in_hand,
    });
  };

  
  return (
    <>
   
    <View style={[commonStyles.container,{backgroundColor:colors.background1, height: height,marginBottom:100,}]}>
      
      
      
          <View style={styles.countContainer}>
             <CountBox 
            loading={loadingCount}
            count={newCount}
            label={'Processing'}
            textAlign={'left'}
          />
          <CountBox
            loading={loadingCount}
            count={completedCount}
            label={'Completed'}
            textAlign={'left'}
          />
          </View>
        
        
        <View style={{ alignItems: "center",
                          justifyContent: "center",
                          color:'black',
                          borderColor:'black',width:"100%",
                          marginTop:10,backgroundColor:'#e8e6e6'}}>
                            <TouchableOpacity
        onPress={AddOrder}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.buttonCheck}>
        <Feather name="plus" color={colors.card} size={responsiveScale(18)} />
      </TouchableOpacity>

      <FlatList style={{width:420,marginLeft:5,}}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl  
            refreshing={refresing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            titleColor={colors.primary}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: responsiveScale(15),
        }}
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListEmptyComponent={
          <View style={commonStyles.emptyStateContainer}>
            <Text
              style={[commonStyles.emptyStateText, {color: colors.secondary}]}>
              Sorry! There are no orders for you. Please try again
              later.
            </Text>
          </View>
        }
      />                
                
              {/*<TouchableOpacity style={{backgroundColor:colors.background,
                      height:190,width:"95%",marginTop:8,
                      borderRadius: 12, marginBottom:10,padding:14,
                      }}>
                <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
                fontSize: scale(14),color:"black"}}>#4569874523658</Text>


                <View style={styles.containertab}>
                    <View style={styles.tableContainer}>
                      
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.textLineItem}>Fuel Type</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Tanker Capacity</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Date </Text>
                          </View>
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.categoryStyle}>95</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>40000</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>10 Oct 2021 </Text>
                          </View>
                      </View> 
                      
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>Status</Text>
                    </View>
                </View>    
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.statusStyle}>Ongoing</Text>
                    </View>
                </View>
                          
                      
  
              </TouchableOpacity>
              */}
              
              </View>  
       
    </View>
     
    </>
  );
};
const styles = StyleSheet.create({
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: scale(10),
    fontSize: scale(18),
    
  },
  containertab: {
      flex: 1,
      marginTop:0,
      maxHeight:85,
      //padding: 10
     // borderBottomWidth:1,
     // borderBottomColor:"#b3b9b7",
   },
   
   tableColumnClockInOutTimes: {
      flex: .4,
     // justifyContent: "center",
      margin: 1,
      
   },
   tableColumnTotals: {
     // alignItems: "center",
     // backgroundColor: "#000000",
      flex: .8,
     // justifyContent: "center",
      margin: 1
   },
   tableRow: {
      //flex: .8,
      flexDirection: "row",
      maxHeight: 35,
     
   },
   
   tableContainer: {
     // backgroundColor: "blue",
      borderRadius: 5,
      flex: 1,
      marginTop: 0,
      padding: 5,
     
   },
    textLineItem: {
      fontFamily: FONT_FAMILY.semibold,
       fontSize: scale(11),
      color: colors.secondary1,
      //alignItems:'flex-start'
      textAlign:'left',
     // width:'80%'
    },
    categoryStyle:{
     // borderWidth: 1,
     // borderColor: "#F0F2F5",
      fontFamily: FONT_FAMILY.semibold,
      fontSize: scale(13),
      color:"black",
      backgroundColor:"#F0F2F5",
      borderRadius:8,
      alignItems: 'center',
      width: "80%",
      height:32,
      textAlign:'center',
      marginTop:4,
    },
    statusStyle:{
        fontFamily: FONT_FAMILY.semibold,
        fontSize: scale(14),
        //color:"#00396D",
        //backgroundColor:"rgba(90, 139, 234, 0.2);",
        borderRadius: 8,
        alignItems: 'center',
        //padding: 6,
        width: "70%",
        height:35,
        textAlign:'center',
        marginTop:4,
    },
    buttonCheck: {
      position: 'absolute',
      bottom: responsiveScale(30),
      right: responsiveScale(20),
      width: responsiveScale(45),
      height: responsiveScale(45),
      borderRadius: responsiveScale(50),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
});
export default FuelOrder;
