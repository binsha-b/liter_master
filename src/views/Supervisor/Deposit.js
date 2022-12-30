import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../../assets/fonts';
import {responsiveScale} from '../../utils';
import {collectionCount} from '../../api';
import {useIsFocused} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const Deposit = ({navigation}) => {
  const [loadingCount, setLoadingCount] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [counts, setCounts] = useState({});

  const [mode, setMode] = useState('Bank');

  const focusedScreen = useIsFocused();

  const RadioButton = ({label = '', value = ''}) => {
    const setModeLabel = value => {
      setMode(value);
    };

    return (
      <View
        style={[
          styles.depositMode,
          {
            backgroundColor:
              mode === value ? colors.primary : colors.cardSecondary,
          },
        ]}>
        <TouchableOpacity
          onPress={() => setModeLabel(value)}
          style={{
            flexDirection: 'row',
            borderRadius: responsiveScale(8),
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.onSelect,
              {
                borderColor:
                  mode === value ? colors.card : colors.textSecondary,
              },
            ]}>
            {mode === value && (
              <View
                style={[
                  styles.onSelectRadio,
                  {
                    backgroundColor:
                      mode === value ? colors.card : colors.textSecondary,
                  },
                ]}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.label,
                {color: mode === value ? colors.card : colors.textSecondary},
              ]}>
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const toDepositConfirm = () => {
    navigation.navigate('DepositConfirm', {
      depositMode: mode,
      cashInHand: counts?.collection_in_hand,
    });
  };

  useEffect(() => {
    getDatas(true);
  }, []);

  useEffect(() => {
    if (refreshing && focusedScreen) {
      getDatas();
    }
  }, [refreshing]);

  const getDatas = async (intial = false) => {
    try {
      let {data} = await collectionCount();
      setCounts(data);
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Failed to fetch the counts. Please try again later',
      });
    }
  };
  return (
    <View
      style={[
        commonStyles.container,
        {paddingHorizontal: responsiveScale(10)},
      ]}>
      <TouchableOpacity
        onPress={toDepositConfirm}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.buttonCheck}>
        <Feather name="check" color={colors.card} size={responsiveScale(18)} />
      </TouchableOpacity>
      <>
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            countSmall={counts?.collection_in_hand}
            label={'Cash in Hand'}
            textAlign={'left'}
          />
          <CountBox
            loading={loadingCount}
            countSmall={counts?.total_collection}
            label={'Total Collection'}
            color={colors.primaryLight}
            textColor={colors.primary}
            textAlign={'left'}
          />
        </View>
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            countSmall={counts?.collection_transferred}
            label={'Collection Transferred'}
            textAlign={'center'}
          />
        </View>
      </>
      <View style={styles.depositModeContainer}>
        <RadioButton value={'Bank'} label={'Bank Transfer'} />

        <RadioButton value={'Treasurer'} label={'Treasury Deposit'} />

        <RadioButton value={'ATM'} label={'ATM Transfer'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingTop: responsiveScale(10),
  },
  depositModeContainer: {
    backgroundColor: colors.background,
    height: height,
    paddingVertical: responsiveScale(15),
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
  label: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(14),
    includeFontPadding: false,
  },
  depositMode: {
    marginTop: responsiveScale(15),

    borderRadius: responsiveScale(11),
    paddingVertical: responsiveScale(14),
    paddingHorizontal: responsiveScale(10),
  },
  onSelect: {
    width: responsiveScale(18),
    height: responsiveScale(18),
    borderRadius: responsiveScale(50),
    padding: responsiveScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,

    marginRight: responsiveScale(10),
  },
  onSelectRadio: {
    width: responsiveScale(10),
    height: responsiveScale(10),
    borderRadius: responsiveScale(50),
  },
});

export default Deposit;
