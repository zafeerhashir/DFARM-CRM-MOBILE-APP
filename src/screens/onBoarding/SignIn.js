import * as React from 'react';
import { View, TextInput, useState, useContext, Button } from 'react-native';


function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
  
    return (
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
      </View>
    );
  }

  export  { SignInScreen }