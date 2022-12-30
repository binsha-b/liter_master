import React, {forwardRef, memo} from 'react';
import {
  View,
  TextInput,
  I18nManager,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {FONT_FAMILY} from '../assets/fonts';
import Feather from 'react-native-vector-icons/Feather';
import {myDefaultTheme} from '../utils/theme';
import {responsiveFont, responsiveScale} from '../utils';

const {colors} = myDefaultTheme;

const Input = (props, ref) => {
  return (
    <View style={[styles.containerStyle, props?.containerStyle]}>
      {props?.label ? (
        <Text style={styles.labelStyle}>{props?.label}</Text>
      ) : null}
      <View
        pointerEvents={props.disabled ? 'none' : 'auto'}
        style={[styles.inputContainer, props?.inputContainer]}>
        <TextInput
          textAlignVertical="center"
          scrollEnabled={false}
          {...props}
          onChange={({nativeEvent: {text}}) =>
            props?.onChange?.(props?.id, text)
          }
          ref={ref}
          placeholderTextColor="rgba(0,0,0,0.3)"
          style={[styles.inputStyle, props.inputStyle]}
        />
        {props?.iconName && (
          <Feather
            name={props?.iconName}
            color={colors.backgroundSecondary}
            size={responsiveScale(21)}
          />
        )}
        {props?.rightAccessory}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: responsiveScale(15),
  },
  inputContainer: {
    borderRadius: responsiveScale(8),
    backgroundColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveScale(12),
  },
  inputStyle: {
    flex: 1,
    fontSize: responsiveFont(14),
    fontFamily: FONT_FAMILY.regular,
    paddingVertical: Platform.OS === 'ios' ? 12 : 12 - 5,
    textAlign: 'left',
    color: colors?.text,
    includeFontPadding: false,
  },
  labelStyle: {
    fontFamily: FONT_FAMILY.regular,
    color: colors.text,
    fontSize: responsiveFont(12),
    includeFontPadding: false,
    paddingBottom: responsiveScale(8),
    textAlign: 'left',
  },
});

const forwardRefInput = forwardRef(Input);
export default memo(forwardRefInput);
