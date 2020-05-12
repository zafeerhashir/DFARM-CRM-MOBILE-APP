import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import {editMilk, editMilkVisible} from '../redux/actions/Index';
import {literRegex} from '../validations/Index';
import {Button} from './Button';
import {Date} from './DatePicker';
import {Input} from './Input';
import {MYModal} from './Modal';
import {SmartView} from './SmartView';
import {formatDate} from '../conversions/Index';
import styles,{shadow} from '../assets/styles/Index';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function EditMilk(props) {
  const animalTagId = props.selectedItem.animalTagId;
  const milkId = props.selectedItem._id;
  const [milkAM, setMilkAM] = useState(props.selectedItem.milkProduceAM);
  const [milkPM, setMilkPM] = useState(props.selectedItem.milkProducePM);
  const [date, setDate] = useState(formatDate(props.selectedItem.date));
  const [milkAMError, setMilkAMError] = useState(true);
  const [milkPMError, setMilkPMError] = useState(true);
  const [dateError, setDateError] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const callApi = () => {
    const postBodyEditMilk = {
      date,
      milkProduceAM: parseInt(milkAM),
      milkProducePM: milkPM == '' ? 0 : parseInt(milkPM),
    };

    const payload = {
      postBodyEditMilk,
      animalTagId,
      milkId,
    };
    dispatch(editMilk(payload));
  };

  const onLayout = useCallback();

  return (
    <MYModal>
      <View style={addMilkStyles.modalView}>
        <View style={addMilkStyles.dismissRow}>
          <TouchableOpacity
            style={addMilkStyles.dismissTextContainer}
            onPress={() => dispatch(editMilkVisible({visible: false}))}>
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>

        <Date
          date={date}
          onDateChange={date => {
            setDate(date);
          }}
          error={error => {
            setDateError(error);
          }}
        />

        <Input
          label={'Milk Produce AM'}
          keyboardType={'number-pad'}
          maxLength={2}
          value={milkAM}
          placeholder={'Enter Milk Produce AM'}
          errorMessage={'Morning Milk must be in liter'}
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
          value={milkPM}
          placeholder={'Enter Milk Produce PM'}
          errorMessage={'Evening Milk must be in liter'}
          onChangeText={value => setMilkPM(value)}
          error={error => {
            setMilkPMError(error);
          }}
          regex={literRegex}
        />

     
        <Button
          error={[milkAMError, milkAMError]}
          title={'Edit'}
          onPress={() => callApi()}
        />
       
      </View>
    </MYModal>
  );
}


export {EditMilk};

const addMilkStyles = {
  modalView: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
