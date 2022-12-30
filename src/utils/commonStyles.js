import {Dimensions, Platform, StyleSheet} from 'react-native';
import {responsiveFont, responsiveScale} from '.';
import {FONT_FAMILY} from '../assets/fonts';
import {myDefaultTheme} from './theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  labelText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveFont(1),
    color: colors.text,
  },
  titleText: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveFont(20),
    color: colors.text,
  },
  buttonLabel: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveScale(15),
    color: colors.background,
    includeFontPadding: false,
  },
  headerStyle: {
    backgroundColor: colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerRightContainerStyle: {
    paddingRight: responsiveScale(10),
  },
  headerLeftContainerStyle: {
    paddingLeft: Platform.OS === 'ios' ? responsiveScale(10) : 0,
  },
  noShadow: {
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveFont(15),
    color: colors.text,
  },
  flashDescription: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveFont(13),
    textAlign: 'left',
  },
  flashTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveFont(14),
    marginBottom: responsiveScale(2),
    textAlign: 'left',
    lineHeight: responsiveFont(19),
  },
  loaderContainer: {
    padding: responsiveScale(8),
    backgroundColor: colors.card,
    borderRadius: 100,
    alignSelf: 'center',
    shadowColor: 'rgba(162, 170, 184, 0.8)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  bottomStyleModal: {
    marginHorizontal: 0,
    flex: 1,
    marginBottom: 0,
    justifyContent: 'flex-end',
  },
  whiteButton: {
    backgroundColor: colors.card,
    paddingHorizontal: responsiveScale(16),
    paddingVertical: responsiveScale(10),
    borderRadius: responsiveScale(4),
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  whiteButtonLabel: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveFont(14),
    textTransform: 'uppercase',
    color: colors.primary,
  },
  shadow: {
    elevation: 4,
    shadowColor: colors.text2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 15,
    shadowOpacity: 0.1,
  },
  notifContainer: {
    elevation: 4,
    shadowColor: colors.text2,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 15,
    shadowOpacity: 0.1,
    height: responsiveScale(45),
    width: responsiveScale(45),
    backgroundColor: colors.background2,
    borderRadius: responsiveScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    padding: responsiveScale(8),
    backgroundColor: colors.background,
    borderRadius: 100,
    alignSelf: 'center',
    shadowColor: 'rgba(162, 170, 184, 0.8)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: responsiveFont(13),
    fontFamily: FONT_FAMILY.regular,
    color: colors.text,
    textAlign: 'center',
    lineHeight: responsiveScale(17),
    opacity: 0.5,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: height,
  },
  cardDetailLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(11),
    textAlign: 'left',
    includeFontPadding: false,
    color: colors.textSecondary,
  },
  cardDetailValue: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(14),
    textAlign: 'left',
    includeFontPadding: false,
    color: colors.text,
  },
});
