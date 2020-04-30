import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MYModal } from './Modal';


function CardLongPressView(props) {
  return (
    <MYModal onTabOut={props.onTabOut} loading={props.loading} visible={props.visible}>
      <View style={cardLongPressViewStyles.dialogueChildContainer}>
        <TouchableOpacity
          onPress={props.onEditPress}
          style={cardLongPressViewStyles.Container}>
          <View style={cardLongPressViewStyles.row}>
            <Text style={cardLongPressViewStyles.cardLongPressViewText}>Edit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onDeletePress}
          style={cardLongPressViewStyles.Container}>
          <View style={cardLongPressViewStyles.row}>
          <Text style={cardLongPressViewStyles.cardLongPressViewText}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </MYModal>
  );
}
export { CardLongPressView };

const cardLongPressViewStyles = StyleSheet.create({

  cardLongPressViewText:{
  fontSize: 18
  },
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderWidth: 0,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0
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
    width: '40%',
    borderWidth: 0.5,
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  dialogueDescriptionContainer: {
    backgroundColor: 'white',
    width: '90%',
    borderWidth: 0.5,
    minHeight: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
