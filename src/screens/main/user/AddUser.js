import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, SmartView} from '../../../components/Index';
import {addUser} from '../../../redux/actions/Index';
import {usernameRegex, passwordRegex} from '../../../validations/Index';
import color from '../../../assets/color/Index';

function AddUser() {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userReducerState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const callApi = () => {
    const payload = {
      userName: username,
      password: password,
    };

    dispatch(addUser(payload));
    usernameRef.current.clear();
    passwordRef.current.clear();
  };

  return (
    <SmartView>
      <Input
        autoCapitalize={'none'}
        containerStyles={addMilkStyles.container}
        label={'User Name'}
        maxLength={16}
        ref={usernameRef}
        value={username}
        placeholder={'Enter Username'}
        errorMessage={'Username only contain letters'}
        onChangeText={(value) => setUsername(value)}
        error={(error) => {
          setUsernameError(error);
        }}
        regex={usernameRegex}
      />

      <Input
        autoCapitalize={'none'}
        containerStyles={addMilkStyles.container}
        label={'Password'}
        maxLength={16}
        ref={passwordRef}
        value={password}
        placeholder={'Enter Password'}
        errorMessage={'Password characters is not correct '}
        onChangeText={(value) => setPassword(value)}
        error={(error) => {
          setPasswordError(error);
        }}
        regex={passwordRegex}
      />

      <View style={addMilkStyles.policyContainer}>
        <Text style={addMilkStyles.policyContainerText}>
          Password contains at least six character of uppercase lowercase and
          number
        </Text>
      </View>

      <Button
        loading={userReducerState.userLoading}
        error={[usernameError, passwordError]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export {AddUser};

const addMilkStyles = {
  policyContainer: {
    height: 50,
    justifyContent: 'center',
    width: '90%',
  },
  policyContainerText: {
    color: color.black,
    fontWeight: 'bold',
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
