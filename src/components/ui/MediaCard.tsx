import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { Button } from "./Button";

interface MediaCardProps {
  title: string;
  posterUrl?: string;
  rating?: number;
  year?: string;
  type: "movie" | "tv" | "book" | "anime";
  onPress?: () => void;
  onAddToList?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  title,
  posterUrl,
  rating,
  year,
  type,
  onPress,
  onAddToList,
  onViewDetails,
  className = "",
}) => {
  const getTypeColor = () => {
    switch (type) {
      case "movie":
        return "text-blue-400";
      case "tv":
        return "text-green-400";
      case "book":
        return "text-purple-400";
      case "anime":
        return "text-pink-400";
      default:
        return "text-hive-accent";
    }
  };

  return (
    <Card className={`w-48 ${className}`} shadow="medium">
      <TouchableOpacity
        className="w-full"
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Card.Body className="p-0">
          {posterUrl ? (
            <Image
              source={{ uri: posterUrl }}
              className="w-full h-64 rounded-t-xl"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-64 bg-hive-secondary rounded-t-xl items-center justify-center">
              <Text className="text-hive-accent text-lg font-semibold">
                No Image
              </Text>
            </View>
          )}

          <View className="p-3">
            <Text
              className="text-hive-accent font-semibold text-base mb-1"
              numberOfLines={2}
            >
              {title}
            </Text>

            <View className="flex-row items-center justify-between mb-2">
              <Text className={`text-sm font-medium ${getTypeColor()}`}>
                {type.toUpperCase()}
              </Text>
              {year && (
                <Text className="text-hive-onSurface text-sm opacity-75">
                  {year}
                </Text>
              )}
            </View>

            {rating && (
              <View className="flex-row items-center mb-3">
                <Text className="text-yellow-400 text-sm mr-1">★</Text>
                <Text className="text-hive-accent text-sm">
                  {rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>
        </Card.Body>
      </TouchableOpacity>

      <Card.Footer className="p-3 pt-0">
        <View className="flex-row space-x-2">
          <Button
            title="Add to List"
            onPress={onAddToList || (() => {})}
            variant="secondary"
            size="sm"
            className="flex-1"
          />
          <Button
            title="Details"
            onPress={onViewDetails || (() => {})}
            variant="outline"
            size="sm"
            className="flex-1"
          />
        </View>
      </Card.Footer>
    </Card>
  );
};
