/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {name as appName} from './app.json';
import Navigation from './src/navigation/Navigation';
import {rootReducer} from './src/redux/reducers/Index';
import createSagaMiddleware from 'redux-saga';
import saga from './src/redux/sagas/Index';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

function App() {
  setTimeout(() => SplashScreen.hide(), 1200);
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

sagaMiddleware.run(saga);

AppRegistry.registerComponent(appName, () => App);
