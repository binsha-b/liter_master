import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import Button from '../../common/Button';
import {commonStyles} from '../../utils/commonStyles';
import {responsiveScale} from '../../utils';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {submitSurvey, uploadImage} from '../../api';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const SurveyConfirm = ({navigation, route}) => {
  // const [imageIndex, setImageIndex] = useState(0);
  // const [viewImage, setViewImage] = useState(false);
  const {stationName} = route.params;
  const [submitLoader, setSubmitLoader] = useState(false);

  // const onCloseImageView = () => {
  //   setViewImage(false);
  // };
  const onSubmit = async () => {
    setSubmitLoader(true);
    let surveyResponse = {};
    await Promise.all(
      Object.keys(route?.params?.details).map(async ques => {
        surveyResponse[ques] = await Promise.all(
          route?.params?.details[ques].map(async s => {
            let images = [];
            if (s?.images?.length) {
              showMessage({
                message: 'Uploading in Progress',
                description: 'Please hold on while we upload the attachment',
                autoHide: false,
              });
              images = await Promise.all(
                s.images.map(async image => {
                  let formData = new FormData();
                  formData.append('fileName', {
                    uri: image?.uri,
                    name: 'Survey.jpeg',
                    type: image?.type,
                  });
                  try {
                    let {data} = await uploadImage(formData);
                    return {uri: data, imgname: image?.id + '-survey'};
                  } catch (error) {
                    setSubmitLoader(false);
                    showMessage({
                      message: 'Oops! Something went wrong',
                      description:
                        'Failed to upload the image. Please try again later',
                    });
                    return false;
                  }
                }),
              );
              hideMessage();
            }
            return {
              ...s,
              question_id: s.id,
              label_answer: s.buttonValue,
              notes: s.notes,
              images: JSON.stringify(images),
            };
          }),
        );
      }),
    );
    const body = {
      station_id: route?.params?.stationID,
      survey_response: JSON.stringify(surveyResponse),
      surveyType: route?.params?.surveyType,
    };

    try {
      let {data} = await submitSurvey(body);
      if (typeof data === 'string') {
        Alert.alert(
          `Survey - ${data} Submitted`,
          `Your survey no ${data} has been submitted successfully`,
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Survey');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Failed to submit the survey',
          "Sorry we could'nt submit your survey. Please try again!",
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: true},
        );
      }
      setSubmitLoader(false);
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Failed to submit the  survey. Please try again later',
      });
      setSubmitLoader(false);
    }

    // submitSurvey(body)
    //   .then(res => {
    //     if (typeof res?.data === 'string') {
    //       Alert.alert(
    //         `Survey - ${res?.data} Submitted`,
    //         `Your survey no ${res?.data} has been submitted successfully`,
    //         [
    //           {
    //             text: 'Ok',
    //             onPress: () => {
    //               navigation.navigate('Survey');
    //             },
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //     } else {
    //       Alert.alert(
    //         'Failed to submit the survey',
    //         "Sorry we could'nt submit your survey. Please try again!",
    //         [
    //           {
    //             text: 'Ok',
    //           },
    //         ],
    //         {cancelable: true},
    //       );
    //     }
    //     setSubmitLoader(false);
    //   })
    //   .catch(err => {
    //     showMessage({
    //       message: 'Oops! Something went wrong',
    //       description: 'Failed to submit the  survey. Please try again later',
    //     });
    //     setSubmitLoader(false);
    //   });
  };

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
            label === 'Good' || label === 'Yes'
              ? colors.primaryLight
              : colors.backgroundSecondary,
          backgroundColor:
            label === 'Good' || label === 'Yes'
              ? colors.primaryLight
              : colors.backgroundSecondary,
          marginHorizontal: responsiveScale(15),
          onPress: {onPress},
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: responsiveScale(14),
            color:
              label === 'Good' || label === 'Yes'
                ? colors.primary
                : colors.secondary,
            includeFontPadding: false,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const questionCategories = useMemo(
    () => Object.keys(route?.params?.details),
    [route?.params?.details],
  );

  let questions = route?.params?.details[questionCategories?.[0]];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
    });
  }, [navigation]);

  const _renderItems = useCallback(({item}) => {
    let question = route?.params?.details?.[item];

    return (
      <View
        style={{
          paddingLeft: responsiveScale(10),
          paddingTop: responsiveScale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text numberOfLines={2} style={styles.questionCategory}>
            {question?.[0]?.question_category}
          </Text>
        </View>
        <View style={styles.questionDetails}>
          <Text numberOfLines={2} style={styles.question}>
            {question?.[0]?.question}
          </Text>
          {question?.[0]?.buttonValue ? (
            <ButtonLabel label={question?.[0]?.buttonValue} />
          ) : (
            <Text style={styles.textNormal}>Not Answered </Text>
          )}
        </View>
        <View style={{marginBottom: responsiveScale(10)}}>
          {/* <ImageView
            images={imagesArray}
            imageIndex={imageIndex}
            visible={viewImage}
            onRequestClose={onCloseImageView}
          /> */}
          <ScrollView
            contentContainerStyle={{
              paddingTop: responsiveScale(20),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {question?.[0]?.images.map((m, index) => (
              <TouchableOpacity
                key={m?.id}
                // onPress={() => {
                //   setImageIndex(index);
                //   setViewImage(true);
                // }}
                style={styles.imageContainer}>
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
            <Text style={styles.notes}>{question?.[0]?.notes}</Text>
          </View>
        </View>
      </View>
    );
  }, []);

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
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: responsiveScale(10)}}
        data={questionCategories}
        // keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListFooterComponent={
          <View
            style={{
              paddingHorizontal: responsiveScale(10),
              marginTop: responsiveScale(25),
            }}>
            <Button onPress={onSubmit} disabled={submitLoader}>
              {submitLoader ? (
                <ActivityIndicator color={colors.card} />
              ) : (
                <Text style={commonStyles.buttonLabel}>Submit</Text>
              )}
            </Button>
          </View>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  questionCategory: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: responsiveScale(16),
    color: colors.text,
    textAlign: 'left',
    includeFontPadding: false,
  },
  questionDetails: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryLight,

    paddingTop: responsiveScale(15),
    paddingBottom: responsiveScale(5),
  },
  question: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.text,
    textAlign: 'left',
    includeFontPadding: false,
  },
  textNormal: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.primaryLight,
    marginLeft: responsiveScale(10),
    includeFontPadding: false,
  },
  notes: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.secondary,
    marginTop: responsiveScale(3),
    includeFontPadding: false,
  },
  imageContainer: {
    width: width / 2.2 - responsiveScale(14),
    height: height * 0.14,
    borderRadius: responsiveScale(10),
    backgroundColor: 'grey',
    marginRight: responsiveScale(10),
    overflow: 'hidden',
  },
});
export default SurveyConfirm;
