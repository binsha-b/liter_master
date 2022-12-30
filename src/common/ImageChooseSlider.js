import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageView from 'react-native-image-viewing-rtl';
import {launchCamera} from 'react-native-image-picker';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';
const {colors} = myDefaultTheme;

export default function ImageChooseSlider(props) {
  const [images, setImages] = useState(props?.images ? props.images : []);
  const [imageIndex, setImageIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const chooseFile = async () => {
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

  const onCloseImageView = () => {
    setViewImage(false);
  };

  const onDelete = imageId => {
    Alert.alert(
      'Delete Attachment',
      'Do you want to delete this attachment',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            let tmpImages = images.slice();
            let index = tmpImages.findIndex(m => m.id === imageId);
            if (index >= 0) {
              tmpImages.splice(index, 1);
              setImages(tmpImages);
              props.selectedImages(tmpImages);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View>
      <ImageView
        images={images}
        imageIndex={imageIndex}
        visible={viewImage}
        onRequestClose={onCloseImageView}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.regular,
            fontSize: responsiveScale(12),
            textAlign: 'left',
            flex: 1,
            includeFontPadding: false,
            color: props.error ? colors.primary : colors.secondary,
            ...props.labelStyle,
          }}>
          {props.error ? props.error : props.label}
        </Text>
        {props.editable && (
          <TouchableOpacity
            onPress={chooseFile}
            disabled={loading}
            activeOpacity={0.6}
            hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
            style={{
              width: responsiveScale(80),
              height: responsiveScale(80),
              borderRadius: responsiveScale(8),
              backgroundColor: colors.background,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            {loading ? (
              <ActivityIndicator color={colors.secondary} size="small" />
            ) : (
              <Entypo
                name="camera"
                color={colors.secondary}
                size={responsiveScale(20)}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal={true} style={{height: responsiveScale(80)}}>
        {images.map((i, index) => (
          <TouchableOpacity
            key={i?.id}
            onPress={() => {
              setImageIndex(index);
              setViewImage(true);
            }}
            onLongPress={() => {
              props.editable && onDelete(i?.id);
            }}
            style={{
              width: responsiveScale(80),
              height: responsiveScale(60),
              borderRadius: responsiveScale(10),
              backgroundColor: 'grey',
              marginRight: responsiveScale(10),
              marginTop: responsiveScale(10),
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
}
