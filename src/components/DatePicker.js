import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';
import DatePicker from 'react-native-datepicker';

function Date(props) {
  const [date, setDate] = useState('');

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
                height: 40,
                width: 40,
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

export {Date};

const datePickerStyles = {
  pickerContainer: {
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: color.grey.color,
    borderWidth: 0,
    marginTop: 30,
    borderWidth: 0,
  },
  datePickerStyle: {
    width: 40,
    borderWidth: 0,
  },
  pickerCol: {
    width: '100%',
    borderWidth: 0,
    justifyContent: 'space-between',
    height: 65,
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
