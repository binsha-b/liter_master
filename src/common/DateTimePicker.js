import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FONT_FAMILY} from '../assets/fonts';

import {myDefaultTheme} from '../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {responsiveScale} from '../utils';

const {colors} = myDefaultTheme;
export default function DateTimePicker({
  value = '',
  icon = '',
  disabled = false,
  mode = 'date',
  minimumDate = null,
  onChooseDate = () => {},
}) {
  const [visible, setVisible] = useState(false);
  const showDatePicker = () => {
    setVisible(true);
  };

  const hideDatePicker = () => {
    setVisible(false);
  };

  const handleConfirm = date => {
    onChooseDate(date);
    hideDatePicker();
  };

  return (
    <TouchableOpacity disabled={disabled} onPress={showDatePicker}>
      <View
        style={{
          height: responsiveScale(45),
          borderRadius: responsiveScale(8),
          backgroundColor: colors.border,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: responsiveScale(10),
        }}>
        <Ionicons
          name={icon}
          size={responsiveScale(20)}
          color={colors.textSecondary}
        />
        <Text
          style={{
            fontSize: responsiveScale(12),
            textAlign: 'left',
            fontWeight: '600',
            fontFamily: FONT_FAMILY.regular,
            color: colors.textSecondary,
            flex: 1,
          }}>
          {value}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        minimumDate={new Date()}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}
