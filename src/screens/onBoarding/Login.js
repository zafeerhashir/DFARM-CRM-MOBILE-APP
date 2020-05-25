import React, {useRef, useState} from 'react';
import {ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../assets/color/Index';
import {shadow} from '../../assets/styles/Index';
import {Button, Input, SmartView} from '../../components/Index';
import {passwordRegex, usernameRegex} from '../../conversions/Index';
import {login} from '../../redux/actions/Index'
const imagePath = require('../../assets/img/loginbackground.png');

function Login() {
  const onBoardingReducerState = useSelector(state => state.onBoarding);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const usernameRef = useRef();
  const passwordRef = useRef();


  const callApi = () => {
    const postBodyLogin = {
      userName: username,
      password: password,
    };
    const payload = postBodyLogin;
    dispatch(login(payload));
  };

  return (
    <SmartView
    extraScrollHeight={false}
    >
      <ImageBackground
        source={imagePath}
        style={onBoardingStyles.image}>
        <Input
          autoCapitalize={'none'}
          containerStyles={onBoardingStyles.containerStyles}
          inputStyles={onBoardingStyles.inputStyles}
          labelContainerStyles={onBoardingStyles.labelContainerStyles}
          label={'Username'}
          showError={false}
          maxLength={20}
          ref={usernameRef}
          value={username}
          placeholder={'Enter Username'}
          onChangeText={value => setUsername(value)}
          placeholderTextColor={color.white}
          error={error => {
            setUsernameError(error);
          }}
          regex={usernameRegex}
        />

        <Input
          autoCapitalize={'none'}
          secureTextEntry={true}
          containerStyles={onBoardingStyles.containerStyles}
          inputStyles={onBoardingStyles.inputStyles}
          labelContainerStyles={onBoardingStyles.labelContainerStyles}
          label={'Password'}
          showError={false}
          maxLength={20}
          ref={passwordRef}
          value={password}
          placeholder={'Enter Password'}
          onChangeText={value => setPassword(value)}
          placeholderTextColor={color.white}
          error={error => {
            setPasswordError(error);
          }}
          regex={passwordRegex}
        />

        <Button
          loading={onBoardingReducerState.onBoardingLoading}
          error={[usernameError, passwordError]}
          title={'Login'}
          onPress={() => callApi()}
        />
      </ImageBackground>
    </SmartView>
  );
}

export {Login};

const onBoardingStyles = {
  fadingContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
  label: {},

  displayOnlyValue: {
    paddingLeft: 5,
  },
  placeholderText: {
    paddingLeft: 5,
  },

  containerStyles: {
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    height: 110,
    backgroundColor: 'transparent',
  },

  labelContainerStyles: {
    height: 20,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },

  inputContainerStyles: {
    height: 20,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },

  errorContainer: {
    minHeight: 30,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
  inputStyles: {
    height: 55,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    opacity: 1,
    color: color.white,
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...shadow,
  },
  error: {},

  image: {
    flexGrow: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    marginTop: 30,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
};
