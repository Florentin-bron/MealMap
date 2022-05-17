import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen'
import { HomeScreen } from '../screen/HomeScreen'

import { LoginContext } from '../context/context';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

export function StackNavigator() {

    const {login, setLogin} = useContext(LoginContext);

    return (
        <Stack.Navigator initialRouteName="Home">
        {login ? (
            //si le login est true, alors on retourne les screen suivants
            <>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            </>
            ) : (
            //sinon on retourne sur la page login
            <>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerTransparent: true, headerTitle: '', headerBackTitleVisible: false}}/>
            </>
        )}
        </Stack.Navigator>
    )
}