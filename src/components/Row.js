import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';

function Row(props) {
  return (
    <View style={rowStyles.container}>
      <View style={rowStyles.columnOne}>
        <Text style={rowStyles.label}>{props.label}</Text>
      </View>

      <View style={rowStyles.columnTwo}>
      <Text style={rowStyles.value}>{props.value}</Text>
      </View>
    </View>
  );
}

export {Row};

const rowStyles = {
  label:{color: color.black},
  value:{color: color.black},

  container: {
    width: '90%',
    flexDirection: 'row',
    minHeight: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  columnOne: {
    width: '40%',
    justifyContent: 'center',
  },
  columnTwo: {
    width: '60%',
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
