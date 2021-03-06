import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import { styles } from '../../assets/styles'
import MapView from 'react-native-maps';
import axios from 'axios';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

export function PlacesScreen({ navigation }) {

    const { login, setLogin } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext);

    const [titre, setTitre] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [type, setType] = useState('');
    const [typeList, setTypeList] = useState([])


    const addPlaces = () => {
        axios.post('https://digitalcampus.nerdy-bear.com/api/places ', {
            data: {
                title: titre,
                address: address,
                latitude: latitude,
                longitude: longitude,
                users_permissions_user: user.id,
                type: type
            }
        },
            {
                headers: {
                    Authorization: "Bearer " + user.jwt
                }
            })
            .then(function (response) {
                setTitre('');
                setAddress('');
                setLatitude('');
                setLongitude('');
                setType(null);
                Alert.alert('Places ajouté')
            })
            .catch(function (error) {
                console.log(error);
                setTitre('');
                setAddress('');
                setLatitude('');
                setLongitude('');
                setType(null);
                Alert.alert('Informations incorrecte')
            });
    }

    async function getAllTypes() {
        let typeArray = []
        const res = await axios.get('https://digitalcampus.nerdy-bear.com/api/types',
            {
                headers: {
                    Authorization: "Bearer " + user.jwt
                }
            })
            .then(function (response) {
                const { data } = response;
                data.data.map((type) => {
                    //setTypeList(typeList => [...typeList, { label: type.attributes.name, value: type.id }])
                    typeArray.push({ label: type.attributes.name, value: type.id })

                })
                setTypeList(typeArray)
            })
            .catch(function (error) {
                console.log(error);
                Alert.alert('Informations incorrecte')
            }).then(function () {
                return typeArray
            });
            return res
    }

    useEffect(() => {
        getAllTypes();
    }, []);

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
                <RNPickerSelect
                    placeholder={{ label: "Choisir un type", value: null }}
                    onValueChange={(value) => setType(value)}
                    items={typeList}
                />
                <Button
                    title="Ajouter le places"
                    onPress={() => addPlaces()}
                />
            </View>
        </View>
    );
}