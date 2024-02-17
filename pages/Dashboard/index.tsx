import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import * as Location from "expo-location";
import { PlacesAPIResponse } from "../../types";
import { GMAP_API_KEY } from "@env";

const Dashboard: React.FC = ({ navigation }: any) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<PlacesAPIResponse["results"]>([]);
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
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude}%2C${location.coords.longitude}&radius=3000&type=hospital&key=${GMAP_API_KEY}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res: PlacesAPIResponse) => {
        setHospitals(res.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const getDetails = (hospital: PlacesAPIResponse["results"][0]) => {
    // console.log("place_id", place_id);
    navigation.navigate("modal", { hospital });
  };

  return (
    <View style={styles.container}>
      {location && !loading ? (
        <MapView
          initialRegion={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
          showsMyLocationButton
          style={styles.map}
        >
          {hospitals?.map((hospital, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: hospital.geometry.location.lat,
                longitude: hospital.geometry.location.lng,
              }}
              title="Hospital Location"
            >
              <Callout onPress={() => getDetails(hospital)}>
                <View style={styles.hospitalCard}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.address}>{hospital.vicinity}</Text>
                  {hospital.rating ? (
                    <Text style={styles.rating}>
                      Rating: {hospital.rating} ({hospital.user_ratings_total})
                    </Text>
                  ) : (
                    <Text style={styles.rating}>Rating not available</Text>
                  )}
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      ) : (
        <Text>loading...</Text>
      )}
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
  map: {
    width: "100%",
    height: "100%",
  },
  hospitalCard: {
    marginBottom: 16,
    flexShrink: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    color: "#666",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  rating: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  photo: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
  },
});

export default Dashboard;
