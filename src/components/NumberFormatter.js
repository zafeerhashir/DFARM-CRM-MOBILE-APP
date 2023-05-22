import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ImagePropTypes} from 'react-native';
import color from '../assets/color/Index';
import NumberFormat from 'react-number-format';

function NumberFormatter(props) {
  return (
    <NumberFormat
      value={props.value}
      displayType={'text'}
      thousandSeparator={true}
      suffix={props.suffix}
      renderText={(value) => (
        <Text style={numberFormatterStyles.countValue}>{value}</Text>
      )}
    />
  );
}

export {NumberFormatter};

const numberFormatterStyles = {
  countValue: {color: color.black},
};
