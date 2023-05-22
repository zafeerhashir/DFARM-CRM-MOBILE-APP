import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../assets/color/Index';
import styles, { shadow } from '../assets/styles/Index';
import { editAnimal, editAnimalVisible, getAnimal } from '../redux/actions/Index';
import { animalTagRegex, literRegex, charactersRegex } from '../validations/Index';
import { Button } from './Button';
import { Input } from './Input';
import { Date } from './DatePicker';
import { MYModal } from './Modal';
import { currentDate } from '../conversions/Index';
import PropTypes from 'prop-types';



function EditAnimal(props) {

  const { selectedItem } = props
  const animalTagId = selectedItem._id;
  const [animalTag, setAnimalTag] = useState(selectedItem.tag);
  const [price, setPrice] = useState(selectedItem.price ? selectedItem.price : '');
  const [date, setDate] = useState(selectedItem.purchaseDate ? currentDate(selectedItem.date) : '');
  const [origin, setOrigin] = useState(selectedItem.origin ? selectedItem.origin : '');
  const [priceError, setPriceError] = useState(false);
  const [originError, setOriginError] = useState(false);
  const [animalTagError, setAnimalTagError] = useState(false);
  const animalReducerState = useSelector(state => state.animal);
  const dispatch = useDispatch();
  const animalTagRef = useRef();
  const priceRef = useRef();
  const originRef = useRef();
  const dateRef = useRef();
  const errors = [animalTagError, originError, priceError]

  if (selectedItem.origin === undefined) {
    delete errors.splice(1, 1)
  }
  if (selectedItem.price === undefined) {
    delete errors.splice(2, 1)
  }


  useEffect(() => { }, []);

  const callApi = () => {
    const postBodyEditAnimal = {
      tag: animalTag,
    };

    if (origin !== '') {
      postBodyEditAnimal.origin = origin
    }

    if (price !== '') {
      postBodyEditAnimal.price = price
    }

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
            onPress={() => dispatch(editAnimalVisible({ visible: false }))}>
            <Text style={{ color: color.lightGrey }}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        {selectedItem.purchaseDate !== undefined &&
          <Date
            date={date}
            ref={dateRef}
            onDateChange={date => {
              setDate(date);
            }}
          />
        }

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

        {selectedItem.origin !== undefined &&
          <Input
            label={'Origin'}
            ref={originRef}
            required={false}
            value={origin}
            placeholder={'Enter Origin'}
            errorMessage={'Name must be in alphabets'}
            onChangeText={(value) => setOrigin(value)}
            error={(error) => {
              setOriginError(error);
            }}
            regex={charactersRegex}
          />
        }

        {selectedItem.price !== undefined &&
          <Input
            label={'Price'}
            keyboardType={'number-pad'}
            maxLength={8}
            ref={priceRef}
            required={false}
            value={price}
            placeholder={'Enter Price'}
            errorMessage={'Price must be in a number'}
            onChangeText={(value) => setPrice(value)}
            error={(error) => {
              setPriceError(error);
            }}
            regex={literRegex}
          />
        }

        <Button
          loading={animalReducerState.editAnimalLoading}
          error={errors}
          title={'Edit'}
          onPress={() => callApi()}
        />
      </View>
    </MYModal>
  );
}

export { EditAnimal };

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
