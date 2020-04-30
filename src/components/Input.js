import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {Text, TextInput, View} from 'react-native';
import color from '../assets/color/Index';
import {requireFieldValidator} from '../validations/Index';

function IInput(props, ref) {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useImperativeHandle((props, ref), () => ({
    clear: () => {
      props.onChangeText('');
      onChangeRowInput();
      setValue('');
    },
  }));

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChangeRowInput = async (v = null) => {
    setValue(v);
    onChangeTextValidation(v)

  }

  const onChangeTextValidation = async (v = null) => {


    var regex = new RegExp(props.regex);
    var requireField;

    // not using required Filed Validator
    if (props.required == false) {
      // requireField = true // let validator in the if clause
      if ((await requireFieldValidator(v)) == false) {
        // this.setState({error: false});
        setError(false);
        await props.onChangeText(
          props.defaultValue == undefined ? v : props.defaultValue,
        );
        await props.error(false);
        return;
      } else {
        requireField = await requireFieldValidator(v);
      }
    } else {
      requireField = await requireFieldValidator(v);
    }

    var regexValidator = regex.test(v);

    if (requireField) {
      setError(false);
      setValue(v);
      await props.onChangeText(v);
      await props.error(false);

      if (regexValidator) {
        setError(false);
        setValue(v);
        await props.onChangeText(v);
        await props.error(false);
      } else {
        setError(true);
        await props.error(true);
        setErrorMessage(props.errorMessage);
      }
    } else {
      setError(true);
      setErrorMessage('This field is required');
      await props.error(true);
    }

    //     if (maxRange) {
    //       setError(false);
    //       await props.onChangeText(value);
    //       await props.error(false);
    //     } else {
    //       setError(true);
    //     //   setErrorMessage('This value range is ');
    //       await props.error(true);
    //     }
  };

  const maxRange = async () => {
    if (props.maxRange == undefined) {
      return await true;
    } else {
      if (parseFloat(value, 3) <= parseFloat(props.maxRange, 3)) {
        return await true;
      } else {
        return await false;
      }
    }
  };

  return (
    <View style={inputStyles.container}>
      <View style={inputStyles.labelContainer}>
        <Text>{props.label}</Text>
      </View>
      <View style={inputStyles.inputContainer}>
        <TextInput
          style={inputStyles.input}
          keyboardType={props.keyboardType}
          onChangeText={value => onChangeRowInput(value)}
          //   onFocus={onChangeRowInput(value)}
          placeholder={props.placeholder}
          value={value}
          maxLength={props.maxLength}
        />
      </View>
      <View style={inputStyles.errorContainer}>
        <Text style={inputStyles.error}>{error && errorMessage}</Text>
      </View>
    </View>
  );
}

export const Input = forwardRef(IInput);

const inputStyles = {
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    height: 110,
    backgroundColor: color.white,
  },

  labelContainer: {
    height: 20,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },

  inputContainer: {
    height: 30,
    justifyContent: 'center',
    width: '100%',
  },

  errorContainer: {
    height: 30,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
  input: {
    height: 45,
    borderWidth: 0,
    width: '100%',
    borderBottomWidth: 0.5,
    borderWidth: 0,
  },
  error: {
    color: color.red,
  },
};
