import DatePicker from "@/components/ui/DatePicker";
import { db } from "@/lib/db/client";
import { categories, CategorySelect } from "@/lib/schema/db/categories";
import { EntryInsert } from "@/lib/schema/db/entries";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const [entry, setEntry] = useState<Partial<EntryInsert>>({
    date: Date.now(),
  });

  const setTitle = (title: string) => {
    setEntry((entry) => ({ ...entry, title }));
  };
  const setIsNecessary = (isNecessary: boolean) => {
    setEntry((entry) => ({ ...entry, isNecessary }));
  };
  const setDate = (e: DateTimePickerEvent) => {
    const date = e.nativeEvent.timestamp;
    setEntry((entry) => ({ ...entry, date }));
  };
  const setAmount = (amount: string) => {
    const numberAmount = Number(amount.replace(/[^0-9.-]+/g, ""));

    setEntry((entry) => ({ ...entry, amount: numberAmount }));
  };
  const setCategoryId = (category: CategorySelect) => {
    setEntry((entry) => ({ ...entry, categoryId: category.id }));
  };

  return (
    <View>
      <View className="flex-row">
        <Text className="text-blue-400">Titulo:</Text>
        <TextInput
          onChangeText={setTitle}
          className="bg-gray-800 text-white rounded-lg px-4 py-2"
          placeholder="compra en el supermercado"
          placeholderTextColor="#d1d5db"
        />
      </View>
      <View className="flex-row">
        <Text className="text-blue-400">Necesario:</Text>
        <Checkbox value={entry?.isNecessary} onValueChange={setIsNecessary} />
      </View>
      <View className="flex-row">
        <Text className="text-blue-400">Fecha:</Text>
        <DatePicker
          value={new Date(entry.date ?? Date.now())}
          onChange={setDate}
        />
      </View>
      <View className="flex-row">
        <Text className="text-blue-400">Cantidad:</Text>
        <View className="flex-row bg-gray-800 rounded-lg px-4 py-2 justify-center items-center">
          <TextInput
            onChangeText={setAmount}
            keyboardType="numeric"
            className="text-white py-0"
            placeholder="10"
            placeholderTextColor="#d1d5db"
            value={entry.amount ? entry.amount.toString() : undefined}
          />
          <Text className="text-white pl-1">€</Text>
        </View>
      </View>
      <View>
        <Text className="text-blue-400">Categoria:</Text>
        <CategorySelector
          onChange={setCategoryId}
          selectedCategoryId={entry.categoryId ?? 0}
        />
      </View>
      <Text className="text-white">{JSON.stringify(entry)}</Text>
    </View>
  );
}

interface CategorySelectorProps {
  onChange: (category: CategorySelect) => void;
  selectedCategoryId: number;
}

function CategorySelector({
  onChange,
  selectedCategoryId,
}: CategorySelectorProps) {
  const findedCategories = useLiveQuery(db.select().from(categories));

  return <Text>{JSON.stringify(findedCategories)}</Text>;
}
