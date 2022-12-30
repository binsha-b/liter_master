import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, Platform, StyleSheet, I18nManager} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveFont, responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;

export default function DropDownSelect(props) {
  const [open, setOpen] = useState(false);

  const {t} = useTranslation();

  return (
    <View
      style={{
        ...(Platform.OS !== 'android' && {
          zIndex: props?.zIndex || 1,
        }),
      }}>
      {props?.label ? (
        <Text
          style={{
            fontFamily: FONT_FAMILY['SFPro-Regular'],
            fontSize: responsiveScale(12),
            color: colors.text,
            textAlign: 'left',
            includeFontPadding: false,
            marginTop: responsiveScale(5),
            ...props?.labelHeadStyle,
          }}>
          {props?.label}
        </Text>
      ) : null}

      <DropDownPicker
        maxHeight={responsiveScale(110)}
        dropDownDirection={'BOTTOM'}
        zIndex={5000}
        zIndexInverse={1000}
        open={open}
        setOpen={setOpen}
        arrowColor={colors.primary}
        placeholder={props?.value ? props?.value : props?.label}
        listMode={'SCROLLVIEW'}
        selectedLabelStyle={styles.selectedLabelStyle}
        containerStyle={{minHeight: responsiveScale(48)}}
        placeholderStyle={[styles.placeholderStyle, props?.placeholder]}
        style={[styles.ddStyle, props?.ddStyle]}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        // scrollViewProps={{showsVerticalScrollIndicator: false}}
        dropDownContainerStyle={styles.dropDownStyle}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectedLabelStyle: {
    fontSize: responsiveFont(14),
    textAlign: 'left',
    fontFamily: FONT_FAMILY.regular,
    color: colors.text,
  },
  placeholderStyle: {
    fontSize: responsiveFont(12),
    textAlign: 'left',
    fontFamily: FONT_FAMILY.regular,
    color: colors.text,
  },
  ddStyle: {
    borderTopRightRadius: responsiveScale(8),
    borderTopLeftRadius: responsiveScale(8),
    borderBottomRightRadius: responsiveScale(8),
    borderBottomLeftRadius: responsiveScale(8),
    borderColor: colors.border,
    backgroundColor: colors.border,
    marginBottom: responsiveScale(15),
  },
  dropDownStyle: {
    backgroundColor: colors.border,
    borderColor: colors.borderSecondary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  labelStyle: {
    flex: 1,
    fontSize: responsiveFont(14),
    fontFamily: FONT_FAMILY.regular,
    paddingVertical: Platform.OS === 'ios' ? 12 : 12 - 5,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: colors?.text,
    includeFontPadding: false,
  },
});
