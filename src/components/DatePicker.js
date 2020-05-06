import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import color from '../assets/color/Index';
import DatePicker from 'react-native-datepicker';
import {formatDate, fromDate, currentDate} from '../conversions/Index';
import {requireFieldValidator} from '../validations/Index';
import styles, {shadow} from '../assets/styles/Index';

function IDate(props, ref) {
  const [date, setDate] = useState(props.date);
  const [error, setError] = useState(true);

  useEffect(() => {
    setDate(props.date);
    onDateChange(props.date);
  }, [props.date]);

  const onDateChange = async d => {
    try {
      const _requireFieldValidator = await requireFieldValidator(d);
      if (_requireFieldValidator) {
        setError(false);
        props.onDateChange(d);
        await props.error(false);
        setDate(d);
      } else {
        setDate(d);
        setError(true);
        props.onDateChange(d);
        await props.error(true);
      }
    } catch (e) {}
  };

  useImperativeHandle(ref, () => ({
    clear: () => {
      props.onDateChange('');
      setDate('');
    },
  }));

  return (
    <View style={datePickerStyles.container}>
      <View style={datePickerStyles.pickerContainer}>
        <View style={datePickerStyles.pickerRow}>
          <DatePicker
            style={datePickerStyles.datePickerStyle}
            date={date}
            iconSource={require('../assets/img/calendar.png')}
            mode="date"
            format="YYYY-MM-DD"
            maxDate={new window.Date()}
            minDate={props.minDate}
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
            onDateChange={date => onDateChange(date)}
          />
          <View style={datePickerStyles.placeholderInputContainer}>
            {date == '' ? (
              <Text style={datePickerStyles.placeholderText}>
                {props.placeholder == undefined
                  ? 'Select Date'
                  : props.placeholder}
              </Text>
            ) : (
              <Text style={datePickerStyles.dateText}>{date}</Text>
            )}
          </View>
        </View>
      </View>
      {props.required !== false && (
        <View style={datePickerStyles.errorContainer}>
          {error && (
            <Text style={datePickerStyles.error}>This field is required</Text>
          )}
        </View>
      )}
    </View>
  );
}

export const Date = forwardRef(IDate);

const datePickerStyles = {
  container: {
    width: '90%',
    alignItems: 'flex-start',
    borderWidth: 0,
  },

  placeholderInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    paddingHorizontal: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    marginTop: 20,
    color: color.white,
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
  dateText: {},
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
