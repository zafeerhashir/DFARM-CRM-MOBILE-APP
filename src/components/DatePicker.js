import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import color from '../assets/color/Index';
import DatePicker from 'react-native-datepicker'

function Date (props) {


  const [date, setDate] = useState('')


  return (
    <View style={datePickerStyles.pickerContainer}>
      <View style={datePickerStyles.pickerCol}>
        <View style={datePickerStyles.pickerRow}>
        <DatePicker
        style={scheduleStyles.datePickerStyle}
        date={date}
        iconSource={require("../assets/img/calendar.png")}
        mode="date"
        format="YYYY-MM-DD"
        hideText={true}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            marginLeft: 0,
            height: 40,
            width: 40
          },
          dateInput: {
            paddingLeft: 0,
            borderWidth: 0
          },
          placeholderText: {
            fontSize: styles.mediumFont.fontSize,
            color: styles.grey.color,
            marginLeft: 0,
            paddingLeft: 0
          }
        }}
        onDateChange={props.onDateChange}
      />


          {}
        </View>

        {date ==  '' && (
          <Text>Required</Text>
        )}
      </View>
    </View>
  );
}

export {Date};

const datePickerStyles = {
    pickerContainer: {
        width: "80%",
        borderWidth: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: color.grey.color,
        borderWidth: 0,
        marginTop: 30,
        borderWidth: 0
      },
      datePickerStyle: {
        width: 40,
        borderWidth: 0
      },
      pickerCol: {
        width: "100%",
        borderWidth: 0,
        justifyContent: "space-between",
        height: 65
      },
      pickerRow: {
        width: "100%",
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center"
      }
};
