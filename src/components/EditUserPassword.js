import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import styles,{shadow} from '../assets/styles/Index';
import { editUserPasswordVisible, getUser, editUserPassword } from '../redux/actions/Index';
import {passwordRegex} from '../validations/Index';
import {Button} from './Button';
import {Input} from './Input';
import {MYModal} from './Modal';

function EditUserPassword(props) {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const userReducerState = useSelector(state => state.user);


  useEffect(() => {}, []);

  const callApi = () => {
    const postBodyEditUserPassword = {
      password: password,
    };

    const payload = {
        postBodyEditUserPassword,
        userId:userReducerState.selectedUser.userId,
    };
    dispatch(editUserPasswordVisible(payload))
    dispatch(getUser());
  };


  return (
    <MYModal>
      <View style={editUserStyles.modalView}>
        <View style={editUserStyles.dismissRow}>
          <TouchableOpacity
            style={editUserStyles.dismissTextContainer}
            onPress={() => dispatch(editUserPasswordVisible({visible: false}))}>
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        <Input
        autoCapitalize={'none'}
        label={'Password'}
        maxLength={16}
        value={password}
        placeholder={'Enter Password'}
        errorMessage={'Password characters is not correct '}
        onChangeText={value => setPassword(value)}
        error={error => {
          setPasswordError(error);
        }}
        regex={passwordRegex}
      />

        <Button
          loading={userReducerState.changeUserPasswordLoading}
          error={[passwordError]}
          title={'Edit'}
          onPress={() => callApi()}
        />
      </View>
    </MYModal>
  );
}


export {EditUserPassword};

const editUserStyles = {
  modalView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    ...shadow

  },
  dismissRow: {
    borderWidth: 0,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissTextContainer: {
    borderWidth: 0,
    height: 35,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: styles.borderRadius,
  },
};
