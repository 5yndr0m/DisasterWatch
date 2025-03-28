import { ScrollView, Animated, Dimensions, View, BackHandler, Platform } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import { Button, Text } from "react-native-paper";
import "../global.css";

const { width, height } = Dimensions.get("window");

export default function WelcomePage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Handle back button press
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, []);

  const handleGetStarted = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      router.push("(tabs)/home");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          minHeight: height * 0.85,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View style={{ marginBottom: 32, alignItems: "center" }}>
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Welcome to
            </Text>
            <Text
              variant="displayMedium"
              style={{
                fontWeight: "800",
                textAlign: "center",
              }}
            >
              DisasterWatch
            </Text>
          </View>

          <Text
            variant="bodyLarge"
            style={{
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Stay informed and prepared for natural disasters in your area
          </Text>

          <View style={{ width: "100%", gap: 16 }}>
            <Button
              mode="contained"
              onPress={handleGetStarted}
              contentStyle={{
                height: 50,
              }}
              style={{
                borderRadius: 12,
              }}
              labelStyle={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.push("/signIn")}
              contentStyle={{
                height: 50,
              }}
              style={{
                borderRadius: 12,
                borderWidth: 2,
              }}
              labelStyle={{
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Sign In
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
