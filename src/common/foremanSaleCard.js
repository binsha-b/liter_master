import React, {useLayoutEffect,useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from './../assets/fonts';
import Button from '../common/Button';


import {commonStyles} from '../utils/commonStyles';
import {myDefaultTheme} from '../utils/theme';
const {colors} = myDefaultTheme;
const ForemanSaleCard = () => {
    return(
<TouchableOpacity 
                style={{
                  padding: scale(10),
                  borderRadius: scale(10),
                  marginTop: scale(10),
                  backgroundColor: colors.background2,
                  width:'94%'
                }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY.bold,
                      fontSize: scale(14),
                      textAlign: 'left',
                      color:'black',
                    }}>
                    #2626462698445
                  </Text>
                
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: scale(0),
                   // alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY.medium,
                      fontSize: scale(13),
                      textAlign: 'left',
                    }}>
                    Liter Fuel
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: scale(5),
                    alignItems: 'center',
                  }}>
                  
                  <View style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      marginTop:-10,
                     
                    }}>
                    <Text style={{
                        fontFamily: FONT_FAMILY.regular,
                        fontSize: scale(12),
                        color: '#2C2627',
                        textAlign: 'right',
                        marginTop:-12,
                      
                      }}>
                  Date 
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: scale(5),
                    alignItems: 'center',
                  }}>
                  
                  <View style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      //marginTop:-10,
                     
                    }}>
                    <Text style={{
                        fontFamily: FONT_FAMILY.regular,
                        fontSize: scale(12),
                        color: '#2C2627',
                        textAlign: 'right',
                        marginTop:-10,
                      
                      }}>
                  21-10-2022
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
    );
                    };
export default ForemanSaleCard;                    