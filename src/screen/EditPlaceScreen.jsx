import { StyleSheet, Text, View, Button, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from '../context/context';
import { UserContext } from '../context/context';
import { styles } from '../../assets/styles'
import MapView from 'react-native-maps';
import axios from 'axios';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import CheckBox from 'expo-checkbox';

export function EditPlaceScreen({ navigation, route }) {

    const { login, setLogin } = useContext(LoginContext);
    const { user, setUser } = useContext(UserContext);

    const [titre, setTitre] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [comment, setComment] = useState('');
    const [currentPlace, setCurrentPlace] = useState('');
    const [type, setType] = useState('');
    const [typeList, setTypeList] = useState([])
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const updatePlace = (place) => {
        axios.put(`https://digitalcampus.nerdy-bear.com/api/places/${place.id}`, {
            data: {
                title: titre,
                address: address,
                latitude: latitude,
                longitude: longitude,
                users_permissions_user: user.id,
                type: type,
                comment: comment,
                gone: toggleCheckBox,
                createdAt: place.createdAt,
                updatedAt: new Date(),
                publishedAt: place.publishedAt,
                createdBy: place.createdBy,
                updatedBy: user.id
            }
        },
            {
                headers: {
                    Authorization: "Bearer " + user.jwt
                }
            })
            .then(function (response) {
                //Alert.alert('Places modifié')
                Alert.alert(
                    "Places modifié",
                    "Retourné à la liste",
                    [
                        {
                            text: "Ok",
                            onPress: () => navigation.navigate('ManagePlaces'),
                            style: "Ok",
                        },
                    ],
                );

            })
            .catch(function (error) {
                console.log(error);
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
        if (route.params?.place) {
            setCurrentPlace(route.params?.place)
            let oldData = route.params?.place.attributes
            setTitre('' + oldData.title)
            setAddress('' + oldData.address)
            setLatitude('' + oldData.latitude)
            setLongitude('' + oldData.longitude)
            setComment(oldData.comment)
            setToggleCheckBox(oldData.gone)
        }
    }, [route.params?.place]);

    useEffect(() => {
        getAllTypes();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.viewRegister}>
                <Text>Edition d'un places</Text>
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
                <TextInput
                    style={styles.inputRegister}
                    placeholder="Comment"
                    value={comment}
                    onChangeText={setComment}
                    required
                />
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30, marginTop: 10 }}>
                    <Text>Déjà visité: </Text>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                </View>

                <RNPickerSelect
                    placeholder={{ label: "Choisir un type", value: null }}
                    onValueChange={(value) => setType(value)}
                    items={typeList}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Modifier le places"
                        onPress={() => updatePlace(currentPlace)}
                    />
                </View>
            </View>
        </View>
    );
}