import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../common/Button';
import DashedLine from 'react-native-dashed-line';
import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../../assets/fonts';
import {responsiveScale} from '../../utils';
import {
  depositCollection,
  getBanks,
  getTreasurers,
  uploadImage,
} from '../../api';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {action} from 'mobx';
import ImageUploader from '../../common/ImageUploader';
import Input from '../../common/Input';
import {uploadFile} from '../../utils/uploadFile';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const DepositConfirm = ({navigation, route}) => {
  const {depositMode, cashInHand} = route.params;
  const [loadingCount, setLoadingCount] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [amount, setAmount] = useState(10);
  const [selectList, setSelectList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  const [images, setImages] = useState(
    route?.params?.images ? route?.params?.images : [],
  );

  const setSelectedImages = action(images => {
    setImages(images);
  });

  const onPressCollapse = () => {
    setCollapsed(prevCollapse => !prevCollapse);
  };

  const onProceed = () => {
    if (!amount || !depositMode || !selected) {
      showMessage({
        message: 'Validation Error',
        description: 'Please select a deposit type and enter a valid amount',
      });
      return false;
    }
    setConfirm(true);
  };

  const onConfirm = async () => {
    let attachments = [];
    if (images?.length) {
      showMessage({
        message: 'Uploading in Progress',
        description: 'Please hold on while we upload the attachment',
        autoHide: false,
      });
      attachments = await Promise.all(
        images.map(async image => {
          return uploadFile(image);
          // let formData = new FormData();
          // formData.append('fileName', {
          //   uri: image?.uri,
          //   name: 'Deposit.jpeg',
          //   type: image?.type,
          // });
          // try {
          //   let {data} = await uploadImage(formData);
          //   return {uri: data, imgname: image?.id + '-deposit'};
          // } catch (error) {
          //   setSubmitLoader(false);
          //   showMessage({
          //     message: 'Oops! Something went wrong',
          //     description: 'Failed to upload the image. Please try again later',
          //   });
          //   return false;
          // }
        }),
      );
      hideMessage();
    }

    try {
      const body = {
        deposited_to: depositMode,
        selectedId: selected,
        deposit_amount: amount,
        images: JSON.stringify(attachments),
      };

      let {data} = await depositCollection(body);
      Alert.alert(
        'Deposit - Success',
        'Collection deposited successfully',
        [
          {
            text: 'Ok',
            onPress: () => {
              navigation.navigate('Deposit');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Failed to add the deposit. Please try again later',
      });
    }
  };

  const onSelect = obj => {
    setSelected(obj?.id);
    if (depositMode === 'Treasurer') {
      setSelectedItem(obj?.firstname);
    }
    if (depositMode === 'Bank' || depositMode === 'ATM') {
      setSelectedItem(obj?.name);
    }
  };

  useEffect(() => {
    getDatas(true);
  }, []);

  const getDatas = async (intial = false) => {
    if (depositMode === 'Treasurer') {
      try {
        let {data} = await getTreasurers();
        setSelectList(data);
      } catch (error) {
        showMessage({
          message: 'Oops! Something went wrong',
          description: 'Failed to fetch the trasurers. Please try again later',
        });
      }
    }
    if (depositMode === 'Bank' || depositMode === 'ATM') {
      try {
        let {data} = await getBanks();
        setSelectList(data);
      } catch (error) {
        showMessage({
          message: 'Oops! Something went wrong',
          description: 'Failed to fetch the banks. Please try again later',
        });
      }
    }
  };

  return (
    <View
      style={[
        commonStyles.container,
        {
          paddingHorizontal: responsiveScale(10),
          borderTopWidth: 1,
          borderTopColor: colors.backgroundSecondary,
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.card,
          paddingTop: responsiveScale(15),
        }}>
        <CountBox
          loading={loadingCount}
          countSmall={'SAR ' + cashInHand}
          color={colors.primaryLight}
          textColor={colors.primary}
          label={'Cash in Hand'}
          textAlign={'center'}
        />
      </View>

      <View style={{backgroundColor: colors.card, height: height}}>
        <TouchableOpacity
          onPress={onPressCollapse}
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            borderRadius: responsiveScale(10),

            marginTop: responsiveScale(15),

            paddingTop: responsiveScale(4),
            backgroundColor: colors.backgroundSecondary,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: responsiveScale(6),
              marginVertical: responsiveScale(8),
            }}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/bank.png')}
              style={{
                height: responsiveScale(20),
                width: responsiveScale(20),
                tintColor: colors.primary,
                marginHorizontal: responsiveScale(10),
              }}
            />

            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: responsiveScale(13),
                flex: 1,
                textAlign: 'left',
                color: colors.disableText,

                includeFontPadding: false,
              }}>
              {selected ? selectedItem : 'Select ' + depositMode}
            </Text>
            <View
              style={{
                width: responsiveScale(26),
                height: responsiveScale(26),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: responsiveScale(15),
                  height: responsiveScale(15),
                  borderRadius: responsiveScale(50),
                  backgroundColor: colors.secondary,
                  paddingVertical: responsiveScale(2),
                }}>
                <Feather
                  style={{alignSelf: 'center'}}
                  color={colors.background}
                  size={responsiveScale(10)}
                  name={!collapsed ? 'chevron-down' : 'chevron-up'}
                />
              </View>
            </View>
          </View>
          {collapsed && (
            <View
              style={{
                backgroundColor: colors.secondaryLight,
                borderRadius: responsiveScale(10),
              }}>
              {depositMode === 'Treasurer'
                ? selectList.map(obj => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSelect(obj)}
                        activeOpacity={0.6}
                        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                        style={{
                          backgroundColor:
                            selected === obj?.id
                              ? colors.backgroundSecondary
                              : colors.border,
                          borderBottomLeftRadius: responsiveScale(10),
                          borderBottomRightRadius: responsiveScale(10),
                          paddingHorizontal: responsiveScale(10),
                          paddingVertical: responsiveScale(10),
                        }}>
                        <Text key={obj?.id} style={{includeFontPadding: false}}>
                          {obj?.firstname}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : selectList.map(obj => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSelect(obj)}
                        activeOpacity={0.6}
                        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                        style={{
                          backgroundColor:
                            selected === obj?.id
                              ? colors.backgroundSecondary
                              : colors.border,
                          borderBottomLeftRadius: responsiveScale(10),
                          borderBottomRightRadius: responsiveScale(10),
                          paddingHorizontal: responsiveScale(10),
                          paddingVertical: responsiveScale(10),
                        }}>
                        <Text key={obj?.id} style={{includeFontPadding: false}}>
                          {obj?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
            </View>
          )}
        </TouchableOpacity>

        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{
            marginVertical: responsiveScale(18),
          }}
          dashColor={colors.backgroundSecondary}
        />

        <View style={styles.totalContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.totalLabel}>Amount</Text>
            <View style={{width: '25%'}}>
              <Input value={amount} onChangeText={setAmount} />
            </View>
          </View>
        </View>

        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{
            marginVertical: responsiveScale(10),
          }}
          dashColor={colors.backgroundSecondary}
        />

        <ImageUploader
          images={images}
          confirm={confirm}
          selectedImages={setSelectedImages}
          editable={true}
          label={'Attachments'}
        />

        <View style={styles.submitContainer}>
          {confirm ? (
            <Button onPress={onConfirm}>
              {submitLoader ? (
                <ActivityIndicator color={colors.card} />
              ) : (
                <Text style={commonStyles.buttonLabel}>Confirm</Text>
              )}
            </Button>
          ) : (
            <Button onPress={onProceed}>
              <Text style={commonStyles.buttonLabel}>Proceed</Text>
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  captureImg: {
    width: width * 0.36,
    height: height * 0.14,
    borderRadius: responsiveScale(10),
    overflow: 'hidden',
  },
  submitContainer: {
    paddingVertical: responsiveScale(12),
  },
  totalPriceContainer: {
    flex: 0.35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalPrice: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveScale(13),
    color: colors.primary,
  },
  totalLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(13),
    color: colors.secondary,
    includeFontPadding: false,
  },
  totalContainer: {
    backgroundColor: colors.card,
    borderRadius: responsiveScale(10),
  },
  bank: {
    borderRadius: responsiveScale(10),

    marginTop: responsiveScale(15),

    backgroundColor: colors.primary,
    paddingVertical: responsiveScale(10),
    paddingHorizontal: responsiveScale(15),
  },
});
export default DepositConfirm;
