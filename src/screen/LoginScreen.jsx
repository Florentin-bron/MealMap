import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import axios from 'axios';
import { styles } from '../../assets/styles'

export function LoginScreen({ navigation }) {

  const { login, setLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');

  const LoginUser = () => {
    axios.post('https://digitalcampus.nerdy-bear.com/api/auth/local', {
      identifier: identifiant,
      password: password
    })
      .then(function (response) {
        setLogin(1);
        const { data } = response;
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          jwt: data.jwt,
        });//on set dans le context User ses informations
      })
      .catch(function (error) {
        console.log(error);
        setIdentifiant('');
        setPassword('');
        Alert.alert('Identifiant ou mot de passe incorrect')
      });//si le password est incorrect, on reset les inputs et affiche une alert 
  }


  return (
    <View style={styles.container}>
      <View style={styles.viewRegister}>
        <Text>Connexion</Text>
        <TextInput
          style={styles.inputRegister}
          placeholder="Identifiant"
          value={identifiant}
          onChangeText={setIdentifiant}
          required
        />
        <TextInput
          style={styles.inputRegister}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          required
          secureTextEntry={true}
        />
        <Button
          title="Se connecter"
          onPress={() => LoginUser()}
        />
        <Button
          title="S'inscrire"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}