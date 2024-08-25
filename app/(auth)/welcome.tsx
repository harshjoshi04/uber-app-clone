import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constant";
import CustomButton from "../../components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setactiveIndex] = useState(0);

  const isLastIndex = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-between pb-4">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5 "
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setactiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View className="flex items-center justify-center" key={item.id}>
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex  items-center justify-center w=full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center ">
                {item.title}
              </Text>
              <Text className="text-md font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585]">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastIndex ? "Get Started" : "Next"}
        onPress={() =>
          isLastIndex
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mx-4"
        bgVariant="primary"
      />
    </SafeAreaView>
  );
};

export default Welcome;
