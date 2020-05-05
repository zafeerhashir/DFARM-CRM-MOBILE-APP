import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';

function Row(props) {
  return (
    <View style={rowStyles.container}>
      <View style={rowStyles.columnOne}>
        <Text>{props.label}</Text>
      </View>

      <View style={rowStyles.columnTwo}>
      <Text>{props.value}</Text>
      </View>
    </View>
  );
}

export {Row};

const rowStyles = {
  container: {
    width: '90%',
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  columnOne: {
    width: '70%',
    justifyContent: 'center',
  },
  columnTwo: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  disabled: {
    color: color.lightGrey,
  },
  title: {
    color: color.black,
  },
};
