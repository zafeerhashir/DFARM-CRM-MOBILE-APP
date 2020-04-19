import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {Input, Button, Date} from '../../../components/Index';
import {literRegex} from '../../../validations/Index';
import constants from 'jest-haste-map/build/constants';

function AddMilk() {
  const [username, setUsername] = useState('');
  const [milkAM, setMilkAM] = useState('');
  const [milkPM, setMilkPM] = useState('');
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const buttonDisable = validate(milkAMError, milkPMError);

  return (
    <View>
      
      <Date/>
      <Input
        label={'Milk Produce AM'}
        placeholder={'Enter Milk Produce AM'}
        errorMessage={'The value must be numeric'}
        onChangeText={value => setMilkAM(value)}
        error={error => {
          setMilkAMError(error);
        }}
        regex={literRegex}
      />

      <Input
        label={'Milk Produce PM'}
        placeholder={'Enter Milk Produce PM'}
        errorMessage={'The value must be numeric'}
        onChangeText={value => setMilkPM(value)}
        error={error => {
          setMilkPMError(error);
        }}
        regex={literRegex}
      />

      <Button 
      disabled={buttonDisable} 
      title={'Submit'} 
      />
    </View>
  );
}

function validate(milkAMError, milkPMError) {
  if (!milkAMError && !milkPMError) return false;
  else return true;
}

export {AddMilk};
