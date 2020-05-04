import React, {useEffect, useState, useCallback} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MYModal} from './Modal';
import styles from '../assets/styles/Index';
import color from '../assets/color/Index';
import {ConfirmationModel} from './ConfirmationModel'


function CardLongPressView(props) {
  const [visible, setVisible] = useState(false);

  return (
    <MYModal loading={props.loading} visible={true}>
      <View style={cardLongPressViewStyles.dialogueChildContainer}>
        <View style={cardLongPressViewStyles.dismissRow}>
          <TouchableOpacity
            style={cardLongPressViewStyles.dismissTextContainer}
            onPress={props.onTabOut}>
            <Text style={{color: color.lightGrey}}>Dismiss</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={props.onEditPress}
          style={cardLongPressViewStyles.Container}>
          <View style={cardLongPressViewStyles.row}>
            <Text style={{color: color.tealDarkGreen}}>Edit</Text>
          </View>
        </TouchableOpacity>
        {visible && 
          <ConfirmationModel 
          message={'Are you sure, You want to delete this record?'} 
          onPress={props.onDeletePress} 
          onTabOut={props.onTabOut}
          />}
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={cardLongPressViewStyles.Container}>
          <View style={cardLongPressViewStyles.row}>
          <Text style={{color: color.tealDarkGreen}}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MYModal>
  );
}
export {CardLongPressView};

const ConfirmationModelStyles = {

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
    width: '95%',
    justifyContent: 'space-between',
    borderWidth: 0,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'flex-end',
    borderWidth: 0,
  },

  dialogueChildContainer: {
    backgroundColor: 'white',
    width: '70%',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: styles.borderRadius,
  },
};

const cardLongPressViewStyles = StyleSheet.create({
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

  cardLongPressViewText: {},
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderWidth: 0,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color: 'black',
  },
  dialogueCol: {
    maxHeight: 70,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    width: '90%',
    justifyContent: 'space-between',
    borderWidth: 0,
  },

  dialogueChildContainer: {
    backgroundColor: 'white',
    width: '60%',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: styles.borderRadius,
  },
  dialogueDescriptionContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderWidth: 0.5,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    ...styles.borderRadius,
  },
  dialogueFont: {
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  dialogueCol: {
    maxHeight: 70,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'flex-end',
    borderWidth: 0,
    marginTop: 20,
    marginBottom: 20,
  },

  descriptionInput: {
    width: '100%',
    height: 140,
    borderWidth: 0.5,
    paddingBottom: 100,
    paddingLeft: 10,
  },
  dialogueChildContainerRow: {
    width: '90%',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 0,
    flexDirection: 'row',
  },
  dialogueDescriptionChildContainerRow: {
    width: '90%',
    marginBottom: 5,
    marginTop: 5,
    borderWidth: 0,
    flexDirection: 'row',
  },
});
