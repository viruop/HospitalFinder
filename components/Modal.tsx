import { View, Text, Image, StyleSheet } from "react-native";
import React, { FC, useLayoutEffect } from "react";

const Modal = ({ navigation, route }: any) => {
  const { hospital } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: hospital.name,
    });
  }, [navigation]);
  return (
    <View style={styles.hospitalCard}>
      <Text style={styles.hospitalName}>{hospital.name}</Text>
      <Text style={styles.address}>{hospital.vicinity}</Text>
      <Text style={styles.rating}>Rating: {hospital.rating}</Text>

      {/* <Image source={{ uri: hospital.icon }} style={styles.photo} /> */}
      {hospital.photos && hospital.photos.length > 0 && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${hospital.photos[0].photo_reference}&key=AIzaSyAPJaKjvjTVPRA87sdPM6Jg-2bPS0BNsMU`,
          }}
          style={styles.photo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  hospitalCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  address: {
    color: "#666",
    marginBottom: 8,
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

export default Modal;

{
  /* <View>
<Text>Modal</Text>
</View> */
}
