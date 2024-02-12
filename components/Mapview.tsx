import MapView, { Marker } from "react-native-maps";

const MyMap = () => {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
      <Marker coordinate={initialRegion} title="My Location" />
    </MapView>
  );
};

export default MyMap;
