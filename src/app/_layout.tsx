import { db } from "@/lib/db/client";
import migrations from "@/lib/drizzle/migrations";
import "@/styles/index.css";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Link, Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const migration = useMigrations(db, migrations);
  const pathname = usePathname();

  if (!migration.success) {
    return (
      <View className="flex-1 bg-gray-900 justify-center items-center">
        <Text className="text-white">No se ha podido migrar la Database</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "rgb(31 41 55)",
          },
          contentStyle: {
            backgroundColor: "rgb(17 24 39)",
          },
          title: "",
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable className="justify-center items-center active:opacity-75 ml-auto">
                <Text className="text-white">Settings</Text>
              </Pressable>
            </Link>
          ),
          headerLeft: () =>
            pathname !== "/" && (
              <Link href="../" asChild>
                <Pressable className="justify-center items-center active:opacity-75">
                  <Text className="text-white">Back</Text>
                </Pressable>
              </Link>
            ),
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Stack>
    </View>
  );
}
