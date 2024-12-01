import {
  AndroidNativeProps,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Pressable, Text } from "react-native";

export default function DatePicker({
  ...props
}: AndroidNativeProps & {
  value: string | Date;
  triggerClassName: string;
}) {
  const handleShowPicker = () => {
    DateTimePickerAndroid.open(props);
  };

  return (
    <Pressable
      onPress={handleShowPicker}
      className="bg-gray-800 py-2 px-4 rounded-lg active:scale-90 transition"
    >
      <Text className="text-white">
        {"toLocaleDateString" in props.value
          ? props.value.toLocaleDateString()
          : props.value}
      </Text>
    </Pressable>
  );
}
