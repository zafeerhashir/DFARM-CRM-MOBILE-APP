import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from '../assets/color/Index';
import {
  editMilk,
  editMilkVisible,
  editMilkPerDayVisible,
} from '../redux/actions/Index';
import {integerRegex} from '../validations/Index';
import {Button} from './Button';
import {Date} from './DatePicker';
import {Input} from './Input';
import {MYModal} from './Modal';
import {SmartView} from './SmartView';
import {formatDate} from '../conversions/Index';
import styles, {shadow} from '../assets/styles/Index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

function EditMilkPerDay(props) {
const [milkGallonAM, setMilkGallonAM] = useState(props.selectedItem.milkGallonAM);
const [milkGallonPM, setMilkGallonPM] = useState(props.selectedItem.milkGallonPM);
const [milkLiterAM, setMilkLiterAM] = useState(props.selectedItem.milkLiterAM);
const [milkLiterAM, setMilkLiterPM] = useState(props.selectedItem.milkLiterAM);
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
const error = [milkGallonAMError, milkLiterAMError, milkGallonPMError, milkLiterPMError, rateError];


  useEffect(() => {}, []);

  const callApi = () => {
    const postBodyEditMilk = {
        date,
        milkGallonAM,
        milkGallonPM,
        milkLiterAM,
        milkLiterPM,
        rate,
    };

    const payload = {
      postBodyEditMilk,
      milkId,
    };
    dispatch(editMilk(payload));
  };

  const onLayout = useCallback();

  const onDismiss = () => {
    dispatch(editMilkPerDayVisible({visible: false}));
  };

  return (
    <MYModal>
      <View style={addMilkStyles.modalView}>
        <View style={addMilkStyles.dismissRow}>
          <TouchableOpacity
            style={addMilkStyles.dismissTextContainer}
            onPress={() => onDismiss()}>
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
        required={false}
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
          error={error}
          title={'Edit'}
          onPress={() => callApi()}
        />
      </View>
    </MYModal>
  );
}



export {EditMilkPerDay};

const addMilkStyles = {
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
