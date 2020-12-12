import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import color from '../../../assets/color/Index';
import {Button, Date, Input, SmartView} from '../../../components/Index';
import {
  addMilk,
  searchMilkAnimalTag,
  selectAnimalTagItem,
} from '../../../redux/actions/Index';
import {literRegex} from '../../../validations/Index';
import {currentDate} from './../../../conversions/Index';

function AddMilk({navigation}) {
  const milkReducerState = useSelector(state => state.milk);
  const [milkAM, setMilkAM] = useState('');
  const [milkPM, setMilkPM] = useState('');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(currentDate());
  const dispatch = useDispatch();
  const [rateError, setRateError] = useState(true);
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [animalTagError, setAnimalTagError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const rateRef = useRef();
  const milkAMRef = useRef();
  const milkPMRef = useRef();
  const dateRef = useRef();
  const animalTagRef = useRef();

  const callApi = () => {
    const postBodyAddMilk = {
      date,
      milkProduceAM: milkAM,
      milkProducePM: milkPM === '' ? 0 : milkPM,
      rate:  rate === '' ? 1 : rate,
      animal: milkReducerState.selectAnimalTagItem.id ,
    };
    
    if(milkReducerState.selectAnimalTagItem.id == ''){
      delete postBodyAddMilk.animal
    }

    milkAMRef.current.clear();
    milkPMRef.current.clear();
    dispatch(addMilk(postBodyAddMilk));
    dispatch(selectAnimalTagItem({tag: '', id: ''}));
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
        displayOnly={true}
        label={'Animal Tag'}
        ref={animalTagRef}
        value={milkReducerState.selectAnimalTagItem.tag}
        placeholder={'Select Animal Tag'}
        onChangeText={value => searchMilkAnimalTag(value)}
        onPress={() => navigation.navigate('Animal Tag')}
        errorMessage={'The value must be numeric'}
        error={error => {
          setAnimalTagError(error);
        }}
      />

      <Input
        label={'Morning Milk'}
        keyboardType={'number-pad'}
        maxLength={8}
        ref={milkAMRef}
        value={milkAM}
        placeholder={'Enter Morning Milk'}
        errorMessage={'Morning Milk must be in seer'}
        onChangeText={value => setMilkAM(value)}
        error={error => {
          setMilkAMError(error);
        }}
        regex={literRegex}
      />


      <Input
        label={'Evening Milk'}
        keyboardType={'number-pad'}
        required={false}
        maxLength={8}
        ref={milkPMRef}
        value={milkPM}
        placeholder={'Enter Evening Milk'}
        errorMessage={'Evening Milk must be in seer'}
        onChangeText={value => setMilkPM(value)}
        error={error => {
          setMilkPMError(error);
        }}
        regex={literRegex}
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
        regex={literRegex}
      />

      <Button
        loading={milkReducerState.milkLoading}
        error={[milkAMError, milkPMError, rateError]}
        title={'Submit'}
        onPress={() => callApi()}
      />
    </SmartView>
  );
}

export {AddMilk};
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
