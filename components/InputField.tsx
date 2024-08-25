import React, { FC } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { twMerge } from "tailwind-merge";
import { InputFieldProps } from "../types/type";

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  secureTextEntry,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...prop
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={twMerge(
              `text-lg font-JakartaSemiBold mb-3 `,
              labelStyle
            )}
          >
            {label}
          </Text>
          <View
            className={twMerge(
              `flex flex-row justify-center items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-100 `,
              containerStyle
            )}
          >
            {icon && (
              <Image
                source={icon}
                className={twMerge("w-6 h-6 ml-4 ", iconStyle)}
              />
            )}
            <TextInput
              className={twMerge(
                "rounded-full p-2 font-JakartaSemiBold text-[15px] flex-1 text-left",
                inputStyle
              )}
              secureTextEntry={secureTextEntry}
              {...prop}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
