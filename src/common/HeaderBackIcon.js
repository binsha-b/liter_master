import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const HeaderBackIcon = ({icon, color = ''}) => {
  return (
    <Feather
      name={icon}
      color={myDefaultTheme.colors.background}
      size={responsiveScale(23)}
      style={{
        backgroundColor: myDefaultTheme.colors.primary,
        borderRadius: responsiveScale(16),
      }}
    />
  );
};

export default HeaderBackIcon;
