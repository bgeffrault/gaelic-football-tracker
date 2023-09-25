import { Text, View } from "react-native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { Select } from "../components/Select";
import {
  setDate as setGameDate,
  setDuration,
  setGameName,
  setOpponentName,
} from "../stores/slices/gameSlice";
import { addGame, generateGameInitialState } from "../stores/slices/gamesSlice";
import { useAppSelector } from "../stores/store";
import { useClubIdContext } from "../providers/ClubIdProvider";
import { Control, FieldValues, useController, useForm } from "react-hook-form";
import { ControlledLabelledTextInput, ControlledSelect, Rules } from "../components/ControllesComponents";

type Field = {
  label: string;
  placeholder?: string;
  onPress?: () => void;
  rules?: Rules;
  name: string;
  type?: "select";
  setDate?: (value: string) => void;
  displayType?: "date" | "number";
  keyboardType?: "number-pad" | "default";
  inputType?: "number";
  defaultValue?: string;
}

const usePlayersWatcher = <T extends unknown>({ control }: {
  control: Control<FieldValues, T>
}) => {
  const players = useAppSelector((state) => state.game.players);
  const { field } = useController({
    control,
    defaultValue: [],
    name: "players",
    rules: { required: "Au moins un joueur est obligatoire" }
  })

  useEffect(() => {
    field.onChange(players.map((p) => Number(p.id)));
  }, [players]);
}

export function AddGame({ navigation }) {
  const clubId = useClubIdContext();

  const { control, handleSubmit } = useForm()

  // const dispatch = useDispatch();

  const fields: Field[] = [
    {
      name: "opponentName",
      label: "Nom de l'équipe adverse",
      placeholder: "Nantes A",
      rules: { required: "Le nom de l'équipe adverse est obligatoire" },
    },
    {
      name: "duration",
      label: "Durée du match",
      placeholder: "60",
      rules: { required: "La durée est obligatoire" },
      keyboardType: "number-pad",
    },
    {
      name: "players",
      label: "Joueurs",
      placeholder: "Sélectionner les joueurs",
      rules: { required: "Au moins un joueur est obligatoire" },
      type: "select",
      onPress: () => {
        navigation.navigate("MembersModal", { mode: "select" });
      },
      inputType: "number",
      displayType: "number",
    },
    {
      name: "gameName",
      label: "Compétition",
      placeholder: "Coupe de bretagne",
    },
    {
      name: "date",
      label: "Date",
      rules: { required: "La date est obligatoire" },
      type: "select",
      displayType: "date",
      defaultValue: DateTime.now().toJSDate().toISOString()
    },
  ];

  const handleOnPress = async (data) => {
    // mutation.mutate(data);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Créer un match",
    });
  }, [navigation]);
  usePlayersWatcher({ control });


  return (
    <View className="flex-1 justify-center items-center">
      <Card>
        <View>
          {fields.map(
            (
              {
                label,
                placeholder,
                name,
                onPress,
                type,
                setDate,
                displayType,
                keyboardType,
                rules,
                defaultValue
              },
              i
            ) =>
              type === "select" ? (
                <ControlledSelect
                  key={label}
                  onPress={onPress}
                  label={`${label}${rules?.required ? " *" : ""}`}
                  setDate={setDate}
                  displayType={displayType}
                  control={control}
                  rules={rules}
                  name={name}
                  defaultValue={defaultValue}
                />
              ) : (
                <ControlledLabelledTextInput
                  key={label}
                  label={`${label}${rules?.required ? " *" : ""}`}
                  inputProps={{
                    placeholder,
                    keyboardType: keyboardType || "default",
                  }}
                  cn={i > 0 && "mt-4"}
                  control={control}
                  rules={rules}
                  name={label}
                  defaultValue={defaultValue}
                />
              )
          )}
          <View className="mt-8">
            <CustomButton
              variant="contained"
              onPress={handleSubmit(handleOnPress)}
            >
              <Text className="text-white text-lg">C&apos;est parti</Text>
            </CustomButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
