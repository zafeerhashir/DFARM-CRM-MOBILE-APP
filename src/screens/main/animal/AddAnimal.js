import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SmartView } from '../../../components/Index';
import { addAnimal } from '../../../redux/actions/Index';
import { animalTagRegex } from '../../../validations/Index';

function AddAnimal() {
  const [animalTag, setAnimalTag] = useState('');
  const [animalTagError, setAnimalTagError] = useState('');
  const animalReducerState = useSelector(state => state.animal);
  const dispatch = useDispatch();
  const animalTagRef = useRef();

  const callApi = () => {
    const payload = {
      tag: animalTag,
    };

    dispatch(addAnimal(payload));
    animalTagRef.current.clear();

  };

  return (
    <SmartView>
      <Input
        containerStyles={addMilkStyles.container}
        label={'Animal Tag'}
        maxLength={8}
        ref={animalTagRef}
        value={animalTag}
        placeholder={'Enter Animal Tag'}
        errorMessage={'The value must be alphanumeric'}
        onChangeText={value => setAnimalTag(value)}
        error={error => {
          setAnimalTagError(error);
        }}
        regex={animalTagRegex}
      />

      <Button
        loading={animalReducerState.animalLoading}
        error={[animalTagError]}
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
