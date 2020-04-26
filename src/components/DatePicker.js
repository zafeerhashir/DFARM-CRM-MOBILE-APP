import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';
import DatePicker from 'react-native-datepicker';

function IDate(props,ref) {
  const [date, setDate] = useState('');

  useImperativeHandle(ref, () => ({
    clear: () => {
      props.onDateChange('')
      setDate('')
    }
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
          {date == '' ?   <Text style={datePickerStyles.placeholderText}>Select date</Text>  : <Text style={datePickerStyles.dateText}>{date}</Text>}
        </View>
      </View>
    </View>
  );
}

export const Date = forwardRef(IDate)

const datePickerStyles = {
  pickerContainer: {
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: color.grey.color,
    borderWidth: 0,
    height: 100,
    borderWidth: 0,

  },
  datePickerStyle: {
    width: 50,
    borderWidth: 0,
  },
  pickerCol: {
    width: '100%',
    borderWidth: 0,
    justifyContent: 'space-between',
  },
  pickerRow: {
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    marginLeft: '5%'
  },
  placeholderText:{
    marginLeft: '5%',
    color: color.grey
  
  }
};
