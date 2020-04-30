import React from 'react';
import {View, StatusBar, RefreshControl} from 'react-native';
import color from '../assets/color/Index';
import {TransparentActivityIndicator} from './TransparentActivityIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function SmartView(props) {
  // return (
  //   <KeyboardAwareScrollView
  //     refreshControl={
  //       <RefreshControl
  //         refreshing={props.refreshing}
  //         onRefresh={props.onRefresh}
  //       />
  //     }
  //     style={[smartViewStyles.keyboardAwareScrollViewStyle]}>
  //     <View style={[smartViewStyles.container]}>
  //       <StatusBar backgroundColor={color.tealDarkGreen} />

  //       {props.refreshing == false && props.loading && (
  //         <TransparentActivityIndicator />
  //       )}
  //       {props.children}
  //     </View>
  //   </KeyboardAwareScrollView>
  // );
  return (
    
      <View style={[props.style == undefined ? smartViewStyles.container : props.style ]}>
        <StatusBar backgroundColor={color.tealDarkGreen} />

        {props.refreshing == false && props.loading && (
          <TransparentActivityIndicator />
        )}
        {props.children}
      </View>
   
  );
}

export {SmartView};
const smartViewStyles = {
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    


  },
  keyboardAwareScrollViewStyle: {
    backgroundColor: color.white,
    height: 500,

  },
};
