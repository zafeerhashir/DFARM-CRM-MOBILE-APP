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
  Login,
} from '../screens/Index';
import color from '../assets/color/Index';
import {clockRunning} from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MilkTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
        style: {backgroundColor: color.themeColor},
      }}>
      <Tab.Screen name="Milk" component={Milk} />
      <Tab.Screen name="Add" component={AddMilk} />
    </Tab.Navigator>
  );
}

function MilkStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MILK"
        component={MilkTab}
        options={{
          headerStyle: {
            backgroundColor: color.themeColor,
          },
          headerTitleStyle: {
            color: color.white,
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
          title: 'ANIMAL TAGS',
          headerStyle: {
            backgroundColor: color.themeColor,
            height: navigationStyles.headerHeight.height,
          },
          headerTitleStyle: {
            color: color.white,
          },
          headerTintColor: color.white,
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
        style: {backgroundColor: color.themeColor},
      }}>
      <Tab.Screen name="Animal" component={Animal} />
      <Tab.Screen name="Add" component={AddAnimal} />
    </Tab.Navigator>
  );
}

function AnimalStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ANIMAL"
        component={AnimalTab}
        options={{
          headerStyle: {
            backgroundColor: color.themeColor,
          },
          headerTitleStyle: {
            color: color.white,
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
          title: 'MILK DETAILS',
          headerStyle: {
            backgroundColor: color.themeColor,
            height: navigationStyles.headerHeight.height,
          },
          headerTitleStyle: {
            color: color.white,
          },
          headerTintColor: color.white,
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
        style: {backgroundColor: color.themeColor},
      }}>
      <Tab.Screen name="Feed" component={FeedItem} />
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
            backgroundColor: color.themeColor,
          },
          headerTitleStyle: {
            color: color.white,
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
            backgroundColor: color.themeColor,
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
        name="Change Password"
        component={ChangePassword}
        options={{
          title: 'CHANGE PASSWORD',
          headerStyle: {
            backgroundColor: color.themeColor,
            height: navigationStyles.headerHeight.height,
          },
          headerTitleStyle: {
            color: color.white,
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
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        labelStyle={{color: color.white, fontSize: 17}}
        label="Zafeer Hashir"
      />
      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{
          color: color.white,
          fontSize: navigationStyles.drawerFontSize,
        }}
        label="LOGOUT"
        onPress={() => alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: color.white,
        inactiveBackgroundColor: color.white,
        itemStyle: {marginVertical: 10},
        inactiveTintColor: color.black,
        labelStyle: {fontSize: navigationStyles.drawerFontSize},
      }}
      drawerStyle={{
        width: 220,
        backgroundColor: color.themeColor,
        activeBackgroundColor: {
          color: color.themeColor,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="MILK" component={MilkStack} />
      <Drawer.Screen name="FEED" component={FeedItemStack} />
      <Drawer.Screen name="ANIMAL" component={AnimalStack} />
      <Drawer.Screen name="CHANGE PASSWORD" component={ChangePasswordStack} />
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
              name="Login"
              component={MainDrawer}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
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
    tintColor: color.white,
  },

  drawerView: {
    height: 100,
    backgroundColor: color.white,
    borderRadius: 80,
  },
  headerHeight: {
    height: 65,
  },
  drawerFontSize: 12,
};
