import CustomButton from "@/components/CustomButton";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constant";
import { rideMock } from "@/lib/mockData";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const loading = false;

  const handleSignOut = () => {
    signOut();
    router.push("/(auth)/sign-up");
  };
  return (
    <SafeAreaView className="bg-general-500 h-full">
      <FlatList
        data={rideMock.slice(0, 5)}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => <RideCard ride={item} />}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <>
                <ActivityIndicator size="small" color={"#000"} />
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-lg font-JakartaExtraBold">
              Welcome{" "}
              {user &&
                user.emailAddresses.length &&
                user.emailAddresses[0].emailAddress.split("@")[0]}
            </Text>
            <TouchableOpacity
              onPress={handleSignOut}
              className="justify-center items-center w-10 h-10 rounded-full bg-white"
            >
              <Image source={icons.out} className="w-4 h-4" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
