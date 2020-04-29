import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';
import DatePicker from 'react-native-datepicker';
import {formatDate, fromDate, currentDate } from '../conversions/Index';


function IDate(props, ref) {
  const [date, setDate] = useState('');

  useImperativeHandle(ref, () => ({
    clear: () => {
      props.onDateChange('');
      setDate('');
    },
  }));

  return (
    <View style={datePickerStyles.pickerContainer}>
      <View style={datePickerStyles.pickerCol}>
        <View style={datePickerStyles.pickerRow}>
          <DatePicker
            style={datePickerStyles.datePickerStyle}
            date={date}
            iconSource={require('../assets/img/calendar.png')}
            mode="date"
            format="YYYY-MM-DD"
            hideText={true}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                marginLeft: 0,
                height: 50,
                width: 50,
              },
              dateInput: {
                paddingLeft: 0,
                borderWidth: 0,
              },
              placeholderText: {
                color: color.grey.color,
                marginLeft: 0,
                paddingLeft: 0,
              },
            }}
            onDateChange={date => {
              setDate(date), props.onDateChange(date);
            }}
          />
          {date == '' ? (

            
            <Text style={datePickerStyles.placeholderText}>{props.placeholder == undefined ? 'Select date' : props.placeholder }</Text>
          ) : (
            <Text style={datePickerStyles.dateText}>{date}</Text>
          )}
        </View>
      </View>
      {props.required &&
      <View style={datePickerStyles.errorContainer}>
        {date == '' && (
          <Text style={datePickerStyles.error}>This field is required</Text>
        )}
      </View>
      }
    </View>
  );
}

export const Date = forwardRef(IDate);

const datePickerStyles = {
  pickerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.grey.color,
    borderWidth: 0,
    height: 85,
    marginTop: 20
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
    alignItems: 'center',
  },
  dateText: {
    marginLeft: '5%',
  },
  placeholderText: {
    marginLeft: '5%',
    color: color.grey,
  },
  errorContainer: {
    height: 20,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
  error: {
    color: color.red,
  },
};
