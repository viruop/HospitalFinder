import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//@ts-ignore
const Login: FC = ({ navigation }) => {
  const goToSecondPage = () => {
    navigation.navigate("dashboard");
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={goToSecondPage}>
        <Text style={styles.text}>{"Find near by hospitals"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6e2",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#fd907e",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default Login;
