import React, {memo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import ImageChooseSlider from './ImageChooseSlider';
import Feather from 'react-native-vector-icons/Feather';
import {action} from 'mobx';
import {observer, Observer} from 'mobx-react';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';
import Input from './Input';

const {colors} = myDefaultTheme;

const keyExtractor = item => item.id.toString();

const Button = ({label = '', selected = false, onPress}) => {
  const onPressButton = () => {
    onPress(label);
  };
  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={{
        borderRadius: responsiveScale(5),
        paddingHorizontal: responsiveScale(15),
        paddingVertical: responsiveScale(4),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: selected
          ? colors.primaryLight
          : colors.backgroundSecondary,
        backgroundColor: selected
          ? colors.primaryLight
          : colors.backgroundSecondary,
        marginVertical: responsiveScale(10),
        marginRight: responsiveScale(15),
      }}>
      {selected ? (
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: responsiveScale(14),
            color: colors.primary,
            includeFontPadding: false,
          }}>
          {label}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: responsiveScale(14),
            color: colors.text,
            includeFontPadding: false,
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const StationCheckCard = ({title, questions}) => {
  const [collapsed, setCollapsed] = useState(false);
  const onPressCollapse = () => {
    setCollapsed(prevCollapse => !prevCollapse);
  };

  const renderItem = ({item}) => {
    const onChangeNotes = action(text => {
      item.notes = text;
    });

    const setSelectedImages = action(images => {
      item.images = images;
    });

    const onPressButton = action(value => {
      item.buttonValue = value;
    });

    return (
      <Observer>
        {() => (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.secondaryLight,
              marginTop: responsiveScale(15),
              paddingTop: responsiveScale(15),
              paddingBottom: responsiveScale(5),
            }}>
            <Text
              // numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: responsiveScale(12),
                color: colors.text,
                textAlign: 'left',
                includeFontPadding: false,
              }}>
              {item?.question}
            </Text>

            {item?.question_type === 'Yes/No' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: responsiveScale(10),
                }}>
                <Button
                  selected={item?.buttonValue === item?.response1}
                  onPress={onPressButton}
                  label={item?.response1}
                />
                <Button
                  selected={item?.buttonValue === item?.response2}
                  onPress={onPressButton}
                  label={item?.response2}
                />
              </View>
            )}
            <Input
              inputStyle={{
                minHeight: responsiveScale(90),
                marginTop: responsiveScale(5),
              }}
              style={{width: '100%'}}
              multiline={true}
              numberOfLines={5}
              label={'Notes'}
              placeholder={'Type here...'}
              // value={notes}
              onChangeText={onChangeNotes}
              textAlignVertical="top"
            />
            <View style={{marginTop: responsiveScale(15)}}>
              <ImageChooseSlider
                selectedImages={setSelectedImages}
                editable={true}
                label={'Images'}
              />
            </View>
          </View>
        )}
      </Observer>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPressCollapse}
      activeOpacity={0.6}
      hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
      style={styles.mainCard}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <View style={styles.icon}>
          <Feather
            color={colors.primary}
            size={responsiveScale(20)}
            name={!collapsed ? 'chevron-down' : 'chevron-up'}
          />
        </View>
      </View>
      {collapsed && (
        <FlatList
          keyExtractor={keyExtractor}
          data={questions}
          renderItem={renderItem}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: responsiveScale(13),
    flex: 1,
    textAlign: 'left',
    includeFontPadding: false,
  },
  mainCard: {
    borderRadius: responsiveScale(10),
    borderWidth: 2,
    borderColor: colors.secondaryLight,
    padding: responsiveScale(13),
    marginTop: responsiveScale(15),
  },
  icon: {
    width: responsiveScale(26),
    height: responsiveScale(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(observer(StationCheckCard));
