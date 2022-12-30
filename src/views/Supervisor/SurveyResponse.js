import React, {useLayoutEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing-rtl';
import {commonStyles} from '../../utils/commonStyles';
import moment from 'moment';
import {API_URL, responsiveScale} from '../../utils';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const keyExtractor = item => item;

const questionKeyExtractor = item => item.id.toString();

const ButtonLabel = ({label = '', selected = false, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: responsiveScale(70),
        borderRadius: responsiveScale(5),
        paddingHorizontal: responsiveScale(3),
        alignItems: 'center',
        borderWidth: 1,
        borderColor:
          label === 'Bad' || label === 'No'
            ? colors.primaryLight
            : colors.buttonSuccess,
        backgroundColor:
          label === 'Bad' || label === 'No'
            ? colors.primaryLight
            : colors.buttonSuccess,
        marginHorizontal: responsiveScale(15),
        onPress: {onPress},
      }}>
      <Text
        style={{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: responsiveScale(14),
          color: colors.text,
          includeFontPadding: false,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const SurveyAnswers = React.memo(({title, questions}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const renderItem = ({item, index}) => {
    const imagesArray =
      item?.images.length && item?.images[0] === '['
        ? JSON.parse(item.images)
        : [];

    const onCloseImageView = () => {
      setViewImage(false);
    };

    return (
      <View style={{marginBottom: responsiveScale(10)}}>
        <ImageView
          images={imagesArray}
          imageIndex={imageIndex}
          visible={viewImage}
          onRequestClose={onCloseImageView}
        />
        <View style={{paddingHorizontal: responsiveScale(15)}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: responsiveScale(16),
                color: colors.text,
                textAlign: 'left',
                includeFontPadding: false,
              }}>
              {item?.question_category}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.secondaryLight,

              paddingTop: responsiveScale(15),
              paddingBottom: responsiveScale(5),
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: responsiveScale(12),
                color: colors.text,
                textAlign: 'left',
                includeFontPadding: false,
              }}>
              {item?.question}
            </Text>
            {item?.buttonValue ? (
              <ButtonLabel label={item?.buttonValue} />
            ) : (
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: responsiveScale(12),
                  color: colors.primaryLight,
                  marginLeft: responsiveScale(10),
                  includeFontPadding: false,
                }}>
                {' '}
                Not Answered{' '}
              </Text>
            )}
          </View>
          <View style={{marginBottom: responsiveScale(10)}}>
            <ScrollView
              contentContainerStyle={{
                paddingTop: responsiveScale(20),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {imagesArray.map((m, index) => (
                <TouchableOpacity
                  key={m?.id}
                  onPress={() => {
                    setImageIndex(index);
                    setViewImage(true);
                  }}
                  style={{
                    width: width / 2.2 - responsiveScale(14),
                    height: height * 0.14,
                    borderRadius: responsiveScale(10),
                    backgroundColor: 'grey',
                    marginRight: responsiveScale(10),
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: m?.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View
              style={{
                paddingHorizontal: responsiveScale(0),
                marginTop: responsiveScale(15),
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: responsiveScale(12),
                  color: colors.secondary,
                  marginTop: responsiveScale(3),
                  includeFontPadding: false,
                }}>
                {item?.notes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingBottom: responsiveScale(15)}}>
      <View>
        <FlatList
          keyExtractor={questionKeyExtractor}
          data={questions}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
});
const SurveyResponse = ({navigation, route}) => {
  const {details} = route.params;

  const _renderItem = ({item}) => {
    return (
      <View
        style={{
          paddingLeft: responsiveScale(10),
          paddingTop: responsiveScale(5),
        }}>
        <SurveyAnswers
          title={item}
          questions={details?.survey_response[item]}
        />
      </View>
    );
  };

  const printReport = () => {
    navigation.navigate('PDFViewer', {
      uri: `${API_URL}get_survey_response?survey_id=${details?.survey_id}`,
    });
  };

  let surveyQuestions = useMemo(
    () => Object.keys(details?.survey_response),
    [details?.survey_response],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: details?.station_name,
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        onPress={printReport}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.printIcon}>
        <AntDesign
          name="printer"
          color={colors.card}
          size={responsiveScale(30)}
        />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{paddingBottom: responsiveScale(15)}}
        data={surveyQuestions}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.7}}>
                <Text style={styles.textStationName}>
                  {details?.station_name}
                </Text>
              </View>
              <View style={styles.headerSection}>
                <Image
                  style={styles.dateIcon}
                  source={require('../../assets/icons/date.png')}
                />
                <Text style={styles.textDate}>
                  {moment(details?.date).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.textNormal}>
                {'Station Code'} : {details?.station_code}
              </Text>
            </View>
          </View>
        }
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: responsiveScale(15),
    backgroundColor: colors.secondary,
    paddingHorizontal: responsiveScale(15),
    borderRadius: responsiveScale(10),
    paddingVertical: responsiveScale(20),
    width: '90%',
    alignSelf: 'center',
  },
  headerSection: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStationName: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: responsiveScale(13),
    color: colors.card,
    includeFontPadding: false,
  },
  textNormal: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(11),
    textAlign: 'left',
    color: colors.secondaryLight,
    includeFontPadding: false,
  },
  textDate: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.secondaryLight,
    includeFontPadding: false,
    textAlign: 'left',
    marginLeft: responsiveScale(5),
  },
  dateIcon: {
    height: responsiveScale(12),
    width: responsiveScale(12),
    tintColor: colors.secondaryLight,
  },
  printIcon: {
    position: 'absolute',
    bottom: responsiveScale(30),
    right: responsiveScale(20),
    width: responsiveScale(45),
    height: responsiveScale(45),
    borderRadius: responsiveScale(50),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
export default SurveyResponse;
