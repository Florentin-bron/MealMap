import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable, Dimensions } from 'react-native';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import { styles } from '../../assets/styles'
import MapView from 'react-native-maps';


export function HomeScreen({ navigation }) {

  const { login, setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.logout}>
        <Button title='Logout' onPress={ () => {setLogin(null)}}/>
      </View>
      <View>
        <Text>Bonjour {user?.username} !</Text>
      </View>
    </View>

  );
}