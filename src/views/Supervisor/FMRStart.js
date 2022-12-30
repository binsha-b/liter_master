import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '../../common/DateTimePicker';

import DropDownSelect from '../../common/DropDownSelect';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/Input';
import {responsiveScale} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import ImageChooseSlider from '../../common/ImageChooseSlider';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';

import {format} from 'date-fns';
import moment from 'moment';
import {addFmr, getCategory, getIssutypes} from '../../api';
import {showMessage} from 'react-native-flash-message';

const {colors} = myDefaultTheme;

const cat = [
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'},
];

const FMRStart = ({navigation, route}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingIssue, setLoadingIssue] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState([]);
  const [issues, setIssues] = useState([]);

  let issueRef = useRef(null);

  useEffect(() => {
    getCategory()
      .then(res => {
        const data = res.data.map(c => {
          return {
            ...c,
            label: c.category_name,
            value: c.id,
          };
        });
        setLoadingCategory(false);

        setCategories(data);
      })
      .catch(() => {
        setLoadingCategory(false);
        showMessage({
          type: 'failed',
          message: 'Oops! Something went wrong',
          description: 'Failed to get category list. Please try again later',
        });
      });
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      setLoadingIssue(true);
      setIssues([]);
      // issueRef.current.reset();
      // setSelectedIssue(null);

      getIssutypes({category: selectedCategory})
        .then(res => {
          const data = res.data.map(c => {
            return {
              ...c,
              label: c.issue_type,
              value: c.id,
            };
          });

          setIssues(data);
          setLoadingIssue(false);
        })
        .catch(err => {
          setLoadingIssue(false);
          showMessage({
            type: 'failed',
            message: 'Oops! Something went wrong',
            description: 'Failed to get issue type. Please try again later',
          });
        });
    }
  }, [selectedCategory]);

  const onSubmit = async () => {
    const body = {
      category: selectedCategory,
      priority: selectedPriority,
      issue_type: selectedIssue,
      notes,
      images: selectedImages,
      station_id: route?.params?.stationID,
    };

    try {
      let {data} = await addFmr(body);

      if (data?.status === 'Success') {
        showMessage({
          message: t('feedback.addTicket'),
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: data?.message,
          type: 'danger',
        });
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      showMessage({
        message: 'failed',
        description: '' + error,
        type: 'danger',
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.stationName,
    });
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: responsiveScale(15),
        }}>
        <DropDownSelect
          zIndex={5000}
          zIndexInverse={3000}
          items={categories}
          value={selectedCategory}
          setValue={setSelectedCategory}
          onChangeItem={item => setSelectedCategory(item)}
          placeholder={'Category'}
        />

        <DropDownSelect
          zIndex={4000}
          zIndexInverse={4000}
          items={issues}
          value={selectedIssue}
          setValue={setSelectedIssue}
          onChangeItem={item => setSelectedIssue(item)}
          placeholder={'Issue Type'}
        />
        <DropDownSelect
          zIndex={3000}
          zIndexInverse={5000}
          items={[
            {
              label: 'High',
              value: 'High',
            },
            {
              label: 'Low',
              value: 'Low',
            },
          ]}
          value={selectedPriority}
          setValue={setSelectedPriority}
          placeholder={'Priority'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: responsiveScale(15),
          }}>
          <View style={{flex: 0.48}}>
            <DateTimePicker
              placeHolder={
                startDate ? format(new Date(startDate), 'dd-MM-yyyy') : 'Date'
              }
              mode="date"
              onChooseDate={date => setStartDate(date)}
              value={format(new Date(startDate), 'dd-MM-yyyy')}
              icon="ios-calendar-sharp"
            />
          </View>
          <View style={{flex: 0.48}}>
            <DateTimePicker
              placeHolder={time ? format(new Date(time), 'hh:mm a') : 'Time'}
              mode="time"
              onChooseDate={time => setTime(time)}
              value={format(new Date(time), 'hh:mm a')}
              icon="md-time-sharp"
            />
          </View>
        </View>

        <Input
          label={'Add Notes'}
          multiline={true}
          numberOfLines={5}
          placeholder={'Type here....'}
          inputStyle={{minHeight: responsiveScale(110)}}
          textAlignVertical="top"
          onChangeText={setNotes}
          value={notes}
        />

        <ImageChooseSlider
          selectedImages={images => setSelectedImages(images)}
          editable={true}
        />
        <Button onPress={onSubmit}>
          <Text style={commonStyles.buttonLabel}>Submit</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default FMRStart;
const styles = StyleSheet.create({
  sectionContainer: {
    // width: '100%',
  },
});
