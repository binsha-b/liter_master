import React, {memo, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {openURLInBrowser, responsiveScale, SUPPORT_URL} from '../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../common/Button';
import userStore from '../stores/userStore';
import {FONT_FAMILY} from '../assets/fonts';
import {commonStyles} from '../utils/commonStyles';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');
const {colors} = myDefaultTheme;

const ListCard = memo(({name, icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.45}
      style={styles.accountTab}>
      <AntDesign
        name={icon}
        color={colors.textSecondary}
        size={responsiveScale(18)}
      />
      {/* <Image
        resizeMode="contain"
        source={icon}
        style={[styles.cardicons, {tintColor: colors.textSecondary}]}
      /> */}

      <Text style={styles.accountTabTitle}>{name}</Text>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/arrow-right-grey.png')}
        style={[styles.cardicons, {tintColor: colors.textSecondary}]}
      />
    </TouchableOpacity>
  );
});

const MyAccount = ({navigation}) => {
  const {user, setUser} = userStore;

  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  const onLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout from Liter?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            navigation.replace('IntroScreen');
            setUser(null);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundSecondary,
      }}>
      <ScrollView contentContainerStyle={styles.headerContainer}>
        <View
          style={[
            {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              marginTop: responsiveScale(50),
              marginBottom: responsiveScale(15),
            },
          ]}>
          <View style={{flex: 0.8, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode={'cover'}
              style={styles.profileImage}
              source={
                user?.profile_pic
                  ? {uri: user?.profile_pic}
                  : require('../assets/images/placeholder.png')
              }
            />
            <View style={{paddingLeft: responsiveScale(10)}}>
              <Text style={styles.Title}>{user?.firstname}</Text>
              <Text style={styles.loginType} numberOfLines={2}>
                {user?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
            }}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#FFB69A', '#F15A22']}
              style={{
                borderRadius: responsiveScale(15),
                paddingVertical: responsiveScale(8),
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: responsiveScale(12),
                  color: colors.card,
                  alignSelf: 'center',
                  includeFontPadding: false,
                }}>
                Edit
              </Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>My Profile</Text>
          <ListCard
            name={'Personal Data'}
            icon={'user'}
            onPress={() => navigation.navigate('Profile')}
          />
          <ListCard
            name={'Change Password'}
            icon={'lock'}
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Services</Text>

          <ListCard
            name={'Completed Surveys'}
            icon={'filetext1'}
            onPress={() => navigation.navigate('CompletedSurveys')}
          />
          <ListCard
            name={'My Collections'}
            icon={'wallet'}
            onPress={() => navigation.navigate('CompletedCollections')}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Notification</Text>

          <ListCard
            name={'Notifications'}
            icon={'bells'}
            onPress={() => navigation.navigate('CompletedCollections')}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Other</Text>

          <ListCard
            name={'Privacy Policy'}
            icon={'Safety'}
            onPress={() => openURLInBrowser(SUPPORT_URL)}
          />
          <ListCard
            name={'Settings'}
            icon={'setting'}
            onPress={() => navigation.navigate('CompletedCollections')}
          />
        </View>

        <Button disabled={loader} onPress={onLogout}>
          <Text style={commonStyles.buttonLabel}>Logout</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default observer(MyAccount);

const styles = StyleSheet.create({
  headerContainer: {
    padding: responsiveScale(15),
  },
  profileImage: {
    width: responsiveScale(60),
    height: responsiveScale(60),
    borderRadius: responsiveScale(30),
  },
  Title: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(15),
    textAlign: 'left',
    includeFontPadding: false,
    color: colors.text,
  },
  loginType: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(11),
    textAlign: 'left',
    includeFontPadding: false,
    marginTop: responsiveScale(3),
  },
  sectionContainer: {
    padding: responsiveScale(10),
    borderRadius: responsiveScale(10),
    marginBottom: responsiveScale(15),
    backgroundColor: colors.card,
  },
  accountTab: {
    borderRadius: responsiveScale(10),
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveScale(8),
  },
  accountTabTitle: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    paddingLeft: responsiveScale(10),
    fontSize: responsiveScale(12),
    color: colors.textSecondary,
    includeFontPadding: false,
    textAlign: 'left',
  },

  cardicons: {
    height: responsiveScale(18),
    width: responsiveScale(18),
    tintColor: colors.textSecondary,
  },
  sectionLabel: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(14),
    color: colors.secondary,
    includeFontPadding: false,
    textAlign: 'left',
    marginBottom: responsiveScale(8),
  },
});
