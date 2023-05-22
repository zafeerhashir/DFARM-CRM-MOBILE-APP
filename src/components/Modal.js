import React, {useRef} from 'react';
import {
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  View,
  PanResponder,
} from 'react-native';
import color from '../assets/color/Index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function MYModal(props) {
  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <TouchableWithoutFeedback onPress={props.onTabOut}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            width: '100%',
            flexGrow: 1,
          }}
        >
          {props.loading ? (
            <ActivityIndicator color={color.themeColor} size="large" />
          ) : (
            props.children
          )}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export {MYModal};
