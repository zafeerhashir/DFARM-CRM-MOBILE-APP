import * as React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,  DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SignInScreen, AddMilk, EditMilk, Milk, DeleteMilk } from '../screens/Index'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();




function MilkTab() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Milk" component={Milk} />
        <Tab.Screen name="Add" component={AddMilk} />
        <Tab.Screen name="Edit" component={EditMilk} />
        <Tab.Screen name="Delete" component={DeleteMilk} />
      </Tab.Navigator>
    );  
  }

  function MilkStack({ navigation }) {
    return (
          <Stack.Navigator>
            <Stack.Screen 
            name="Milk" 
            component={MilkTab}
            options={
              {
                headerLeft: () => 
                            (
                            <TouchableOpacity
                            onPress={()=> navigation.openDrawer() }
                            style={navigationStyles.headerLeft}
                            >
                              <Image
                              style={navigationStyles.headerLeftImage}  
                              source={require('../assets/img/menu.png')} 
                              />
                            </TouchableOpacity>
                            )
              }
            } 
            />
          </Stack.Navigator>
          )
  }



function MainDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Milk" component={MilkStack}  />
        <Drawer.Screen name="Feed" component={MilkStack} />
        <Drawer.Screen name="Animal" component={MilkStack} />
      </Drawer.Navigator>
    );
  }


function Navigation() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                {null == null ? 
                <>
                    <Stack.Screen name="SignIn" 
                    component={MainDrawer}
                    options={{ headerShown: false}}
                    />
                </>

                : 
                
                <>
                    <Stack.Screen name="SignIn" component={MainDrawer}  />

                </>
                }
            </Stack.Navigator>
        </NavigationContainer>    
        )
}

export default Navigation;




const navigationStyles = {
  headerLeft:{ 
    height: 20, 
    width: 60, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerLeftImage:{
     height: 25, 
     width: 25 
  }
}