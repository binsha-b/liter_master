import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import DateTimePicker from '../../common/DateTimePicker';

import DropDownSelect from '../../common/DropDownSelect';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/Input';
import {responsiveScale} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import ImageUploader from '../../common/ImageChooseSlider';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';

import {format} from 'date-fns';
import moment from 'moment';
import {submitIncidentReport} from '../../api';
import {showMessage} from 'react-native-flash-message';

const {colors} = myDefaultTheme;

const cat = [
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'},
];

const AddIncidentReport = ({navigation, route}) => {
 
  const [selectedIssue, setSelectedIssue] = useState(null);
 
  const [selectedImages, setSelectedImages] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingIssue, setLoadingIssue] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  
  const [issues, setIssues] = useState([]);

  let issueRef = useRef(null);

 

  const onSubmit = async () => {
    const body = {
        station_id: user?.stations,
        issue_type: issueType,
        date,
        time,
        notes,
        video: JSON.stringify(attachments),
    };

    try {
      let {data} = await submitIncidentReport(body);

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
          zIndex={4000}
          zIndexInverse={4000}
          items={issues}
          value={selectedIssue}
          setValue={setSelectedIssue}
          onChangeItem={item => setSelectedIssue(item)}
          placeholder={'Issue Type'}
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
        <View style={{flex:.8,alignItems:'center',alignContent:'center',textAlignVertical:10}}>
        <ImageUploader
          //images={images}
         /// confirm={confirm}
          selectedImages={setSelectedImages}
          editable={true}
          label={'Attachments'}
        />
        <Image
                  style={{marginLeft:0,}}
                  source={require('../../assets/icons/videoPng.png')}
                /> 
                <ImageBackground>
                <Text style={{ marginLeft:100,marginTop:-20,}}>Add video</Text></ImageBackground>
        </View>
       {/*} <ImageChooseSlider
          selectedImages={images => setSelectedImages(images)}
          editable={true}
            />*/}
        <Button onPress={onSubmit}>
          <Text style={commonStyles.buttonLabel}>Submit</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddIncidentReport;
const styles = StyleSheet.create({
  sectionContainer: {
    // width: '100%',
  },
});
