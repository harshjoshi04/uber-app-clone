import { icons } from "@/constant";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { driverMocks } from "@/lib/mockData";
import { useDriverStore, useLocationStore } from "@/store";
import { MarkerData } from "@/types/type";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const { selectedDriver } = useDriverStore();

  const [markers, setmarkers] = useState<MarkerData[]>([]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    if (Array.isArray(driverMocks)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkes = generateMarkersFromData({
        data: driverMocks,
        userLatitude,
        userLongitude,
      });
      setmarkers(newMarkes);
    }
  }, [driverMocks]);
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((item) => (
        <Marker
          key={item.id}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          title={item.title}
          image={
            selectedDriver === item.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}
    </MapView>
  );
};

export default Map;
