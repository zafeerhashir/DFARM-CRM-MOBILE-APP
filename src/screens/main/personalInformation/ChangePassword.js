import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import {Button, Date, Input, SmartView} from '../../../components/Index';
import {changePassword, logout} from '../../../redux/actions/Index';
import {passwordRegex} from '../../../validations/Index';
import {currentDate} from './../../../conversions/Index';

function ChangePassword({navigation}) {
  const personalInformationReducerState = useSelector(
    (state) => state.personalInformation,
  );
  const onBoardingReducerState = useSelector((state) => state.onBoarding);

  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const callApi = () => {
    const postBodyPersonalInformation = {
      password: newPassword,
    };
    const payload = {
      postBodyPersonalInformation,
      userId: onBoardingReducerState.user._id,
    };

    newPasswordRef.current.clear();
    confirmPasswordRef.current.clear();
    dispatch(changePassword(payload));
    dispatch(logout());
  };

  return (
    <SmartView>
      <Input
        autoCapitalize={'none'}
        containerStyles={addPersonalInformationStyles.container}
        label={'New Password'}
        maxLength={16}
        ref={newPasswordRef}
        value={newPassword}
        placeholder={'Enter New Password'}
        errorMessage={'Password consists of at least six letters and numbers '}
        onChangeText={(value) => setNewPassword(value)}
        error={(error) => {
          setNewPasswordError(error);
        }}
        regex={passwordRegex}
      />

      <Input
        autoCapitalize={'none'}
        label={'Confirm Password'}
        maxLength={16}
        ref={confirmPasswordRef}
        value={confirmPassword}
        placeholder={'Enter Confirm Password'}
        errorMessage={'Password does not match'}
        onChangeText={(value) => setConfirmPassword(value)}
        error={(error) => {
          setConfirmPasswordError(error);
        }}
        regex={new RegExp(`${newPassword}`)}
      />

      <View style={addPersonalInformationStyles.policyContainer}>
        <Text style={addPersonalInformationStyles.policyContainerText}>
          Password contains at least six character of uppercase lowercase and
          number
        </Text>
      </View>

      <Button
        loading={personalInformationReducerState.personalInformationLoading}
        error={[newPasswordError, confirmPasswordError]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export {ChangePassword};

const addPersonalInformationStyles = {
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
