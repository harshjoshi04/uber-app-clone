import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constant";

const OAuth = () => {
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 space-x-4">
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text className="text-md">OR</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>

      <CustomButton
        title="Log In with google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={() => {}}
      />
    </View>
  );
};

export default OAuth;
