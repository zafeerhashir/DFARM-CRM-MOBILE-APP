import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SignInScreen,
  AddMilk,
  Milk,
  DeleteMilk,
  SelectAnimalTag,
  AddAnimal,
  Animal,
  AnimalDetail
} from '../screens/Index';
import color from '../assets/color/Index';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MilkTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.black,
        indicatorStyle: {backgroundColor: color.tealGreen, height: '100%'},
        style: {backgroundColor: color.tealDarkGreen},
      }}>
      <Tab.Screen name="Milks" component={Milk} />
      <Tab.Screen name="Add" component={AddMilk} />
    </Tab.Navigator>
  );
}



function MilkStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Milks"
        component={MilkTab}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={navigationStyles.headerLeft}>
              <Image
                style={navigationStyles.headerLeftImage}
                source={require('../assets/img/menu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="Animal Tag"
        component={SelectAnimalTag}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
          },
        }}
      />
    </Stack.Navigator>
  );
}


function AnimalTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.black,
        indicatorStyle: {backgroundColor: color.tealGreen, height: '100%'},
        style: {backgroundColor: color.tealDarkGreen},
      }}>
      <Tab.Screen name="Animals" component={Animal} />
      <Tab.Screen name="Add" component={AddAnimal} />
    </Tab.Navigator>
  );
}




function AnimalStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Animal"
        component={AnimalTab}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={navigationStyles.headerLeft}>
              <Image
                style={navigationStyles.headerLeftImage}
                source={require('../assets/img/menu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
      name="Animal Milk Detail"
      component={AnimalDetail}
      options={{
        headerStyle: {
          backgroundColor: color.tealDarkGreen,
        },
      }}
    />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Animal" component={AnimalStack} />
      <Drawer.Screen name="Milk" component={MilkStack} />
      <Drawer.Screen name="Feed" component={MilkStack} />
    </Drawer.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {null == null ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={MainDrawer}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={MainDrawer} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

const navigationStyles = {
  headerLeft: {
    height: 20,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftImage: {
    height: 25,
    width: 25,
  },
};
