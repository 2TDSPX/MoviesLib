import { View, StyleSheet, Text } from "react-native"

const MovieFormScreen = () => {
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
        backgroundColor: "#fff",
    },
})
