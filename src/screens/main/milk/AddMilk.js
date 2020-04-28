import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput} from 'react-native';
import {
  Input,
  Button,
  Date,
  SmartView,
  MaterialDropdown,
} from '../../../components/Index';
import {literRegex} from '../../../validations/Index';
import color from '../../../assets/color/Index';
import {useSelector, useDispatch} from 'react-redux';
import {addMilk, getMilk, getAnimal} from '../../../redux/actions/Index';
import {thisTypeAnnotation} from '@babel/types';

function AddMilk() {
  const milkReducerState = useSelector(state => state.milk);
  const animalReducerState = useSelector(state => state.animal);

  const [animalTagId, setAnimalTagId] = useState('');
  const [milkAM, setMilkAM] = useState('');
  const [milkPM, setMilkPM] = useState(0);
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [date, setDate] = useState('');
  const buttonDisable = validate(milkAMError, milkPMError, date);
  const dispatch = useDispatch();
  const milkAMRef = useRef();
  const milkPMRef = useRef();
  const dateRef = useRef();
  const animalRef = useRef();


  const inputMilkPM = useRef(null);

  useEffect(() => {
    dispatch(getAnimal());
  },[]);

  const callApi = () => {
    const postBodyAddMilk = {
      milk: [{date, milkProduceAM: milkAM, milkProducePM: milkPM == '' ? 0 : milkPM}],
    };
    const payload ={
      postBodyAddMilk,
      animalTagId
    }
    console.log(payload,'PostMilkBody')
    dispatch(addMilk(payload));

    milkAMRef.current.clear();
    milkPMRef.current.clear();
    dateRef.current.clear();
    animalRef.current.clear();
  };

  return (
    <SmartView loading={milkReducerState.milkLoading}>
      <View style={addMilkStyles.form}>
        <Date
          date={date}
          ref={dateRef}
          onDateChange={date => {
            setDate(date);
          }}
        />

        {console.log(animalReducerState.animalData,'animalData')}
        <MaterialDropdown
          ref={animalRef}
          label={'Animal'}
          placeholder={'Select Animal'}
          onChangeText={value => setAnimalTagId(value)}
          data={animalReducerState.animalData}
          valueExtractor={values => values._id}
          labelExtractor={values => values.tag}
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
    justifyContent: 'center',
    backgroundColor: color.white,
  },
  form: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:0
  },
};
