import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import color from '../assets/color/Index';
import styles,{shadow} from '../assets/styles/Index';


function Button(props) {
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    validate();
  }, [props.error]);


  const validate =  () =>
  {
    const error = [];
    for (let e of props.error) {
      if (e == false) {
         error.push(e);
      }
      
    }
    if (error.length == props.error.length)      
    setDisable(false);
    else setDisable(true)
  }


  return (
    <TouchableOpacity
      style={[buttonStyles.container]}
      disabled={disable}
      onPress={props.onPress}>
      {props.loading ? (
        <ActivityIndicator color={color.black} size="large" />
      ) : (
        <Text style={[buttonStyles.title, disable && buttonStyles.disabled]}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export {Button};

const buttonStyles = {
  container: {
    width: '90%',
    backgroundColor: color.tealDarkGreen,
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow


  },
  disabled: {
    color: color.lightGrey,
  },
  title: {
    color: color.black,
  },
};
