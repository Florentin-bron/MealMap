import { StyleSheet, Text, View, Button, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Card } from 'react-native-shadow-cards';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import { styles } from '../../assets/styles'
import MapView from 'react-native-maps';
import axios from 'axios';


export function ManagePlacesScreen({ navigation }) {

    const { login, setLogin } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext);

    const [places, setPlaces] = useState([]);

    const getPlaces = () => {
        if (places.length == 0) {
            axios.get('https://digitalcampus.nerdy-bear.com/api/places?populate=users_permissions_user&pagination[limit]=10000000',
                {
                    headers: {
                        Authorization: "Bearer " + user.jwt
                    },
                })
                .then(function (response) {
                    const { data } = response;
                    let filteredPlaces = []
                    data.data.map((place) => {
                        if(place.attributes.users_permissions_user.data != null && place.attributes.users_permissions_user.data.id == user.id){
                            filteredPlaces.push(place);
                        }
                    })
                    setPlaces(filteredPlaces)
                })
                .catch(function (error) {
                    console.log(error);
                    Alert.alert('Erreur de récupération')
                })
        }

    }

    const removePlaces = (id) =>{
        axios.delete(`https://digitalcampus.nerdy-bear.com/api/places/${id}`,
        {
            headers: {
                Authorization: "Bearer " + user.jwt
            },
        })
        .then(function (response) {
            const { data } = response;
            let deletedPlaces = places
            deletedPlaces = deletedPlaces.filter(
                (place) => place.id !== id
              )
            setPlaces(deletedPlaces);
        })
        .catch(function (error) {
            console.log(error);
            Alert.alert('Erreur de récupération')
        })    }

        const editPlaces = (place) =>{
            navigation.navigate({
                name: 'EditPlace',
                params: { place: place },
                merge: true,
              });
        }

    useEffect(() => {
        getPlaces();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, width: "100%" }}>
                {places.length > 0 ? (
                    <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{alignItems: "center"}}
                    >
                        {places.map((place) => (
                            <View key={place.id}>
                                <Card style={{ padding: 20, margin: 5 }}>
                                    <Text style={{ paddingRight: 80 }}>
                                        {place.attributes.title}
                                    </Text>
                                    <Text
                                        style={styles.removeBtn}
                                        onPress={() => removePlaces(place.id)}
                                    >
                                        &times;
                                    </Text>
                                    <Text
                                        style={styles.editBtn}
                                        onPress={() => editPlaces(place)}
                                    >
                                        🖊
                                    </Text>
                                </Card>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text>Aucun places !</Text>
                )}
            </View>
        </View>
    );
}