import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import color from '../assets/color/Index';
import { editMedicine, editMedicineVisible } from '../redux/actions/Index';
import { literRegex, charactersRegex } from '../validations/Index';
import { Button } from './Button';
import { Date } from './DatePicker';
import { Input } from './Input';
import { MYModal } from './Modal';
import { SmartView } from './SmartView';
import { formatDate } from '../conversions/Index';
import styles, { shadow } from '../assets/styles/Index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function EditMedicine(props) {

  // const animalTagId = props.selectedItem.animal._id;
  const medicineId = props.selectedItem._id;
  const [price, setPrice] = useState(props.selectedItem.price);
  const [name, setName] = useState(props.selectedItem.name);
  const [purpose, setPurpose] = useState(props.selectedItem.purpose);
  const [date, setDate] = useState(formatDate(props.selectedItem.date));
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

  useEffect(() => { }, []);

  const callApi = () => {
    const postBodyEditMedicine = {
      date,
      price,
      name,
      purpose,
    };


    const payload = {
      postBodyEditMedicine,
      id: medicineId,
    };
    dispatch(editMedicine(payload));
  };

  const onLayout = useCallback();

  return (
    <MYModal>
      <View style={medicineMilkStyles.modalView}>
        <View style={medicineMilkStyles.dismissRow}>
          <TouchableOpacity
            style={medicineMilkStyles.dismissTextContainer}
            onPress={() => dispatch(editMedicineVisible({ visible: false }))}>
            <Text style={{ color: color.lightGrey }}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        <Date
          date={date}
          ref={dateRef}
          onDateChange={(date) => {
            setDate(date);
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
          error={[priceError, nameError, purposeError]}
          title={'Submit'}
          onPress={() => callApi()}
        />

      </View>
    </MYModal>
  );
}

export { EditMedicine };

const medicineMilkStyles = {
  modalView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    ...shadow,
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
