import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import color from '../assets/color/Index';

function Button(props) {


  return (
    <TouchableOpacity
      style={[buttonStyles.container ]}
      disabled={props.disabled}
      onPress={props.onPress}>
      <Text style={[buttonStyles.title,props.disabled &&  buttonStyles.disabled ]}>{props.title}</Text>
    </TouchableOpacity>
  );

}

export {Button};

const buttonStyles = {
  container: {
    width: '100%',
    backgroundColor: color.tealDarkGreen,
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled:{
    color: color.lightGrey,

  },
  title: {
    color: color.black,
  },
};
