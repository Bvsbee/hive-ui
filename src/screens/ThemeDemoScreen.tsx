import React from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MediaCard } from "../components/ui/MediaCard";
import { ListItem } from "../components/ui/ListItem";
import { Input } from "../components/ui/Input";

export const ThemeDemoScreen: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [inputError, setInputError] = React.useState("");

  const handleButtonPress = (buttonType: string) => {
    Alert.alert("Button Pressed", `You pressed the ${buttonType} button!`);
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (text.length < 3) {
      setInputError("Input must be at least 3 characters");
    } else {
      setInputError("");
    }
  };

  return (
    <ScrollView className="flex-1 bg-hive-primary p-4">
      <View className="mb-6">
        <Text className="text-hive-accent text-2xl font-bold mb-2">
          Hive Theme Demo
        </Text>
        <Text className="text-hive-onSurface text-base">
          Showcase of reusable UI components with the master theme
        </Text>
      </View>

      {/* Buttons Section */}
      <View className="mb-6">
        <Text className="text-hive-accent text-xl font-semibold mb-3">
          Buttons
        </Text>
        <View className="space-y-3">
          <Button
            title="Primary Button"
            onPress={() => handleButtonPress("Primary")}
            variant="primary"
          />
          <Button
            title="Secondary Button"
            onPress={() => handleButtonPress("Secondary")}
            variant="secondary"
          />
          <Button
            title="Outline Button"
            onPress={() => handleButtonPress("Outline")}
            variant="outline"
          />
          <Button
            title="Loading Button"
            onPress={() => handleButtonPress("Loading")}
            loading={true}
          />
          <Button
            title="Disabled Button"
            onPress={() => handleButtonPress("Disabled")}
            disabled={true}
          />
        </View>
      </View>

      {/* Cards Section */}
      <View className="mb-6">
        <Text className="text-hive-accent text-xl font-semibold mb-3">
          Cards
        </Text>
        <Card className="mb-4">
          <Card.Header>
            <Text className="text-hive-accent text-lg font-semibold">
              Card Header
            </Text>
          </Card.Header>
          <Card.Body>
            <Text className="text-hive-onSurface">
              This is the card body content. It can contain any content you want
              to display.
            </Text>
          </Card.Body>
          <Card.Footer>
            <Text className="text-hive-onSurface text-sm">Card Footer</Text>
          </Card.Footer>
        </Card>
      </View>

      {/* Media Cards Section */}
      <View className="mb-6">
        <Text className="text-hive-accent text-xl font-semibold mb-3">
          Media Cards
        </Text>
        <View className="flex-row space-x-4">
          <MediaCard
            title="Inception"
            posterUrl="https://via.placeholder.com/200x300/2D3B5C/f9f6deff?text=Poster"
            rating={8.8}
            year="2010"
            type="movie"
            onPress={() => Alert.alert("Media Pressed", "Inception")}
            onAddToList={() => Alert.alert("Added", "Added to list")}
            onViewDetails={() => Alert.alert("Details", "View details")}
          />
          <MediaCard
            title="Breaking Bad"
            rating={9.5}
            year="2008-2013"
            type="tv"
            onPress={() => Alert.alert("Media Pressed", "Breaking Bad")}
            onAddToList={() => Alert.alert("Added", "Added to list")}
            onViewDetails={() => Alert.alert("Details", "View details")}
          />
        </View>
      </View>

      {/* List Items Section */}
      <View className="mb-6">
        <Text className="text-hive-accent text-xl font-semibold mb-3">
          List Items
        </Text>
        <Card className="p-0">
          <ListItem
            title="My Favorite Movies"
            subtitle="12 items • Last updated 2 days ago"
            onPress={() => Alert.alert("List Pressed", "My Favorite Movies")}
          />
          <ListItem
            title="Anime Watchlist"
            subtitle="8 items • Last updated 1 week ago"
            onPress={() => Alert.alert("List Pressed", "Anime Watchlist")}
          />
          <ListItem
            title="Books to Read"
            subtitle="15 items • Last updated 3 days ago"
            selected={true}
            onPress={() => Alert.alert("List Pressed", "Books to Read")}
          />
        </Card>
      </View>

      {/* Input Section */}
      <View className="mb-6">
        <Text className="text-hive-accent text-xl font-semibold mb-3">
          Input Fields
        </Text>
        <Card>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={inputValue}
            onChangeText={handleInputChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={inputError}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value=""
            onChangeText={() => {}}
            secureTextEntry={true}
          />
        </Card>
      </View>
    </ScrollView>
  );
};
