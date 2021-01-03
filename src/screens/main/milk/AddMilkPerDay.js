import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import {Button, Date, Input, SmartView} from '../../../components/Index';
import {
  addMilk,
  searchMilkAnimalTag,
  selectAnimalTagItem,
} from '../../../redux/actions/Index';
import {integerRegex} from '../../../validations/Index';
import {currentDate} from './../../../conversions/Index';

function AddMilkPerDay({navigation}) {
  const milkReducerState = useSelector(state => state.milk);
  const [milkGallonAM, setMilkGallonAM] = useState('');
  const [milkGallonPM, setMilkGallonPM] = useState('');
  const [milkLiterAM, setMilkLiterAM] = useState('');
  const [milkLiterPM, setMilkLiterPM] = useState('');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(currentDate());
  const dispatch = useDispatch();
  const [rateError, setRateError] = useState(true);
  const [milkGallonAMError, setMilkGallonAMError] = useState(true);
  const [milkGallonPMError, setMilkGallonPMError] = useState(true);
  const [milkLiterAMError, setMilkLiterAMError] = useState(true);
  const [milkLiterPMError, setMilkLiterPMError] = useState(true);
  const [animalTagError, setAnimalTagError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const rateRef = useRef();
  const milkGallonAMRef = useRef();
  const milkGallonPMRef = useRef();
  const milkLiterAMRef = useRef();
  const milkLiterPMRef = useRef();
  const dateRef = useRef();
  const animalTagRef = useRef();

  const callApi = () => {
    const postBodyAddMilk = {
      date,
      milkGallonAM: milkGallonAM,
      milkGallonPM: milkGallonPM === '' ? 0 : milkGallonPM,
      milkLiterAM: milkLiterAM,
      milkLiterPM: milkLiterPM === '' ? 0 : milkGallonPM,
      rate:  rate === '' ? 1 : rate,
    };


    milkGallonAMRef.current.clear();
    milkLiterAMRef.current.clear();
    milkGallonPMRef.current.clear();
    milkLiterPMRef.current.clear();
    rateRef.current.clear();

    dispatch(addMilk(postBodyAddMilk));
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
        label={'Morning Milk Maan'}
        keyboardType={'number-pad'}
        maxLength={20}
        ref={milkGallonAMRef}
        value={milkGallonAM}
        placeholder={'Enter Morning Milk In Maan'}
        errorMessage={'Morning Milk must be in maan'}
        onChangeText={value => setMilkGallonAM(value)}
        error={error => {
          setMilkGallonAMError(error);
        }}
        regex={integerRegex}
      />


      <Input
        label={'Evening Milk Maan'}
        keyboardType={'number-pad'}
        required={false}
        maxLength={20}
        ref={milkGallonPMRef}
        value={milkGallonPM}
        placeholder={'Enter Evening Milk In Maan'}
        errorMessage={'Evening Milk must be in maan'}
        onChangeText={value => setMilkGallonPM(value)}
        error={error => {
          setMilkGallonPMError(error);
        }}
        regex={integerRegex}
      />


    <Input
        label={'Morning Milk Seer'}
        keyboardType={'number-pad'}
        maxLength={20}
        ref={milkLiterAMRef}
        value={milkLiterAM}
        placeholder={'Enter Morning Milk In Seer'}
        errorMessage={'Morning Milk must be in seer'}
        onChangeText={value => setMilkLiterAM(value)}
        error={error => {
          setMilkLiterAMError(error);
        }}
        regex={integerRegex}
      />


      <Input
        label={'Evening Milk Seer'}
        keyboardType={'number-pad'}
        required={false}
        maxLength={20}
        ref={milkLiterPMRef}
        value={milkLiterPM}
        placeholder={'Enter Evening Milk In Seer'}
        errorMessage={'Evening Milk must be in seer'}
        onChangeText={value => setMilkLiterPM(value)}
        error={error => {
          setMilkLiterPMError(error);
        }}
        regex={integerRegex}
      />


      <Input
        label={'Rate'}
        keyboardType={'number-pad'}
        required={false}
        maxLength={8}
        ref={rateRef}
        value={rate}
        placeholder={'Enter Rate'}
        errorMessage={'Rate must be in number'}
        onChangeText={value => setRate(value)}
        error={error => {
          setRateError(error);
        }}
        regex={integerRegex}
      />

      <Button
        loading={milkReducerState.milkLoading}
        error={[milkGallonAMError, milkLiterAMError, rateError]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export {AddMilkPerDay};
export {Date};

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
