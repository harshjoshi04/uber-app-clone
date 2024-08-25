import CustomButton from "@/components/CustomButton";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <CustomButton
        title="Log out"
        onPress={() => {
          signOut();
          router.replace("/(auth)/sign-up");
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
