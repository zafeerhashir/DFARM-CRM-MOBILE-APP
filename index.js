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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// AppRegistry.registerComponent(
//   appName,
//   <Provider store={store}>
//     <Navigation />
//   </Provider>,
// );

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

sagaMiddleware.run(saga);


AppRegistry.registerComponent(appName, () => App);
