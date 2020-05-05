import React from 'react';
import {View, StatusBar, RefreshControl} from 'react-native';
import color from '../assets/color/Index';
import {TransparentActivityIndicator} from './TransparentActivityIndicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function SmartView(props) {

  return (
    <>
       
      { <StatusBar backgroundColor={color.tealDarkGreen} />}
      <KeyboardAwareScrollView
        contentContainerStyle={[ smartViewStyles.keyboardAwareScrollViewStyle ]}>
        {props.children}
      </KeyboardAwareScrollView>
    </>
  );
  // return (
  //   <KeyboardAwareScrollView
  //     contentContainerStyle={smartViewStyles.keyboardAwareScrollViewStyle}
  //    >
  //     <View
  //       style={[
  //         props.style == undefined ? smartViewStyles.container : props.style,
  //       ]}>
  //       <StatusBar backgroundColor={color.tealDarkGreen} />

  //       {props.refreshing == false && props.loading && (
  //         <TransparentActivityIndicator />
  //       )}
  //       {props.children}
  //     </View>
  //   </KeyboardAwareScrollView>
  // );
}

// refreshControl={
//   refreshing == undefined ?
//   nu
//   :
//   <RefreshControl
//     refreshing={props.refreshing}
//     onRefresh={props.onRefresh}
//   />
// }

export {SmartView};
const smartViewStyles = {
  modalContainerStyle:{
    height: 600,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  keyboardAwareScrollViewStyle: {
    flex:1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    

  },
};
