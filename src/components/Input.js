import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {Text, TextInput, View, TouchableWithoutFeedback} from 'react-native';
import color from '../assets/color/Index';
import {requireFieldValidator} from '../validations/Index';
import styles, {shadow} from '../assets/styles/Index';

function IInput(props, ref) {
  const [value, setValue] = useState(String(props.value));
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useImperativeHandle((props, ref), () => ({
    clear: () => {
      props.onChangeText('');
      setValue('');
    },
  }));

  useEffect(() => {
    setValue(props.value);
    onChangeTextValidation(props.value);
  }, [props.value]);

  const onChangeRowInput = async (v = null) => {
    setValue(v);
    onChangeTextValidation(v);
  };

  const onChangeTextValidation = async (v = null) => {
    var regex = new RegExp(props.regex);
    var _requireFieldValidator;

    // not using required Filed Validator
    if (props.required == false) {
      // _requireFieldValidator = true // let validator in the if clause
      if ((await requireFieldValidator(v)) == false) {
        // this.setState({error: false});
        setError(false);
        await props.onChangeText(
          props.defaultValue == undefined ? v : props.defaultValue,
        );
        await props.error(false);
        return;
      } else {
        _requireFieldValidator = await requireFieldValidator(v);
      }
    } else {
      _requireFieldValidator = await requireFieldValidator(v);
    }

    var regexValidator = regex.test(v);

    if (_requireFieldValidator) {
      setError(false);
      setValue(v);
      (await !props.displayOnly) && props.onChangeText(v);
      await props.error(false);

      // if regex have
      if (props.regex) {
        if (regexValidator) {
          setError(false);
          setValue(v);
          (await !props.displayOnly) && props.onChangeText(v);
          await props.error(false);
        } else {
          setError(true);
          await props.error(true);
          setErrorMessage(props.errorMessage);
        }
      }
    } else {
      setError(true);
      setErrorMessage('*');
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
    <View style={[inputStyles.container, props.containerStyles]}>
      <View style={[inputStyles.labelContainer, props.labelContainerStyles]}>
        <Text style={inputStyles.label}>{props.label}</Text>
      </View>
      <View style={inputStyles.inputContainer}>
        {props.displayOnly == true ? (
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={inputStyles.input}>
              {value == '' ? (
                <Text style={inputStyles.placeholderText}>
                  {props.placeholder}
                </Text>
              ) : (
                <Text style={inputStyles.displayOnlyValue}>{value}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TextInput
            autoCapitalize={props.autoCapitalize}
            secureTextEntry={props.secureTextEntry}
            style={[inputStyles.input, props.inputStyles]}
            keyboardType={props.keyboardType}
            onChangeText={(value) => onChangeRowInput(value)}
            onFocus={props.onFocus}
            placeholder={props.placeholder}
            placeholderTextColor={
              props.placeholderTextColor == undefined
                ? color.black
                : props.placeholderTextColor
            }
            value={String(value)}
            maxLength={props.maxLength}
          />
        )}
      </View>
      <View style={inputStyles.errorContainer}>
        {props.showError != false && (
          <Text style={inputStyles.error}>{error && errorMessage}</Text>
        )}
      </View>
    </View>
  );
}

export const Input = forwardRef(IInput);

const inputStyles = {
  label: {
    color: color.black,
  },

  displayOnlyValue: {
    paddingLeft: 5,
    color: color.black,
  },
  placeholderText: {
    color: color.grey,
    paddingLeft: 5,
  },

  container: {
    width: '90%',
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
    backgroundColor: color.white,
  },

  inputContainer: {
    height: 20,
    justifyContent: 'center',
    width: '100%',
  },

  errorContainer: {
    minHeight: 30,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
  input: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: color.white,

    ...shadow,
  },
  error: {
    color: color.red,
  },
};
