import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  className?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  className = "",
  inputClassName = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? "border-hive-error"
    : isFocused
      ? "border-hive-accent"
      : "border-hive-border";

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-hive-accent font-medium text-sm mb-2">
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#f9f6deff80"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className={`bg-hive-surface border rounded-lg px-4 py-3 text-hive-accent text-base ${borderColor} ${inputClassName}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error && <Text className="text-hive-error text-sm mt-1">{error}</Text>}
    </View>
  );
};
