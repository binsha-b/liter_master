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
import {ListIncidentReport} from '../../api';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import {ASSET_URL} from './../../utils/index';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const keyExtractor = item => item.order_no;
const OrderCard = React.memo(({navigation, item}) => {
 console.log(item?.video);
 const valuesArray = JSON.parse(item?.video);
 
  return (
    <TouchableOpacity style={{backgroundColor:colors.background,
              height:299,width:"99%",marginTop:8,
              borderRadius: 12, marginBottom:10,padding:12,
              }}>
        <Text style={{padding:0,fontFamily: FONT_FAMILY.semibold,
        fontSize: scale(12)}}>Issue Type : {item?.issue_type}</Text>



        <View style={styles.containertab}>
            <View style={styles.tableContainer}>
              
              <View style={styles.tableRow}>
                  <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.textLineItem}>Date</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.textLineItem}>Time</Text>
                  </View>
                  
              </View>
              <View style={styles.tableRow}>
                  <View style={styles.tableColumnClockInOutTimes}>
                    <Text style={styles.categoryStyle}>{item?.date}</Text>
                  </View>
                  <View style={styles.tableColumnTotals}>
                    <Text style={styles.categoryStyle}>{item?.time}</Text>
                  </View>
                  
              </View> 
             
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.tableColumnClockInOutTimes}>
                <Text style={styles.textLineItem}>Note</Text>
            </View>
        </View>    
        <View style={styles.tableRow}>
            <View style={styles.tableColumnClockInOutTimes}>
                <Text style={styles.statusStyle}>{item?.notes}</Text>
            </View>
        </View>
        <View style={styles.tableRow}>

          <Video source={{ uri:ASSET_URL+valuesArray[0]?.uri}}//'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'   // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />


        </View>
        
                  
      

        </TouchableOpacity>
          );
});



const IncidentReportList = ({navigation}) => {
 // const [counts, setCounts] = useState({});
    const [loadingCount, setLoadingCount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresing, setRefreshing] = useState(false);
    const [report, setReport] = useState([]);
   
   // const focusedScreen = useIsFocused();
   
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
        let {data} = await ListIncidentReport();
          console.log(data)
        intial ? setLoading(false) : setRefreshing(false);
       
       setReport(data);
      } catch (error) {
        intial ? setLoading(false) : setRefreshing(false);
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the Incident Report. Please try again later',
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
  const AddIncidentReport = () => {
    navigation.navigate('AddIncidentReport', {
     // depositMode: mode,
      //cashInHand: counts?.collection_in_hand,
    });
  };
  
  return (
    <>
   
    <View style={[commonStyles.container,{backgroundColor:colors.background1, height: height,marginBottom:0,}]}>
        
        
        <View style={{ alignItems: "center",
                          justifyContent: "center",
                          color:'black',
                          borderColor:'black',width:"100%",
                          marginTop:10,backgroundColor:'#e8e6e6'}}>
                            
                            <TouchableOpacity
        onPress={AddIncidentReport}
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
        data={report}
        keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListEmptyComponent={
          <View style={commonStyles.emptyStateContainer}>
            <Text
              style={[commonStyles.emptyStateText, {color: colors.secondary}]}>
              Sorry! There are no Incident Report for you. Please try again
              later.
            </Text>
          </View>
        }
      />                
          
              
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 80,
       // bottom: 0,
       // right: 0,
        height:100,
        width:'100%',
      //  alignContent:'center',
      //  backgroundColor:'red',
    },
});
export default IncidentReportList;
