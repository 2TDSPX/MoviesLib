// React Native Maps
// Expo Location
// React Native Maps Directions

import { useEffect, useRef, useState, useContext } from "react"
import { View, StyleSheet, Text, ActivityIndicator, TextInput, Keyboard, TouchableOpacity } from "react-native"
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'
import MapViewDirections from "react-native-maps-directions"
import { searchPOIs, GOOGLE_API_KEY } from "../services/placesService"

import { AppContext } from "../../App"
import { APP_COLORS } from "../colors/colors"

const MapScreen = () => {
    const [location, setLocation] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("")
    const [pois, setPois] = useState<any[]>([])
    const [selectedPoi, setSelectedPoi] = useState<any>(null)
    const mapRef = useRef<MapView>(null)
    const { value, setValue } = useContext(AppContext)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                console.log("Permissão negada!!!")
                setLoading(false)
                return
            }
            let loc = await Location.getCurrentPositionAsync({})
            setLocation(loc.coords) // <= A propriedade coord contém as coordenadas do usuário
            setLoading(false)
        })()
    }, [])

    const searchPOIsHandler = async () => {
        if (!query || !location) return
        try {
            const results = await searchPOIs(location.latitude, location.longitude, query);
            console.log(results);
            setPois(results)
            setSelectedPoi(null)
            Keyboard.dismiss()
        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return(
            <View style={styles.center}>
                <ActivityIndicator size='large' color={APP_COLORS[Number(value)]} />
                <Text>Carregando localização...</Text>
            </View>
        )
    }
    
    if (!location) {
        return(
            <View style={styles.center}>
                <Text>Não foi possível obter a sua localização</Text>
            </View>
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={ { flex: 1 }}>
                {/* Campo de Busca */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o que deseja buscar (ex: cinema, restaurante...)"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={searchPOIsHandler}
                        returnKeyType='search'
                    />
                    <TouchableOpacity onPress={searchPOIsHandler}>
                        <Text style={{ color: APP_COLORS[Number(value)], fontSize: 18 }}>Pesquisar</Text>
                    </TouchableOpacity>
                </View>

                {/* Mapa */}
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    {/* Marker do usuário */}
                    <Marker
                        key="user-location"
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="Você está aqui"
                        pinColor={APP_COLORS[Number(value)]}
                    />

                    {/* Markers dos POIs */}
                    {pois.map((poi, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: poi.geometry.location.lat,
                                longitude: poi.geometry.location.lng
                            }}
                            title={poi.name}
                            pinColor="#d4c370ff"
                            description={poi.vicinity}
                            onPress={() => {
                                setSelectedPoi({
                                    latitude: poi.geometry.location.lat,
                                    longitude: poi.geometry.location.lng,
                                    name: poi.name
                                })

                                mapRef.current?.animateCamera({
                                    center: {
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    },
                                    pitch: 60,
                                    heading: 0,
                                    altitude: 800,
                                })
                            }}
                        />
                    ))}

                    {/* Rota até o POI selecionado */}
                    {selectedPoi && (
                        <MapViewDirections
                            origin={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            destination={selectedPoi}
                            apikey={GOOGLE_API_KEY}
                            strokeWidth={6}
                            strokeColor={APP_COLORS[Number(value)]}
                        />
                    )}
                </MapView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 8,
        height: 40
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        zIndex: 1,
    },
    map: {
        flex: 1
    }
})
