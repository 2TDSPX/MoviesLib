import { View, StyleSheet, Text } from "react-native"

const SettingsScreen = () => {
    return(
        <View
            style={styles.container}
        >
            <Text>SettingsScreen</Text>
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
