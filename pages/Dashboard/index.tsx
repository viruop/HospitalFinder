import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import HospitalList from "../../components/HospitalList";

const Dashboard: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      await getHospitals(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const getHospitals = async (location: Location.LocationObject) => {
    setLoading(true);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude}%2C${location.coords.longitude}&radius=2000&type=hospital&key=AIzaSyAPJaKjvjTVPRA87sdPM6Jg-2bPS0BNsMU`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("res", res.results);
        setHospitals(res.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <HospitalList hospitals={hospitals} />
      ) : (
        <Text>loading...</Text>
      )}

      {/* <MapView initialRegion={initialRegion} style={styles.map}>
        <Marker coordinate={initialRegion} title="My Location" />
      </MapView> */}
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
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Dashboard;
