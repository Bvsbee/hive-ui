import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  onLongPress,
  selected = false,
  className = "",
}) => {
  const selectedStyles = selected ? "bg-hive-secondary bg-opacity-20" : "";

  return (
    <TouchableOpacity
      className={`flex-row items-center p-4 border-b border-hive-border ${selectedStyles} ${className}`}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      {leftIcon && <View className="mr-3">{leftIcon}</View>}

      <View className="flex-1">
        <Text className="text-hive-accent font-medium text-base">{title}</Text>
        {subtitle && (
          <Text className="text-hive-onSurface text-sm opacity-75 mt-1">
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon && <View className="ml-3">{rightIcon}</View>}
    </TouchableOpacity>
  );
};
