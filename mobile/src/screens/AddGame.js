import { Text, View } from "react-native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateTime } from "luxon";
import { LabelledTextInput } from "../components/StyledTextInput";
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

export function AddGame({ navigation }) {
  const game = useSelector((state) => state.game);
  const { opponentName, duration, gameName, players, date } = game;

  const dispatch = useDispatch();

  const fields = [
    {
      label: "Nom de l'équipe adverse",
      placeholder: "Nantes A",
      value: opponentName,
      onChangeText: (value) => dispatch(setOpponentName(value)),
      required: true,
    },
    {
      label: "Durée du match",
      placeholder: "60",
      value: duration,
      onChangeText: (value) => dispatch(setDuration(value)),
      required: true,
      keyboardType: "number-pad",
    },
    {
      label: "Joueurs",
      placeholder: "Sélectionner les joueurs",
      value: players.length,
      required: true,
      type: "select",
      onPress: () => {
        navigation.navigate("MembersModal", { mode: "select" });
      },
      inputType: "number",
      displayType: "number",
    },
    {
      label: "Compétition",
      placeholder: "Coupe de bretagne",
      value: gameName,
      onChangeText: (value) => dispatch(setGameName(value)),
      required: false,
    },
    {
      label: "Date",
      value: DateTime.fromJSDate(new Date(date)),
      setDate: (value) => {
        dispatch(
          setGameDate(
            DateTime.fromFormat(value, "yyyy/MM/dd").toJSDate().toISOString()
          )
        );
      },
      required: false,
      type: "select",
      displayType: "date",
    },
  ];

  const isValid = fields.every((elem) => (elem.required ? elem.value : true));

  const handleOnPress = () => {
    const newGame = generateGameInitialState({ id: 10, ...game });
    dispatch(addGame(newGame));
    navigation.navigate("Game", { gameId: 10 });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Créer un match",
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center">
      <Card>
        <View>
          {fields.map(
            (
              {
                label,
                value,
                placeholder,
                onChangeText,
                onPress,
                required,
                type,
                setDate,
                displayType,
                keyboardType,
              },
              i
            ) =>
              type === "select" ? (
                <Select
                  key={label}
                  value={value}
                  onPress={onPress}
                  label={`${label}${required ? " *" : ""}`}
                  cn={i > 0 && "mt-4"}
                  setDate={setDate}
                  displayType={displayType}
                />
              ) : (
                <LabelledTextInput
                  key={label}
                  label={`${label}${required ? " *" : ""}`}
                  inputProps={{
                    placeholder,
                    onChangeText,
                    value,
                    keyboardType: keyboardType || "default",
                  }}
                  cn={i > 0 && "mt-4"}
                />
              )
          )}

          <View className="mt-8">
            <CustomButton
              variant="contained"
              disabled={!isValid}
              onPress={handleOnPress}
            >
              <Text className="text-white text-lg">C&apos;est parti</Text>
            </CustomButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
