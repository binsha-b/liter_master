/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {myDefaultTheme, profilePlaceholder} from '../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VersionCheck from 'react-native-version-check';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';
const {colors} = myDefaultTheme;
const SideDrawer = ({navigation}) => {
  const DrawerCard = props => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: responsiveScale(18),
          borderBottomColor: 'rgba(169, 169, 169, 0.5)',
          borderBottomWidth: responsiveScale(1),
        }}
        // onPress={() => {
        //   navigation.toggleDrawer();
        //   navigation.navigate(props?.toPage);
        // }}
      >
        <Image
          source={props?.icon}
          style={{height: responsiveScale(20), width: responsiveScale(20)}}
        />
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: responsiveScale(13.5),
            color: colors.secondary,
            marginLeft: responsiveScale(10),
            textAlign: 'left',
            includeFontPadding: false,
          }}>
          {props?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'flex-end',
          paddingHorizontal: responsiveScale(15),
          paddingBottom: responsiveScale(30),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: responsiveScale(56),
              height: responsiveScale(56),
              borderRadius: responsiveScale(50),
              borderWidth: responsiveScale(3),
              borderColor: colors.primary,
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{height: '100%', width: '100%'}}
              source={{
                uri: profilePlaceholder,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: responsiveScale(10),
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: responsiveScale(16),
                textAlign: 'left',
                includeFontPadding: false,
              }}>
              Supervisor
            </Text>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: responsiveScale(11),
                textAlign: 'left',
                includeFontPadding: false,
              }}>
              test@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: responsiveScale(1.5),
          backgroundColor: colors.primary,
        }}
      />
      <View
        style={{
          flex: 0.75,
          padding: responsiveScale(20),
        }}>
        <View style={{flex: 1}}>
          {/* <DrawerCard
            toPage="Home"
            icon={require('../assets/images/icons/home.png')}
            title="Home"
            // titleArabic='ملف التعريف'
          /> */}
          <DrawerCard
            toPage="Profile"
            icon={require('../assets/icons/profile.png')}
            title="Profile"
          />

          <DrawerCard
            toPage="Settings"
            icon={require('../assets/icons/settings.png')}
            title="Settings"
          />
        </View>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: responsiveScale(10),
            borderRadius: responsiveScale(10),
            backgroundColor: colors.primary,
            alignSelf: 'flex-start',
          }}
          //onPress={onLogut}
        >
          <AntDesign
            size={responsiveScale(18)}
            name="logout"
            color={colors.card}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: responsiveScale(13),
              color: colors.card,
              marginLeft: responsiveScale(10),
              includeFontPadding: false,
            }}>
            {'Log out'}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: colors.text,
            fontFamily: FONT_FAMILY.regular,
            marginTop: responsiveScale(10),
            opacity: 0.7,
            includeFontPadding: false,
          }}>
          {'version'} {VersionCheck.getCurrentVersion()}
        </Text>
      </View>
    </View>
  );
};

export default SideDrawer;
