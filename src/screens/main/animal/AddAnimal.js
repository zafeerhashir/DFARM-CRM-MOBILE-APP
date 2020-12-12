import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SmartView, Date } from '../../../components/Index';
import { addAnimal } from '../../../redux/actions/Index';
import { animalTagRegex, literRegex, charactersRegex } from '../../../validations/Index';
import {currentDate} from './../../../conversions/Index';


function AddAnimal() {
  const [animalTag, setAnimalTag] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(true);
  const [origin, setOrigin] = useState('');
  const [originError, setOriginError] = useState(true);
  const [animalTagError, setAnimalTagError] = useState('');
  const [date, setDate] = useState(currentDate());

  const animalReducerState = useSelector(state => state.animal);
  const dispatch = useDispatch();
  const animalTagRef = useRef();
  const priceRef = useRef();
  const originRef = useRef();
  const dateRef = useRef();



  const callApi = () => {
    const payload = {
      tag: animalTag,
      purchaseDate: date,
    };

    if(origin !== ''){
      payload.origin = origin
    }

    if(price !== ''){
      payload.price = price
    }


    dispatch(addAnimal(payload));
    animalTagRef.current.clear();
    priceRef.current.clear();
    priceRef.current.clear();
    originRef.current.clear();
  };

  return (
    <SmartView>

      <Date
        date={date}
        ref={dateRef}
        onDateChange={date => {
          setDate(date);
        }}
      />

      <Input
        containerStyles={addMilkStyles.container}
        label={'Animal Tag'}
        maxLength={8}
        ref={animalTagRef}
        value={animalTag}
        placeholder={'Enter Animal Tag'}
        errorMessage={'Animal Tag only contain letters and numbers '}
        onChangeText={value => setAnimalTag(value)}
        error={error => {
          setAnimalTagError(error);
        }}
        regex={animalTagRegex}
      />

      <Input
        label={'Origin'}
        required={false}
        ref={originRef}
        value={origin}
        placeholder={'Enter Origin'}
        errorMessage={'Name must be in alphabets'}
        onChangeText={(value) => setOrigin(value)}
        error={(error) => {
          setOriginError(error);
        }}
        regex={charactersRegex}
      />

      <Input
        label={'Price'}
        keyboardType={'number-pad'}
        required={false}
        maxLength={8}
        ref={priceRef}
        value={price}
        placeholder={'Enter Price'}
        errorMessage={'Price must be in a number'}
        onChangeText={(value) => setPrice(value)}
        error={(error) => {
          setPriceError(error);
        }}
        regex={literRegex}
      />

      <Button
        loading={animalReducerState.animalLoading}
        error={[animalTagError,]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export { AddAnimal };

const addMilkStyles = {
  container: {
    marginTop: 30,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
};
