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
  AnimalDetail,
  SelectFeedItemDate,
  FeedItem,
  AddFeedItem,
  FeedItemDate,
  AddFeedItemDate,
  ChangePassword,
  SignIn,
} from '../screens/Index';
import color from '../assets/color/Index';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MilkTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
        style: {backgroundColor: color.tealDarkGreen},
      }}>
      <Tab.Screen name="MILK" component={Milk} />
      <Tab.Screen name="Add" component={AddMilk} />
    </Tab.Navigator>
  );
}



function MilkStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Milk"
        component={MilkTab}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
          },
          headerTitleStyle:{
            color: color.white
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
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
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
          headerTitleStyle:{
           color: color.white
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



function FeedItemTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
        style: {backgroundColor: color.tealDarkGreen},
      }}>
      <Tab.Screen name="FeedItems" component={FeedItem} />
      <Tab.Screen name="Add" component={AddFeedItem} />
    </Tab.Navigator>
  );
}



function FeedItemStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FEED"
        component={FeedItemTab}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
            
          },
          headerTitleStyle:{
           color: color.white
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
      name="Select Feed Date"
      component={SelectFeedItemDate}
      options={{
        headerStyle: {
          backgroundColor: color.tealDarkGreen,
        },
      }}
    />

     
    
    </Stack.Navigator>
  );
}

function ChangePasswordStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FEED"
        component={FeedItemTab}
        options={{
          headerStyle: {
            backgroundColor: color.tealDarkGreen,
            
          },
          headerTitleStyle:{
           color: color.white
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
      name="Change Password"
      component={ChangePassword}
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
    <Drawer.Screen name="Milk" component={MilkStack} />

    <Drawer.Screen name="FeedItem" component={FeedItemStack} />
      <Drawer.Screen name="Animal" component={AnimalStack} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordStack} />
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
            <Stack.Screen name="SignIn" component={SignIn} />
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
    tintColor:color.white
  },
};
