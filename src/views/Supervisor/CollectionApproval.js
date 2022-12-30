import React, {useLayoutEffect, useState} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {changeCollectionStatus} from '../../api';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import Input from '../../common/Input';
import {responsiveScale} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const CollectionApproval = ({navigation, route}) => {
  const {stationName, Details, title} = route.params;
  const paymentsArray =
    Details?.payment_method.length && Details?.payment_method[0] === '['
      ? JSON.parse(Details?.payment_method)
      : [];

  const toApprove = () => {
    navigation.replace('CollectionApproval', {
      stationName: stationName,
      Details,
      title: 'Confirm',
    });
  };
  const changeStatus = async status => {
    try {
      const body = {tr_id: Details?.id, status};

      let {data} = await changeCollectionStatus(body);
      if (data === 'Success') {
        Alert.alert(
          `Collection - ${status}`,
          'Collection submitted successfully',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Collection');
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description:
          'Failed to change the collection status. Please try again later',
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
    });
  }, [navigation]);

  return (
    <View
      style={[
        commonStyles.container,
        {
          backgroundColor: colors.card,
          height: height,
          borderTopWidth: 1,
          borderTopColor: colors.backgroundSecondary,
        },
      ]}>
      <View
        style={{
          padding: responsiveScale(15),
        }}>
        <View style={styles.collectionCode}>
          <Text style={styles.boldText}>{Details?.tr_code}</Text>
        </View>

        <View style={styles.totalContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.normalText}>Date</Text>
            </View>
            <View style={styles.normalContainer}>
              <Text style={styles.normalText}>{Details?.added_date}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: responsiveScale(10)}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.normalText}>Location</Text>
            </View>
            <View style={styles.normalContainer}>
              <Text style={styles.normalText}>Saudi Arabia</Text>
            </View>
          </View>
        </View>

        <View style={styles.collectionContainer}>
          {paymentsArray.map(p => {
            return (
              <View key={p?.id} style={styles.collectionMode}>
                <View style={{flex: 0.7, marginBottom: 10}}>
                  <Text style={styles.cashLabel}>{p?.method}</Text>
                </View>
                <View style={styles.cashContainer}>
                  <View style={styles.cashButton}>
                    <Text style={styles.cashAmount}>{p?.amount}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.totalContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.totalLabel}>Total Amount(SAR)</Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>{Details?.total_amount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.description}>
          <Input
            disabled={true}
            inputStyle={{
              minHeight: responsiveScale(90),
              marginTop: responsiveScale(5),
            }}
            multiline={true}
            numberOfLines={5}
            label={'Description'}
            placeholder={'Type here...'}
            value={Details?.notes}
            textAlignVertical="top"
          />
        </View>

        {Details?.status !== 'Collected' && (
          <View style={styles.buttonContainer}>
            {title === 'Confirm' && (
              <View style={{width: '100%'}}>
                <Button onPress={() => changeStatus('Collected')}>
                  <Text
                    style={(styles.buttonSubmit, {color: colors.background})}>
                    Confirm
                  </Text>
                </Button>
              </View>
            )}

            {title === 'Approval' && (
              <>
                <View style={{width: '50%'}}>
                  <Button onPress={toApprove}>
                    <Text
                      style={(styles.buttonSubmit, {color: colors.background})}>
                      Approve
                    </Text>
                  </Button>
                </View>
                <View style={{width: '50%', marginLeft: responsiveScale(15)}}>
                  <Button
                    onPress={() => changeStatus('Rejected')}
                    buttonStyle={{backgroundColor: colors.secondaryLight}}>
                    <Text
                      style={(styles.buttonSubmit, {color: colors.secondary})}>
                      Reject
                    </Text>
                  </Button>
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(14),
    includeFontPadding: false,
  },
  buttonContainer: {
    backgroundColor: colors.card,
    borderRadius: responsiveScale(10),

    flexDirection: 'row',
  },
  description: {
    backgroundColor: colors.card,
    borderRadius: responsiveScale(10),
  },
  totalPriceContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalPrice: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveScale(13),
    color: colors.primary,
    includeFontPadding: false,
  },
  totalLabel: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: responsiveScale(13),
    color: colors.secondary,
    includeFontPadding: false,
  },
  totalContainer: {
    backgroundColor: colors.card,

    borderRadius: responsiveScale(10),
    paddingVertical: responsiveScale(20),
  },
  cashAmount: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    alignSelf: 'center',
    color: colors.card,
    includeFontPadding: false,
  },
  cashButton: {
    backgroundColor: colors.textSecondary,
    borderRadius: responsiveScale(10),
    paddingVertical: responsiveScale(8),
    width: '100%',
    alignSelf: 'center',
  },
  cashContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cashLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.secondary,
    includeFontPadding: false,
  },
  collectionMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveScale(10),
    paddingVertical: responsiveScale(4),
  },
  collectionContainer: {
    backgroundColor: colors.border,
    paddingHorizontal: responsiveScale(15),
    borderRadius: responsiveScale(10),
    paddingTop: responsiveScale(10),

    overflow: 'hidden',
  },
  normalText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.secondary,
    includeFontPadding: false,
  },
  normalContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: responsiveScale(14),
    color: colors.secondary,
    includeFontPadding: false,
  },
  collectionCode: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: responsiveScale(10),
    paddingVertical: responsiveScale(10),
    alignSelf: 'center',
    paddingHorizontal: responsiveScale(80),
  },
});
export default CollectionApproval;
