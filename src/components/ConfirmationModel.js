import React, {useEffect, useState, useCallback} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MYModal} from './Modal';
import styles from '../assets/styles/Index';
import color from '../assets/color/Index';

function ConfirmationModel(props) {
  return (
    <MYModal visible={true}>
      <View style={ConfirmationModelStyles.dialogueChildContainer}>
        <View style={ConfirmationModelStyles.dismissRow}>
          <TouchableOpacity
            style={ConfirmationModelStyles.dismissTexContainer}
            onPress={props.onTabOut}
          >
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>
        <View style={ConfirmationModelStyles.row}>
          <Text>{props.message}</Text>
        </View>
        <View style={ConfirmationModelStyles.buttonRow}>
          <TouchableOpacity
            style={ConfirmationModelStyles.buttonRowContainer}
            onPress={props.onPress}
          >
            <Text style={{color: color.themeColor}}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MYModal>
  );
}

export {ConfirmationModel};

const ConfirmationModelStyles = {
  buttonRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    height: 30,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    borderWidth: 0,
  },

  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderWidth: 0,
  },

  dismissRow: {
    borderWidth: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dismissTextContainer: {
    borderWidth: 0,
    height: 20,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dismissTextContainer: {
    borderWidth: 0,
    height: 20,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
    width: '95%',
    justifyContent: 'space-between',
    borderWidth: 0,
  },

  dialogueChildContainer: {
    backgroundColor: color.white,
    width: '70%',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: styles.borderRadius,
  },
};
