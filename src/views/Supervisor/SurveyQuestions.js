import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import {View} from 'react-native-animatable';
import Button from '../../common/Button';
import {myDefaultTheme} from '../../utils/theme';
import StationCheckCard from '../../common/StationCheckCard';
import {getSurveyQuestions} from '../../api';
import {showMessage} from 'react-native-flash-message';
import {observer} from 'mobx-react';
import appStore from '../../stores/appStore';
import {commonStyles} from '../../utils/commonStyles';
import {responsiveScale} from '../../utils';

const {colors} = myDefaultTheme;

const {height} = Dimensions.get('window');

const keyExtractor = item => item;

const SurveyQuestions = ({navigation, route}) => {
  const {surveyType, stationID, stationName} = route.params;
  const {surveyQuestionAnswers, setSurveyQuestionAnswers} = appStore;
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      let {data} = await getSurveyQuestions(stationID, surveyType);
      let sq = {};
      Object.keys(data).forEach(questions => {
        sq[questions] = data[questions].map(s => {
          return {
            ...s,
            images: [],
            notes: '',
            buttonValue: '',
          };
        });
      });

      setSurveyQuestionAnswers(sq);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Please try again later',
      });
    }

    // getSurveyQuestions(stationID, surveyType)
    //   .then(res => {
    //     let sq = {};
    //     Object.keys(res.data).forEach(questions => {
    //       sq[questions] = res.data[questions].map(s => {
    //         return {
    //           ...s,
    //           images: [],
    //           notes: '',
    //           buttonValue: '',
    //         };
    //       });
    //     });

    //     setSurveyQuestionAnswers(sq);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //     showMessage({
    //       message: 'Oops! Something went wrong',
    //       description: 'Please try again later',
    //     });
    //   });
  }, []);

  const checkSurveyValidation = questions => {
    let data = Object.keys(questions).find(ques => {
      let itemData = questions[ques].find(item => {
        return item?.notes && item?.buttonValue && item?.images?.length > 0;
      });
      itemData = itemData ? itemData : {};
      return Object.keys(itemData).length > 0;
    });
    if (data === undefined) {
      Alert.alert('Validation Error', 'Please fill atleast one survey');
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    let passed = checkSurveyValidation(surveyQuestionAnswers);
    if (!passed) {
      return false;
    }
    // setSubmitLoader(true);
    // let surveyResponse = {};

    // await Promise.all(
    //   Object.keys(surveyQuestionAnswers).map(async ques => {
    //     surveyResponse[ques] = await Promise.all(
    //       surveyQuestionAnswers[ques].map(async s => {
    //         let images = [];
    //         if (s?.images?.length) {
    //           showMessage({
    //             message: 'Uploading in Progress',
    //             description: 'Please hold on while we upload the attachment',
    //             autoHide: false,
    //           });

    //           images = await Promise.all(
    //             s.images.map(async image => {
    //               let formData = new FormData();

    //               formData.append('fileName', {
    //                 uri: image?.uri,
    //                 name: 'Survey.jpeg',
    //                 type: image?.type,
    //               });

    //               try {
    //                 let {data} = await uploadImage(formData);
    //                 return {uri: data, imgname: image?.id + '-survey'};
    //               } catch (error) {
    //                 setSubmitLoader(false);
    //                 showMessage({
    //                   message: 'Oops! Something went wrong',
    //                   description:
    //                     'Failed to upload the image. Please try again later',
    //                 });
    //                 return false;
    //               }
    //             }),
    //           );
    //           hideMessage();
    //         }
    //         return {
    //           ...s,
    //           question_id: s.id,
    //           label_answer: s.buttonValue,
    //           notes: s.notes,
    //           images: JSON.stringify(images),
    //         };
    //       }),
    //     );
    //   }),
    // );

    // const body = {
    //   station_id: stationID,
    //   survey_response: JSON.stringify(surveyResponse),
    //   surveyType,
    // };

    navigation.navigate('SurveyConfirm', {
      details: surveyQuestionAnswers,
      stationID,
      stationName,
      surveyType,
    });
  };

  const _renderItems = ({item}) => {
    return (
      <StationCheckCard title={item} questions={surveyQuestionAnswers[item]} />
    );
  };

  let surveyQuestionsAll = useMemo(
    () => Object.keys(surveyQuestionAnswers),
    [surveyQuestionAnswers],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </View>
    );
  }

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
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: responsiveScale(20),
          paddingHorizontal: responsiveScale(15),
        }}
        data={surveyQuestionsAll}
        keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListFooterComponent={
          <View
            style={{
              marginVertical: responsiveScale(25),
            }}>
            <Button onPress={onSubmit}>
              <Text style={commonStyles.buttonLabel}>{'Done'}</Text>
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default observer(SurveyQuestions);
