import React from "react";
import { View } from "react-native";
import color from '../assets/color/Index';
import {TransparentActivityIndicator} from './TransparentActivityIndicator';

function SmartView(props) {
    return (
      <View style={smartViewStyles.container}>
        {props.loading && <TransparentActivityIndicator />}
        {props.children}
      </View>
    );
}

export { SmartView };
const smartViewStyles = {
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.white,
  },
};
