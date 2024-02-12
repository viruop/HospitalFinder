import { FC } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Login: FC = ({ navigation }: any) => {
  // const navigation = useNavigation();

  const goToSecondPage = () => {
    console.log("Navigating to SecondPage");
    navigation.navigate("dashboard");
  };
  return (
    <View style={styles.container}>
      <Text>This is the login page.</Text>
      <Button onPress={goToSecondPage} title="Go to Second Page" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
