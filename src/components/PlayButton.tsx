import { View, Text, StyleSheet } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

export default function PlayButton() {
    return(
        <View style={ styles.container }>
            <View style={ styles.playButton }>
                <FontAwesome6 name="play" size={18} color='#EB4435' />
            </View>
            <Text style={ styles.text }>Trailer</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#e8e8e8',
        height: 42,
        borderRadius: 21,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        alignSelf: 'flex-start'
    },
    playButton: {
        backgroundColor: 'white',
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        paddingLeft: 4
    },
    text: {
        marginLeft: 8,
        marginRight: 14,
        fontSize: 16,
        fontWeight: '600'
    }
})