import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import styles,{shadow} from '../assets/styles/Index';
import {editAnimal, editAnimalVisible, getAnimal } from '../redux/actions/Index';
import {animalTagRegex} from '../validations/Index';
import {Button} from './Button';
import {Input} from './Input';
import {MYModal} from './Modal';

function EditAnimal(props) {
  const animalTagId = props.selectedItem.animalTagId;
  const [animalTag, setAnimalTag] = useState(props.selectedItem.tag);
  const [animalTagError, setAnimalTagError] = useState('');
  const dispatch = useDispatch();
  const animalReducerState = useSelector(state => state.animal);
  const animalTagRef = useRef();


  useEffect(() => {}, []);

  const callApi = () => {
    const postBodyEditAnimal = {
      tag: animalTag,
    };

    const payload = {
      postBodyEditAnimal,
      animalTagId,
    };
    dispatch(editAnimal(payload))
    dispatch(getAnimal());
  };


  return (
    <MYModal>
      <View style={EditAnimalStyles.modalView}>
        <View style={EditAnimalStyles.dismissRow}>
          <TouchableOpacity
            style={EditAnimalStyles.dismissTextContainer}
            onPress={() => dispatch(editAnimalVisible({visible: false}))}>
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        <Input
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

        <Button
          loading={animalReducerState.editAnimalLoading}
          error={[animalTagError]}
          title={'Edit'}
          onPress={() => callApi()}
        />
      </View>
    </MYModal>
  );
}


export {EditAnimal};

const EditAnimalStyles = {
  modalView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    ...shadow

  },
  dismissRow: {
    borderWidth: 0,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissTextContainer: {
    borderWidth: 0,
    height: 35,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: styles.borderRadius,
  },
};
