import React from "react";
import { View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: "soft" | "medium" | "hard" | "none";
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({ children, className = "", shadow = "soft" }) => {
  const shadowStyles = shadow !== "none" ? `shadow-${shadow}` : "";

  return (
    <View
      className={`bg-hive-surface border border-hive-border rounded-xl p-4 ${shadowStyles} ${className}`}
    >
      {children}
    </View>
  );
};

Card.Header = ({ children, className = "" }) => (
  <View className={`mb-3 ${className}`}>{children}</View>
);

Card.Body = ({ children, className = "" }) => (
  <View className={`mb-3 ${className}`}>{children}</View>
);

Card.Footer = ({ children, className = "" }) => (
  <View className={`mt-3 ${className}`}>{children}</View>
);
