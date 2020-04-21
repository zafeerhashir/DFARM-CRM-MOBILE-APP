import React, {useState, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {Input, Button, Date, SmartView} from '../../../components/Index';
import {literRegex} from '../../../validations/Index';
import color from '../../../assets/color/Index';
import {useSelector, useDispatch} from 'react-redux';
import {addMilk} from '../../../redux/actions/Index';
import { thisTypeAnnotation } from '@babel/types';

function AddMilk() {
  const [username, setUsername] = useState('');
  const [milkAM, setMilkAM] = useState('');
  const [milkPM, setMilkPM] = useState('');
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [date, setDate] = useState('');
  const buttonDisable = validate(milkAMError, milkPMError, date);
  const dispatch = useDispatch();
  const milk = useSelector(state => state.milk);

  // useEffect(() => {
  //   dispatch({type:"GET_MILK_START"});
  // });

  const callApi = () => {
    const postBodyAddMilk = {
      milk: [{date, milkProduceAM: milkAM, milkProducePM: milkPM}],
    };
    dispatch(addMilk(postBodyAddMilk));
    if(milk.loading == false)
    {
      setMilkPM('')
      setMilkAM('')
      setDate('')
    }
  };

  return (
    <SmartView loading={milk.loading}>
      <View style={addMilkStyles.form}>
        <Date
          onDateChange={date => {
            setDate(date);
          }}
        />
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
          onPress={() => callApi()}
        />
      </View>
    </SmartView>
  );
}

function validate(milkAMError, milkPMError, date) {
  if (!milkAMError && !milkPMError && date !== '') return false;
  else return true;
}

export {AddMilk};

export {Date};

const addMilkStyles = {
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.white,
  },
  form: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
