import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {StackNavigator} from './src/navigator/StackNavigator';
import { LoginContext } from './src/context/context';
import { UserContext } from './src/context/context';
import { useState } from 'react';


function App() {

  const [login, setLogin] = useState(0);//on définit le login à false
  const [user, setUser] = useState();//on définit le login à false

  return (
    <NavigationContainer>
      <LoginContext.Provider value={{login, setLogin}}>
      <UserContext.Provider value={{user, setUser}}>
        <StackNavigator/>
      </UserContext.Provider>
      </LoginContext.Provider>
    </NavigationContainer>
  );
}

export default App;