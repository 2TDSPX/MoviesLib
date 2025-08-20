import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import MovieRow from "../components/MovieRow";

import movies from '../data/movies.json'

const MovieListScreen = () => {
    const navigation = useNavigation();

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={ styles.title }>Filmes</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MovieFormScreen')}
                    >
                        <Text style={{ color: '#eb4435', fontSize: 32, fontWeight: 'black' }}>+</Text>
                    </TouchableOpacity>
                        
                </View>
                <FlatList
                    style={ styles.list }
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })}
                        >
                            <MovieRow movie={item} />
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default MovieListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee'
    },
    list: {
        marginVertical: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold'
    }
})
