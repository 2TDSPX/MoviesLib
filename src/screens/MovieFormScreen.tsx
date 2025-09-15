import React, { useState, useLayoutEffect, useContext } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native"
import { s, vs } from "react-native-size-matters"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { useRoute, useNavigation } from "@react-navigation/native"
import { addMovie, updateMovie } from "../services/movieService"
import { AppContext } from "../../App"
import { APP_COLORS } from "../colors/colors"

const MovieFormScreen = () => {
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("");
    const [duration, setDuration] = useState("");
    const [categories, setCategories] = useState("");
    const [poster, setPoster] = useState("");
    const [synopsis, setSynopsis] = useState("");

    const route = useRoute()
    const navigation = useNavigation()
    const movie = route.params?.movie ?? null;
    const onSave = route.params?.onSave; // Função de callback que usaremos para refresh
    const { value, setValue } = useContext(AppContext)

    function isValidUrl(text: string): boolean {
        try {
            const url = new URL(text)
            return url.protocol === "http:" || url.protocol === "https:"
        } catch {
            return false
        }
    }

    const handleSave = async () => {
        if (title.length == 0) {
            Alert.alert("Atenção", "Digite o título do filme")
            return
        }
        const parsedRating = parseFloat(rating.replace(',', '.'));
        if (Number.isNaN(parsedRating)) {
            Alert.alert("Atenção", "Informa um valor numérico para a nota (ex.: 8.5)")
            return
        }
        if (duration.length == 0) {
            Alert.alert("Atenção", "Digite a duração do filme")
            return
        }
        if (categories.length == 0) {
            Alert.alert("Atenção", "Digite as categorias do filme")
            return
        }
        if (isValidUrl(poster) == false) {
            Alert.alert("Atenção", "URL do pôster do filme inválida")
            return
        }
        if (synopsis.length == 0) {
            Alert.alert("Atenção", "Digite a sinopse do filme")
            return
        }
        const movieData = {
            title,
            rating: parsedRating,
            duration,
            categories,
            poster,
            synopsis,
        }
        try {
            let savedMovie
            if (movie) {
                savedMovie = await updateMovie(movie.id, movieData)
            } else {
                savedMovie = await addMovie(movieData)
            }
            if (onSave) {
                onSave(savedMovie)
            }
            navigation.goBack()
        } catch(error) {
            console.log(error)
            Alert.alert('Atenção', "Não foi possível salvar o filme. Tente novamente mais tarde!")
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({ title: movie == null ? "Cadastro" : "Edição" });
        if (movie) {
            setTitle(movie.title || "")
            setRating(movie.rating.toString() || "")
            setDuration(movie.duration || "")
            setCategories(movie.categories || "")
            setPoster(movie.poster || "")
            setSynopsis(movie.synopsis || "")
        }
    }, [])

    return(
        <SafeAreaProvider>
            <SafeAreaView style={ styles.container }>
                <ScrollView style={ { padding: 20 } }>
                    {/* Título */}
                    <Text style={ styles.sectionTitle }>TÍTULO</Text>
                    <TextInput
                        style={ styles.input }
                        value={ title }
                        onChangeText={ setTitle }
                        placeholder="Escreva o nome do filme"
                    />

                    {/* Nota e Duração */}
                    <Text style={ styles.sectionTitle }>NOTA E DURAÇÃO</Text>
                    <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
                        <TextInput
                            style={ styles.input }
                            value={ rating }
                            onChangeText={ setRating }
                            placeholder="Nota"
                        />
                        <TextInput
                            style={ styles.input }
                            value={ duration }
                            onChangeText={ setDuration }
                            placeholder="Duração"
                        />
                    </View>

                    {/* Categorias */}
                    <Text style={ styles.sectionTitle }>CATEGORIAS</Text>
                    <TextInput
                        style={ styles.input }
                        value={ categories }
                        onChangeText={ setCategories }
                        placeholder="Insira as principais categorias"
                    />

                    {/* Pôster */}
                    <Text style={ styles.sectionTitle }>PÔSTER</Text>
                    <TextInput
                        style={ styles.input }
                        value={ poster }
                        onChangeText={ setPoster }
                        placeholder="Insira a URL do pôster"
                    />

                    {/* Sinopse */}
                    <Text style={ styles.sectionTitle }>SINOPSE</Text>
                    <TextInput
                        style={ [styles.input, { height: vs(120) }] }
                        value={ synopsis }
                        onChangeText={ setSynopsis }
                        multiline
                        textAlignVertical='top'
                        placeholder="Sinopse do filme"
                    />
                </ScrollView>

                {/* Botão de Salvar */}
                <View style={ styles.buttonArea }>
                    <TouchableOpacity onPress={handleSave} style={ [styles.button, {backgroundColor: APP_COLORS[Number(value)]}] }>
                        <Text style={{color: 'white', fontSize: s(18) }}>
                            { movie == null ? "Cadastrar filme" : "Salvar alterações" }
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MovieFormScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f7'
    },
    sectionTitle: {
        fontSize: s(12),
        color: '#8d8d8d'
    },
    input: {
        flex: 1,
        height: vs(42),
        backgroundColor: 'white',
        borderRadius: s(8),
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20
    },
    buttonArea: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        height: 86
    },
    button: {
        flex: 1,
        alignItems:  'center',
        justifyContent: 'center',
        borderRadius: 8
    }
})
