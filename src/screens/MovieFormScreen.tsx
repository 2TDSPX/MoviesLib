import React, { useState, useLayoutEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from "react-native"
import { s, vs } from "react-native-size-matters"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { useRoute, useNavigation } from "@react-navigation/native"

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
                    <TouchableOpacity onPress={() => {}} style={ styles.button }>
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
        backgroundColor: '#eb4435',
        alignItems:  'center',
        justifyContent: 'center',
        borderRadius: 8
    }
})
