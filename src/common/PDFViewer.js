import React, {useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {commonStyles} from '../utils/commonStyles';
import Pdf from 'react-native-pdf';
import {showMessage} from 'react-native-flash-message';
import {myDefaultTheme} from '../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import {HIT_SLOP, responsiveScale} from '../utils';
import Share from 'react-native-share';
import userStore from '../stores/userStore';

const {width} = Dimensions.get('window');
const {colors} = myDefaultTheme;

const PDFViewer = ({route, navigation}) => {
  const {user} = userStore;
  const {uri, title = 'Survey Response'} = route?.params;
  const [filePath, setFilePath] = useState('');

  const onError = error => {
    showMessage({
      message: 'Oops! Something went wrong',
      description: '' + error,
      type: 'danger',
    });
  };

  const onLoadComplete = (numberOfPages, fPath) => {
    setFilePath(fPath);
  };

  const onShareUrl = () => {
    Share.open({
      failOnCancel: false,
      title: title,
      message: title,
      url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
    })
      .then(res => {
        console.warn(res);
      })
      .catch(err => {
        err && console.warn(err);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerShown: true,
      headerTitleStyle: {
        ...commonStyles.headerTitle,
        width: width * 0.5,
        textAlign: 'center',
      },
      headerRight: () =>
        filePath ? (
          <TouchableOpacity
            onPress={onShareUrl}
            activeOpacity={0.6}
            hitSlop={HIT_SLOP}>
            <Feather
              name="share-2"
              color={colors.text}
              size={responsiveScale(21)}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, filePath]);

  return (
    <View style={commonStyles.container}>
      <Pdf
        source={{
          uri: uri,
          headers: {
            Authorization: `Bearer ${user?.api_token}`,
          },
        }}
        trustAllCerts={Platform.OS == 'android' ? false : true}
        enableRTL
        renderActivityIndicator={() => (
          <ActivityIndicator color={colors.primary} />
        )}
        onError={onError}
        onLoadComplete={onLoadComplete}
        style={styles.pdf}
      />
    </View>
  );
};

export default PDFViewer;

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
  },
});
