import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constant";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserAuth } from "@/types/auth";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<UserAuth>();

  const onSignIn: SubmitHandler<UserAuth> = (data) => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋🏻
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your Email"
            icon={icons.email}
            {...register("email", { required: true })}
          />
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            secureTextEntry={true}
            {...register("password", { required: true })}
          />
          <CustomButton title="Sign In" className="mt-6" />

          {/* OAuth */}
          <OAuth />
          <Link
            href={"/sign-up"}
            className="text-md text-center text-general-200 mt-5"
          >
            <Text>Don't have an account ? </Text>
            <Text className="text-primary-500">Sign up </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
