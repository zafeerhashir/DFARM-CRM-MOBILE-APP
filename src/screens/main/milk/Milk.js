
import * as React from 'react';
import { View, TextInput, useState, useContext, Button, FlatList } from 'react-native';


function Milk() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
  
    return (
      <View
        style = { milkStyles.parentContainer }
      >
        <View
        style = { milkStyles.childOneContainer }
        >

          <View
          style = { milkStyles.subChildOneContainer }
          >

            <View
              style = { milkStyles.subSubChildOneContainer }
            >

            </View>


            <View
              style = { milkStyles.subSubChildOneContainer }
            >
              
            </View>
          
        
          </View>

          <View
          style = { milkStyles.subChildTwoContainer }
          >

            <View
              style = { milkStyles.subSubChildTwoContainer }
            >

            </View>

            <View
              style = { milkStyles.subSubChildTwoContainerLabel }
            >

            </View>
          
        
          </View>


        </View>


        <View
        style={ milkStyles.cardContainer }
        >
         
          <View
          style={ milkStyles.cardContainerChildOne }
          >
            <View
              style={ milkStyles.cardContainerChildOneRow }
            >
              <View
                style={ milkStyles.cardContainerChildOneColLabel }
              >

              </View>

              <View
                style={ milkStyles.cardContainerChildOneColText }
              >

              </View>

            </View>

            <View
              style={ milkStyles.cardContainerChildOneRow }
            >
              <View
                style={ milkStyles.cardContainerChildOneColLabel }
              >

              </View>

              <View
                style={ milkStyles.cardContainerChildOneColText }
              >

              </View>

            </View>

            <View
              style={ milkStyles.cardContainerChildOneRow }
            >
              <View
                style={ milkStyles.cardContainerChildOneColLabel }
              >

              </View>

              <View
                style={ milkStyles.cardContainerChildOneColText }
              >

              </View>

            </View>

          </View>


          <View
          style={ milkStyles.cardContainerChildTwo }
          >

          </View>


        </View>

      </View>
    );
  }

  export { Milk }

  const milkStyles = {

    parentContainer:{ 
      flex: 1, 
      width: '100%',
      borderWidth: 1 
    },

      childOneContainer:{
      height: 200,
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      borderWidth: 1,
      paddingHorizontal: 10,
    },

    subChildOneContainer:{
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      width: '100%',
    },

    subSubChildOneContainer:{
      height: 40,
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },

    subChildTwoContainer:{
      flexDirection: 'row', 
      alignItems: 'center',
      width: '100%',
      marginTop: 30,

    },

    subSubChildTwoContainer:{
      height: 40,
      width: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },

    subSubChildTwoContainerLabel:{
      height: 40,
      width: '20%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1
    },

    cardContainer:{
      height: 150,
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      borderWidth: 1
    },

    cardContainerChildTwo:{
      width: '30%',
      height: 30,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',

    },

    cardContainerChildOne:{
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
    },

    cardContainerChildOneRow:{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: 30 
    },
    cardContainerChildOneColLabel:{
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      borderWidth: 1 
    },
    cardContainerChildOneColText:{
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      borderWidth: 1 
    }
  
  }