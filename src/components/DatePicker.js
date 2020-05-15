import DateTimePicker from '@react-native-community/datetimepicker';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';
import {shadow} from '../assets/styles/Index';
import {formatDate} from '../conversions/Index';

function IDate(props, ref) {
  const [selectedDate, setSelectedDate] = useState(props.date);
  const [error, setError] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setSelectedDate(props.date);
  }, [props.date]);

  const onDateChange = async (nativeEvent, onSelectDate) => {
    setShow(false);
    const date = onSelectDate || selectedDate;
    setSelectedDate(formatDate(date));
    await props.onDateChange(formatDate(date));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      props.onDateChange('');
      setDate('');
    },
  }));

  return (
    <>
      <View style={datePickerStyles.container}>
        <View style={datePickerStyles.pickerContainer}>
          <TouchableOpacity
            onPress={() => showDatepicker()}
            style={datePickerStyles.pickerRow}>
            <Image
              style={datePickerStyles.datePickerIcon}
              source={require('../assets/img/calendar.png')}
            />
            <View style={datePickerStyles.placeholderInputContainer}>
              {selectedDate == '' ? (
                <Text style={datePickerStyles.placeholderText}>
                  {props.placeholder == undefined
                    ? 'Select Date'
                    : props.placeholder}
                </Text>
              ) : (
                <Text style={datePickerStyles.dateText}>{selectedDate}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        {props.required !== false && (
          <View style={datePickerStyles.errorContainer}>
            {/*error && (
            <Text style={datePickerStyles.error}>This field is required</Text>
          )*/}
          </View>
        )}
      </View>
      {show && (
        <DateTimePicker
          value={new window.Date(selectedDate)}
          mode={'date'}
          maximumDate={new window.Date()}
          minimumDate={
            props.minDate == undefined
              ? new window.Date(2019, 1, 1)
              : new window.Date(props.minDate)
          }
          display="default"
          onChange={(x, y) => onDateChange(x, y)}
        />
      )}
    </>
  );
}

export const Date = forwardRef(IDate);

const datePickerStyles = {
  datePickerIcon: {
    height: 40,
    width: 40,
  },
  container: {
    width: '90%',
    alignItems: 'flex-start',
    borderWidth: 0,
    marginTop: 20
  },

  placeholderInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  pickerContainer: {
    paddingHorizontal: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: color.white,
    ...shadow,
  },
  datePickerStyle: {
    width: 50,
    borderWidth: 0,
  },
  pickerCol: {
    width: '100%',
    borderWidth: 0,
    height: 55,
    justifyContent: 'space-between',
  },
  pickerRow: {
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
  },
  dateText: { color: color.black},
  placeholderText: {
    color: color.grey,
  },
  errorContainer: {
    height: 30,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
  error: {
    color: color.red,
  },
};
