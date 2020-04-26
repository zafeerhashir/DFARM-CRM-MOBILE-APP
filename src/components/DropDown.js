import React, { forwardRef, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import color from '../assets/color/Index';
import { Dropdown } from "react-native-material-dropdown";


function IDropDown(props)  {
  
  const [value, setValue] = useState('');
  const dropDownRef = useRef();

 

  const  onChangeText = async (index, value) => {
    await props.onChangeText(value);
    const selectedValue = await props.labelExtractor(props.data[index]);
    setValue(selectedValue)
  };


    return (
      <View style={dropDownStyles.containerStyle}>
        <Text
        style={dropDownStyles.labelContainer}
        >
        {props.label}
        </Text>

        <View style={dropDownStyles.dropDownContainer}>
          <Dropdown
            textColor={color.black.color}
            baseColor={color.grey.color}
            onChangeText={async (value, index) =>
              onChangeText(index, value)
            }
            pickerStyle={dropDownStyles.pickerStyle}
            dropdownOffset={dropDownStyles.dropdownOffset}
            selectedItemColor={color.black.color}
            data={props.data}
            value={props.value}
            ref={dropDownRef}
            rippleInsets={dropDownStyles.rippleInsets}
            renderBase={() => (
              <View style={dropDownStyles.container}>
                <View style={dropDownStyles.textInputContainer}>
                  <TextInput
                    style={dropDownStyles.renderBaseInput}
                    placeholder={props.placeholder}
                    value={value}
                  />
                </View>
                <View style={dropDownStyles.arrowDownContainer}>
                  <View style={dropDownStyles.arrowDown} />
                </View>
              </View>
            )}
            valueExtractor={props.valueExtractor}
            labelExtractor={props.labelExtractor}
          />
        </View>

      </View>
    );
}

export const MaterialDropdown = forwardRef(IDropDown)

const dropDownStyles = {
  pickerStyle: {
    width: "90%",
  },
  rippleInsets: {
    top: 0
  },
  containerStyle: {
    width: "100%",
    borderWidth: 0,
    justifyContent: "center",
    borderWidth: 0,
    borderWidth: 0,
    height: 100
  },
  dropdownOffset: {
    top: 32,
    left: 16
  },
  labelContainer: {
    height: 20,
    width: "100%"
  },
  dropDownContainer: {
    width: "100%"
  },
  childContainer: {
    height: 0
  },
  renderBaseInput: {
    height: 50,
    width: "100%",
    borderBottomWidth: 0.5,
    textAlign: "left"
  },
  arrowDown: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: color.black.color,
    transform: [{ rotate: "180deg" }],
    margin: 0,
    marginLeft: -6,
    borderWidth: 0
  },
  arrowDownContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "8%",
    height: 50,
    borderBottomWidth: 0.5
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  textInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "92%"
  }
};
