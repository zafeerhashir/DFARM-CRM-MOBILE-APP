import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../../assets/color/Index';
import { Button, Date, Input, SmartView } from '../../../components/Index';
import {
  addMedicine,
  searchMilkAnimalTag,
  selectAnimalTagItem,
} from '../../../redux/actions/Index';
import { literRegex, charactersRegex } from '../../../validations/Index';
import { currentDate } from './../../../conversions/Index';

function AddMedicine({ navigation }) {
  const medicineReducerState = useSelector((state) => state.medicine);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState(currentDate());
  const [purposeError, setPurposeError] = useState(true);
  const [priceError, setPriceError] = useState(true);
  const [nameError, setNameError] = useState(true);
  const [animalTagError, setAnimalTagError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const purposeRef = useRef();
  const priceRef = useRef();
  const nameRef = useRef();
  const dateRef = useRef();
  const animalTagRef = useRef();
  const dispatch = useDispatch();

  const callApi = () => {
    const postBodyAddMedicine = {
      date,
      price,
      name,
      purpose,
      animal: medicineReducerState.selectAnimalTagItem.id,
    };

    priceRef.current.clear();
    nameRef.current.clear();
    purposeRef.current.clear();

    dispatch(addMedicine(postBodyAddMedicine));
    dispatch(selectAnimalTagItem({ tag: '', id: '' }));
  };

  return (
    <SmartView>
      <Date
        date={date}
        ref={dateRef}
        onDateChange={(date) => {
          setDate(date);
        }}
      />

      <Input
        displayOnly={true}
        label={'Animal Tag'}
        ref={animalTagRef}
        value={medicineReducerState.selectAnimalTagItem.tag}
        placeholder={'Select Animal Tag'}
        onChangeText={(value) => searchMilkAnimalTag(value)}
        onPress={() => navigation.navigate('Animal Tag')}
        errorMessage={'The value must be numeric'}
        error={(error) => {
          setAnimalTagError(error);
        }}
      />

      <Input
        label={'Price'}
        keyboardType={'number-pad'}
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

      <Input
        label={'Name'}
        ref={nameRef}
        value={name}
        placeholder={'Enter Name'}
        errorMessage={'Name must be in alphabets'}
        onChangeText={(value) => setName(value)}
        error={(error) => {
          setNameError(error);
        }}
        regex={charactersRegex}
      />

      <Input
        label={'Purpose'}
        ref={purposeRef}
        value={purpose}
        placeholder={'Enter purpose'}
        errorMessage={'Prupose must be an aplhabets'}
        onChangeText={(value) => setPurpose(value)}
        error={(error) => {
          setPurposeError(error);
        }}
        regex={charactersRegex}
      />

      <Button
        loading={medicineReducerState.medicineLoading}
        error={[priceError, nameError, purposeError, animalTagError]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export { AddMedicine };
export { Date };

const addMilkStyles = {
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
};
