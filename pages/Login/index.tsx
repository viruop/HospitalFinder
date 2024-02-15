import { FC, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
  GoogleSignin,
  statusCodes,
  User,
} from "@react-native-google-signin/google-signin";

//@ts-ignore
const Login: FC = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId:
        "512253150791-3cm4hnrm3iqma4131vhll53aob64htba.apps.googleusercontent.com",
    });
    // Check if user is already signed in
    isSignedIn();
  }, []);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert("User is already signed in");
      // Set User Info if user is already signed in
      getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
    setGettingLoginStatus(false);
  };

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log("User Info --> ", info);
      setUserInfo(info);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
        console.log("User has not signed in yet");
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      setUserInfo(userInfo);
      setTimeout(() => {
        navigation.navigate("dashboard");
      }, 1000);
    } catch (error: any) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services Not Available or Outdated");
      } else {
        alert(error.message);
      }
    }
  };

  const signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  const goToSecondPage = () => {
    navigation.navigate("dashboard");
  };

  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.titleText}>Sign in to see nearby hospitals</Text>
          <View style={styles.container}>
            {userInfo !== null ? (
              <>
                <Image
                  source={{ uri: userInfo.user.photo! }}
                  style={styles.imageStyle}
                />
                <Text style={styles.text}>Name: {userInfo.user.name}</Text>
                <Text style={styles.text}>Email: {userInfo.user.email}</Text>
                <TouchableOpacity style={styles.buttonStyle} onPress={signOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonStyle2}
                  onPress={goToSecondPage}
                >
                  <Text>Find hospitals</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Pressable style={styles.button} onPress={signIn}>
                <Text style={styles.text}>{"Sign in with Google"}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6e2",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
    color: "black",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: "contain",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#fd907e",
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  buttonStyle2: {
    alignItems: "center",
    backgroundColor: "#fd907e",
    padding: 10,
    width: 300,
    marginTop: 30,
  },
});

export default Login;
