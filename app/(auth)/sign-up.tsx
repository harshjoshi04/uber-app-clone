import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "../../constant";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px ]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
          />
          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
          />
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
          />
          <CustomButton title="Sign Up" className="mt-6" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
