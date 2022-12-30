import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {responsiveScale} from '../utils';
import Feather from 'react-native-vector-icons/Feather';
import {myDefaultTheme} from '../utils/theme';
import {launchCamera} from 'react-native-image-picker';
import {FONT_FAMILY} from '../assets/fonts';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const ImageUploader = props => {
  const [images, setImages] = useState(props?.images ? props.images : []);
  const [loading, setLoading] = useState(false);

  const onPressUpload = async () => {
    const options = {
      title: 'Select Attachment',
      quality: 0.4,
    };
    //setLoading(true);

    let image = await launchCamera(options, response => {
      if (response.didCancel || response.errorCode || response.errorMessage) {
        setLoading(false);
      } else {
        const {uri, type} = response?.assets?.[0];

        const imageId = new Date().getTime();
        let source = {
          uri,
          id: imageId.toString(),
          uploaded: false,
          type,
        };
        let tmpImages = [...images, source];
        setImages(tmpImages);
        setLoading(false);
        props.selectedImages(tmpImages);
      }
    });
  };
  return (
    <View
      style={{
        borderRadius: responsiveScale(10),

        marginTop: responsiveScale(10),

        backgroundColor: colors.backgroundSecondary,
        paddingVertical: responsiveScale(5),
        paddingHorizontal: responsiveScale(5),
      }}>
      <TouchableOpacity
        onPress={onPressUpload}
        activeOpacity={0.6}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.attachmentContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/attachment.png')}
            style={{
              height: responsiveScale(18),
              width: responsiveScale(18),
              tintColor: colors.primary,
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: responsiveScale(13),
              includeFontPadding: false,
              flex: 1,
              textAlign: 'left',
              color: colors.disableText,
              marginHorizontal: responsiveScale(10),
            }}>
            {props?.label}
          </Text>
          {!props?.confirm && (
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
                  name={'plus'}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        style={{
          marginBottom: responsiveScale(10),
        }}>
        {images.map((i, index) => (
          <TouchableOpacity
            key={i?.id}
            style={{
              width: width * 0.26,
              height: height * 0.12,
              borderRadius: responsiveScale(10),
              backgroundColor: colors.secondary,
              marginTop: responsiveScale(10),
              marginHorizontal: responsiveScale(5),
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: i?.uri}}
              style={{height: '100%', width: '100%'}}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  attachmentContainer: {
    borderRadius: responsiveScale(10),
    paddingHorizontal: responsiveScale(5),
    paddingTop: responsiveScale(10),
    backgroundColor: colors.backgroundSecondary,
    flexDirection: 'column',
  },
});
export default ImageUploader;
