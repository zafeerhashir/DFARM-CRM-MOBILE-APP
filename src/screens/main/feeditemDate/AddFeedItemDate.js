import React, { useEffect, useRef, useState } from './node_modules/react';
import { useDispatch, useSelector } from './node_modules/react-redux';
import color from '../../../assets/color/Index';
import { Button, Date, Input, SmartView } from '../../../components/Index';
import { addMilk, getAnimalTags, selectAnimalTagItem } from '../../../redux/actions/Index';
import { literRegex } from '../../../validations/Index';
import {agoDate, currentDate, formatDate} from '../../../conversions/Index';



function AddFeedItemDate({navigation}) {
  const milkReducerState = useSelector(state => state.milk);
  const [milkAM, setMilkAM] = useState('');
  const [milkPM, setMilkPM] = useState('');
  const [date, setDate] = useState(currentDate());
  const dispatch = useDispatch();
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [animalTagError,setAnimalTagError]= useState(true);
  const [dateError,setDateError]= useState(true);
  const milkAMRef = useRef();
  const milkPMRef = useRef();
  const dateRef = useRef();
  const animalTagRef = useRef();




  useEffect(() => {
      // dispatch(getAnimalTags())
      const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getAnimalTags())
    });
    return unsubscribe;
  }, [navigation]);

  const callApi = () => {
    const postBodyAddFeedItemDate = {
      milk: [
        {date, milkProduceAM: milkAM, milkProducePM: milkPM == '' ? 0 : milkPM},
      ],
    };
    const payload = {
      postBodyAddFeedItemDate,
      animalTagId:milkReducerState.selectAnimalTagItem.id,
    };
    milkAMRef.current.clear();
    milkPMRef.current.clear();
    animalTagRef.current.clear()
    // dateRef.current.clear();
    dispatch(addMilk(payload));
  };

  return (
    <SmartView>
        <Date
          date={date}
          ref={dateRef}
          onDateChange={date => {
            setDate(date);
          }}
          error={error => {
            setDateError(error);
          }}
        />
        
        <Input
          displayOnly={true}
          label={'Animal Tag'}
          ref={animalTagRef}
          value={milkReducerState.selectAnimalTagItem.tag}
          onChangeText={value => dispatch(dispatch(selectAnimalTagItem({tag: value, id: value})))}
          placeholder={'Select Animal Tag'}
          onPress={() => navigation.navigate('Animal Tag')}
          errorMessage={'The value must be numeric'}
          error={error => {
            setAnimalTagError(error);
          }}
        />

     

        <Input
          label={'Morning Milk'}
          keyboardType={'number-pad'}
          maxLength={2}
          ref={milkAMRef}
          value={milkAM}
          placeholder={'Enter Morning Milk'}
          errorMessage={'The value must be numeric'}
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
          maxLength={2}
          ref={milkPMRef}
          value={milkPM}
          placeholder={'Enter Evening Milk'}
          errorMessage={'The value must be numeric'}
          onChangeText={value => setMilkPM(value)}
          error={error => {
            setMilkPMError(error);
          }}
          regex={literRegex}
        />

        <Button
          loading={milkReducerState.milkLoading}
          error={[milkAMError,milkPMError,dateError]}
          title={'Submit'}
          onPress={() => callApi()}
        />
    </SmartView>
  );
}

 function validate(milkAMError, milkPMError, date, tag) {

  if ( milkAMError == false && milkPMError == false && date !== '', tag!=='') 
  {
    return  false;
  }
  else {
    return  true;}
}

export { AddFeedItemDate };


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
