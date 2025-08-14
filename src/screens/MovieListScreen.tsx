import { View, StyleSheet, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";

const MovieListScreen = () => {

    const navigation = useNavigation();

    return(
        <View style={styles.container} >
            <Text>MovieListScreen</Text>
            <Button 
                title="Ir para detalhes"
                onPress={() => navigation.navigate("MovieDetailsScreen")}
            />
        </View>
    )
}

export default MovieListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
})
