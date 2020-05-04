import React,{ useRef } from 'react';
import { ActivityIndicator, Modal, TouchableWithoutFeedback, View, PanResponder  } from 'react-native';
import color from '../assets/color/Index';

function MYModal(props) {



  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <TouchableWithoutFeedback
        onPress={props.onTabOut}
        >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            height: '100%',
            width: '100%',
          }}
          >
          {props.loading ? (
            <ActivityIndicator color={color.tealDarkGreen} size="large" />
          ) : (
            props.children
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export { MYModal }