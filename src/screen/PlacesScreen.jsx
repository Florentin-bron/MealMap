import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import { styles } from '../../assets/styles'
import MapView from 'react-native-maps';
import axios from 'axios';


export function PlacesScreen({ navigation }) {

    const { login, setLogin } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext);

    const [titre, setTitre] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const addPlaces = () => {
        axios.post('https://digitalcampus.nerdy-bear.com/api/places ', {
            data:{
                title: titre,
                address: address,
                latitude: latitude,
                longitude: longitude,
                users_permissions_user: user.id
            }
        },
        {
            headers: {
               Authorization: "Bearer " + user.jwt
            }
         })
          .then(function (response) {
            Alert.alert('Places ajouté')
          })
          .catch(function (error) {
            console.log(error);
            setTitre('');
            setAddress('');
            setLatitude('');
            setLongitude('');
            Alert.alert('Informations incorrecte')
          });
      }
    
    return (
        <View style={styles.container}>
            <View style={styles.viewRegister}>
                <Text>Ajout d'un places</Text>
                <TextInput
                    style={styles.inputRegister}
                    placeholder="Titre"
                    value={titre}
                    onChangeText={setTitre}
                    required
                />
                <TextInput
                    style={styles.inputRegister}
                    placeholder="Adresse"
                    value={address}
                    onChangeText={setAddress}
                    required
                />
                <TextInput
                    style={styles.inputRegister}
                    placeholder="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                    required
                />
                <TextInput
                    style={styles.inputRegister}
                    placeholder="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                    required
                />
                <Button
                    title="Ajouter le places"
                    onPress={() => addPlaces()}
                />
            </View>
        </View>
    );
}