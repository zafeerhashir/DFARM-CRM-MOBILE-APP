import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import color from '../assets/color/Index';

function Button(props) {


  return (
    <TouchableOpacity
      style={[buttonStyles.container, props.disabled &&  buttonStyles.disabled ]}
      disabled={props.disabled}
      onPress={props.onPress}>
      <Text style={buttonStyles.title}>{props.title}</Text>
    </TouchableOpacity>
  );

}

export {Button};

const buttonStyles = {
  container: {
    width: '100%',
    backgroundColor: color.black,
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled:{
    backgroundColor: color.grey,

  },
  title: {
    color: color.white,
  },
};
