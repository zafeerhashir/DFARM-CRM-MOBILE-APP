import React from 'react';
import {StatusBar, View, RefreshControl, ScrollView} from 'react-native';
import color from '../assets/color/Index';

function ListView(props) {
  return (
    <>
      {<StatusBar backgroundColor={color.themeColor} />}
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[color.themeColor]}
            tintColor={color.themeColor}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
        // refreshControl={props.refreshControl}

        contentContainerStyle={[listViewStyles.keyboardAwareScrollViewStyle]}>
        {props.children}
      </ScrollView>
    </>
  );
}

export {ListView};
const listViewStyles = {
  modalContainerStyle: {
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
    backgroundColor: color.white,
  },
  keyboardAwareScrollViewStyle: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: color.white,
    flexGrow: 1,
  },
};
