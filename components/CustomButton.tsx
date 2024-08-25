import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ButtonProps } from "../types/type";
import { twMerge } from "tailwind-merge";

export const getBgVariantStyle = (
  variant: ButtonProps["bgVariant"]
): string => {
  switch (variant) {
    case "secondary":
      return "bg-gray-600";
    case "danger":
      return "bg-red-600";
    case "success":
      return "bg-green-600";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

export const getTextVariantStyle = (
  variant: ButtonProps["textVariant"]
): string => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton: FC<ButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...prop
}) => {
  return (
    <TouchableOpacity
      className={twMerge(
        `w-full rounded-full flex flex-row p-3 justify-center items-center shadow-md shadow-neutral-400/70`,
        getBgVariantStyle(bgVariant),
        className
      )}
      onPress=
      {onPress}
      {...prop}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={twMerge(
          `text-lg font-bold text-white `,
          getTextVariantStyle(textVariant)
        )}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
