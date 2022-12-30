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
import Input from '../common/Input';

const {height} = Dimensions.get('window');
const {colors} = myDefaultTheme;

const MyProfile = ({navigation}) => {
  const {user, setUser} = userStore;
  const [firstname, setFirstName] = useState(user?.firstname);
  const [mobile, setMobile] = useState(user?.mobile);
  const [email, setEmail] = useState(user?.email);
  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  const onUpdate = () => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update details?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            //
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
        padding: responsiveScale(10),
      }}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Personal Information</Text>
        <Input
          label="Full Name"
          placeholder={'Full Name'}
          value={firstname}
          onChangeText={setFirstName}
        />
        <Input
          label="Mobile Number"
          placeholder={'Mobile Number'}
          value={mobile}
          onChangeText={setMobile}
        />
        <Input
          label="Email ID"
          placeholder={'Email'}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <Button disabled={loader} onPress={onUpdate}>
        <Text style={commonStyles.buttonLabel}>Update</Text>
      </Button>
    </View>
  );
};

export default observer(MyProfile);

const styles = StyleSheet.create({
  sectionContainer: {
    padding: responsiveScale(15),
    borderRadius: responsiveScale(10),
    marginBottom: responsiveScale(15),
    backgroundColor: colors.card,
  },

  sectionLabel: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(14),
    color: colors.secondary,
    includeFontPadding: false,
    textAlign: 'left',
    marginBottom: responsiveScale(15),
  },
});
