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
    })

    return(
        <View
            style={styles.container}
        >
            <Text>MovieFormScreen</Text>
        </View>
    )
}

export default MovieFormScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
