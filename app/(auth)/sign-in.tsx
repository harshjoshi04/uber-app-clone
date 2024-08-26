import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constant";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserAuth } from "@/types/auth";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [formValues, setformValues] = useState<UserAuth>({
    email: "",
    password: "",
  });
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: formValues.email,
        password: formValues.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, formValues]);

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
            value={formValues.email}
            onChangeText={(e) =>
              setformValues((prev) => ({ ...prev, email: e }))
            }
          />
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons.lock}
            secureTextEntry={true}
            value={formValues.password}
            onChangeText={(e) =>
              setformValues((prev) => ({ ...prev, password: e }))
            }
          />
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

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
