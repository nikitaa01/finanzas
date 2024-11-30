import { db } from "@/lib/db/client";
import { entries } from "@/lib/db/schema/entries";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Text } from "react-native";

export default function HomeScreen() {
    const entriesRes = useLiveQuery(db.select().from(entries));

    return <Text className="text-blue-400">{JSON.stringify(entriesRes)}</Text>;
}
