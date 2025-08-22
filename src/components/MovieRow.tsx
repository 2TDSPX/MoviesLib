import { StyleSheet, Text, View, Image } from 'react-native'

export type Movie = {
    id: number;
    title: string;
    categories: string;
    duration: string;
    rating: number;
    synopsis: string;
    poster: string;
}

export default function MovieRow({movie}: {movie: Movie}) {
    return(
        <View style={ styles.container }>
            <Image
                source={ {uri: movie.poster } }
                style={ styles.image }
            />
            <Text style={ styles.title }>{movie.title}</Text>
            <Text style={ styles.rating }>{`${movie.rating}/10`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        width: 50,
        height: 80,
        borderRadius: 8,
        marginLeft: 12
    },
    title: {
        marginHorizontal: 10,
        fontSize: 16,
        width: '50%'
    },
    rating: {
        flex: 1,
        textAlign: 'right',
        fontSize: 14,
        color: "#666",
        marginRight: 12
    }
})