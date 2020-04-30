import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import {Button} from './Button';
import {Input} from './Input';
import {SmartView} from './SmartView';
import {Date} from './DatePicker';
import {addMilk, getAnimal} from '../redux/actions/Index';
import {literRegex} from '../validations/Index';
import { MYModal } from './Modal';
import { tsPropertySignature } from '@babel/types';

function EditMilk(props) {
  const milkReducerState = useSelector(state => state.milk);
  const [milkPM, setMilkPM] = useState(props.milkPM);
  const [milkAM, setMilkAM] = useState(props.milkAM);
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [date, setDate] = useState(props.date);
  const buttonDisable = validate(milkAMError, milkPMError, date);
  const dispatch = useDispatch();
  const milkAMRef = useRef();
  const milkPMRef = useRef();
  const dateRef = useRef();
  const animalRef = useRef();

  useEffect(() => {
          
  }, []);

  const callApi = () => {
    const postBodyEditMilk = {
      milk: [
        {date, milkProduceAM: milkAM, milkProducePM: milkPM == '' ? 0 : milkPM},
      ],
    };
    const payload = {
      postBodyEditMilk,
      animalTagId,
    };
    console.log(payload, 'PostMilkBody');
    dispatch(addMilk(payload));

    milkAMRef.current.clear();
    milkPMRef.current.clear();
    dateRef.current.clear();
    animalRef.current.clear();
  };


  return (
    <MYModal>
    <SmartView style={addMilkStyles.container}>
      <View style={addMilkStyles.form}>
        <Date
          date={date}
          ref={dateRef}
          onDateChange={date => {
            setDate(date);
          }}
        />

        <Input
          label={'Milk Produce AM'}
          keyboardType={'number-pad'}
          maxLength={2}
          ref={milkAMRef}
          value={milkAM}
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
          keyboardType={'number-pad'}
          required={false}
          maxLength={2}
          ref={milkPMRef}
          value={milkPM}
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
  </MYModal> 
  );
}

function validate(milkAMError, milkPMError, date) {
  if (!milkAMError && !milkPMError && date !== '') return false;
  else return true;
}

export {EditMilk};

const addMilkStyles = {
  container: {
    width:'95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width:'95%',
    paddingHorizontal: 20,

    
  },
};
