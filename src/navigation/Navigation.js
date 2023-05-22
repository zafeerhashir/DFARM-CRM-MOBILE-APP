import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
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
  User,
  AddUser,
} from '../screens/Index';
import color from '../assets/color/Index';
import {clockRunning} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import constant from '../redux/constant/Index';
import AsyncStorage from '@react-native-community/async-storage';
import {restoreToken, logout} from '../redux/actions/Index';

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
      }}
    >
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
              style={navigationStyles.headerLeft}
            >
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
      }}
    >
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
              style={navigationStyles.headerLeft}
            >
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

function UserTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
        style: {backgroundColor: color.themeColor},
      }}
    >
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Add" component={AddUser} />
    </Tab.Navigator>
  );
}

function UserStack({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="USER"
        component={UserTab}
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
              style={navigationStyles.headerLeft}
            >
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

function FeedItemTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.white,
        indicatorStyle: {backgroundColor: color.white, height: '5%'},
        style: {backgroundColor: color.themeColor},
      }}
    >
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
              style={navigationStyles.headerLeft}
            >
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
              style={navigationStyles.headerLeft}
            >
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
  const onBoardingReducerState = useSelector((state) => state.onBoarding);
  var userName = 's';
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <View style={navigationStyles.parentContainer}>
        <View style={navigationStyles.row}>
          <View />
          <View style={navigationStyles.roundContainer}>
            <Text style={navigationStyles.roundText}>
              {onBoardingReducerState.user.userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={navigationStyles.usernameText}>
              {onBoardingReducerState.user.userName}
            </Text>
            <Text style={navigationStyles.roleText}>
              {onBoardingReducerState.user.role.roleName == 'SUPER_USER'
                ? 'SUPER USER'
                : 'BASIC USER'}
            </Text>
          </View>
        </View>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        labelStyle={{
          color: color.white,
          fontSize: navigationStyles.drawerFontSize,
        }}
        label="LOGOUT"
        onPress={() => dispatch(logout())}
      />
    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  const onBoardingReducerState = useSelector((state) => state.onBoarding);
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: color.white,
        inactiveBackgroundColor: color.themeColor,
        itemStyle: {marginVertical: 10},
        inactiveTintColor: color.dullWhite,

        labelStyle: {fontSize: navigationStyles.drawerFontSize},
      }}
      drawerStyle={{
        width: 220,
        backgroundColor: color.themeColor,
        activeBackgroundColor: {
          color: color.themeColor,
        },
      }}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MILK" component={MilkStack} />
      <Drawer.Screen name="FEED" component={FeedItemStack} />
      <Drawer.Screen name="ANIMAL" component={AnimalStack} />
      {onBoardingReducerState.user.role.roleName == 'SUPER_USER' && (
        <Drawer.Screen name="USER" component={UserStack} />
      )}
      <Drawer.Screen name="CHANGE PASSWORD" component={ChangePasswordStack} />
    </Drawer.Navigator>
  );
}

const navigationRef = React.createRef();

function SplashScreen() {
  return (
    <View style={splashScreenStyles.container}>
      <ImageBackground
        source={require('../assets/img/loginbackground.png')}
        style={splashScreenStyles.image}
      />
    </View>
  );
}

function Navigation() {
  const onBoardingReducerState = useSelector((state) => state.onBoarding);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(restoreToken());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {onBoardingReducerState.splashLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen
            name="Splash"
            options={{headerShown: false}}
            component={SplashScreen}
          />
        ) : onBoardingReducerState.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'DAIRY FARM',
              headerStyle: {
                backgroundColor: color.themeColor,
                height: navigationStyles.headerHeight.height,
              },
              headerTitleStyle: {
                color: color.white,
                fontWeight: 'bold',
              },
              headerTintColor: color.white,
              headerShown: false,
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen
            name="Main"
            component={MainDrawer}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

const splashScreenStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
};

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

  roundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    height: 35,
    width: 35,
  },
  roundText: {color: color.themeColor, fontSize: 18},

  usernameText: {
    color: 'white',
    marginLeft: '15%',
    fontSize: 18,
  },
  roleText: {
    color: 'white',
    marginLeft: '15%',
    fontSize: 8,
  },
  parentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    width: '90%',
  },
};
