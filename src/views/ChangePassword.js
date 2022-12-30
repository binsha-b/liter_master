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

const ChangePassword = ({navigation}) => {
  const {user, setUser} = userStore;

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  const onUpdate = () => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update password?',
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
        <Text style={styles.sectionLabel}>Change Password</Text>
        <Input
          label="Old Password"
          placeholder={'Old Password'}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <Input
          label="New Password"
          placeholder={'New Password'}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Input
          label="Confirm New Password"
          placeholder={'Confirm New Password'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button disabled={loader} onPress={onUpdate}>
        <Text style={commonStyles.buttonLabel}>Update Password</Text>
      </Button>
    </View>
  );
};

export default observer(ChangePassword);

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
