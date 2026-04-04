import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-hive-primary border-hive-primary";
      case "secondary":
        return "bg-hive-secondary border-hive-secondary";
      case "outline":
        return "bg-transparent border-hive-border";
      default:
        return "bg-hive-primary border-hive-primary";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-2";
      case "md":
        return "px-4 py-3";
      case "lg":
        return "px-6 py-4";
      default:
        return "px-4 py-3";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "primary":
      case "secondary":
        return "text-hive-accent";
      case "outline":
        return "text-hive-onSurface";
      default:
        return "text-hive-accent";
    }
  };

  const getTextSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const baseStyles = "rounded-lg border items-center justify-center flex-row";
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const disabledStyles = disabled || loading ? "opacity-50" : "";

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading && (
        <ActivityIndicator size="small" color="#f9f6deff" className="mr-2" />
      )}
      <Text
        className={`font-semibold ${getTextStyles()} ${getTextSizeStyles()}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
