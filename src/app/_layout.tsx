import { db } from "@/lib/db/client";
import { entries } from "@/lib/db/schema/entries";
import migrations from "@/lib/drizzle/migrations";
import "@/styles/index.css";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
    const migration = useMigrations(db, migrations);

    useEffect(() => {
        if (migration.success)
            db.insert(entries)
                .values({ name: "Hello, World!", id: 1 })
                .execute();
    }, [migration.success]);

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
