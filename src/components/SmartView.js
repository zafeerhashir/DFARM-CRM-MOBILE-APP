import React from 'react';
import {View, StatusBar, RefreshControl, ShadowPropTypesIOS} from 'react-native';
import color from '../assets/color/Index';
import {TransparentActivityIndicator} from './TransparentActivityIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function SmartView(props) {
  return (
    <>
      {<StatusBar  backgroundColor={color.themeColor} />}
      <KeyboardAwareScrollView
        contentContainerStyle={[smartViewStyles.keyboardAwareScrollViewStyle,props.contentContainerStyle]}>
        {props.children}
      </KeyboardAwareScrollView>
    </>
  );

}



export {SmartView};
const smartViewStyles = {
  keyboardAwareScrollViewStyle: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    flexGrow:1
  },
};
