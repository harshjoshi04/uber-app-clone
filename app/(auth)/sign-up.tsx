import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constant";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { UserAuth } from "@/types/auth";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const [formValues, setformValues] = useState<UserAuth>({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  const [verification, setverification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUp = async () => {
    if (!isLoaded) {
      return;
    }
    console.log("Test");
    try {
      await signUp.create({
        emailAddress: formValues.email,
        password: formValues.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setverification((prev) => ({ ...prev, state: "pending" }));
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    // TODO
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setverification((prev) => ({ ...prev, state: "success" }));
      } else {
        setverification((prev) => ({
          ...prev,
          state: "error",
          error: "verification error !",
        }));
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
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
            value={formValues.name}
            onChangeText={(e) =>
              setformValues((prev) => ({ ...prev, name: e }))
            }
          />
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
          <CustomButton onPress={onSignUp} title="Sign Up" className="mt-6" />

          {/* OAuth */}
          <OAuth />
          <Link
            href={"/sign-in"}
            className="text-md text-center text-general-200 mt-5"
          >
            <Text>Already have a account ? </Text>
            <Text className="text-primary-500">Log in </Text>
          </Link>
        </View>
      </View>

      {/* Pending Modal */}
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() =>
          setverification((prev) => ({ ...prev, state: "success" }))
        }
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] ">
          <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verification
          </Text>

          <Text>We've send a verifcation code to {formValues.email}</Text>
          <InputField
            label="code"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(e) =>
              setverification((prev) => ({ ...prev, code: e }))
            }
          />
          <CustomButton
            title="Verify Email"
            className="mt-3"
            onPress={onPressVerify}
            bgVariant="success"
          />
        </View>
      </ReactNativeModal>
      {/* Verfied Modal */}
      <ReactNativeModal isVisible={verification.state === "success"}>
        <View className="bg-white rounded-2xl px-7 py-9 min-h-[300px] space-y-2">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Verified{" "}
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center">
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => router.push("/(root)/(tabs)/home")}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
