import React, { useRef, useState } from 'react';
import { ImageBackground} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SmartView } from '../../components/Index';
import { passwordRegex, usernameRegex } from '../../conversions/Index';
import { login } from '../../redux/actions/Index';
import { shadow } from '../../assets/styles/Index'
function Login({navigation}) {
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
      username,
      password,
    };
    const payload = postBodyLogin;

    usernameRef.current.clear();
    passwordRef.current.clear();
    dispatch(login(payload));
  };

  return (

    <SmartView>

    <ImageBackground source={require('../../assets/img/logo.png')} style={onBoardingStyles.image} >

      <Input
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
        error={error => {
          setUsernameError(error);
        }}
        regex={usernameRegex}
      />

      <Input
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
        error={error => {
          setPasswordError(error);
        }}
        regex={passwordRegex}
      />

      <Button
        loading={onBoardingReducerState.onBoardLoading}
        error={[usernameError, passwordError]}
        title={'Login'}
        onPress={() => navigation.navigate('MainDrawer')}
      />
      </ImageBackground>

    </SmartView>
  );
}

export { Login };

const onBoardingStyles = {

  label:{
   },
 
   displayOnlyValue:{
     paddingLeft:5
   },
   placeholderText: {
     paddingLeft:5
 
   },
 
   containerStyles: {
     width: '90%',
     justifyContent: 'space-between',
     alignItems: 'center',
     borderWidth: 0,
     height: 110,
     backgroundColor:''
     
   },
 
   labelContainerStyles: {
     height: 20,
     justifyContent: 'center',
     width: '100%',
     borderWidth: 0,
     backgroundColor:''
 
   },
 
   inputContainerStyles: {
     height: 20,
     justifyContent: 'center',
     width: '100%',
     backgroundColor:''

 
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
     borderRadius:5,
     backgroundColor:'',
     ...shadow

 
 
 
   },
   error: {
   },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems:'center',
    width:'100%'
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
