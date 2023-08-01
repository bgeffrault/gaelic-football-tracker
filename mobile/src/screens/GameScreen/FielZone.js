import { View, PanResponder, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import clsx from "clsx";
import { clone } from "lodash";
import { ShootPoint } from "./ShootPoint";
import { Field, Goal } from "../../../assets";

export const FIELD_SIZE = {
  width: 350,
  height: 425,
};

const renderShootPoint = (shoots, color, addingScore) =>
  shoots
    .filter((shoot) => shoot.x && shoot.y)
    .map((shoot, index) => (
      <ShootPoint
        key={index}
        x={shoot.x ?? 0}
        y={shoot.y ?? 0}
        disabled={addingScore}
        fieldSize={FIELD_SIZE}
        color={color}
      />
    ));

const addingShoot = (teamState, key, location) => {
  const shoots = clone(teamState[key]);
  shoots.pop();
  shoots.push({ ...location, playerId: undefined });
  return shoots;
};

export function FieldZone({
  addingScore,
  scoreAdded,
  cn,
  teamState,
  updateTeamState,
  gameId,
}) {
  const navigation = useNavigation();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderGrant: () => false,
    onPanResponderMove: () => false,
    onPanResponderRelease: (event) => {
      event.persist();
      if (!event.nativeEvent || !addingScore) {
        return;
      }
      const location = {
        x: Number(event.nativeEvent?.locationX.toFixed(0)),
        y: Number(event.nativeEvent?.locationY.toFixed(0)),
      };
      const shoots = addingShoot(teamState, addingScore, location);
      updateTeamState({ [addingScore]: shoots });
      scoreAdded();
      navigation.navigate("SelectPlayer", { gameId });
    },
  });

  return (
    <View className={clsx(cn)}>
      <View className="items-center">
        <Image source={Goal} />
      </View>
      <View className="m-auto">
        <Animated.Image
          source={Field}
          style={FIELD_SIZE}
          resizeMode="contain"
          {...panResponder.panHandlers}
        />
        {renderShootPoint(teamState.points, "#90CBD7", addingScore)}
        {renderShootPoint(teamState.goals, "#1C282B", addingScore)}
        {renderShootPoint(teamState.blocked, "#ddd", addingScore)}
        {renderShootPoint(teamState.missed, "#bbb", addingScore)}
      </View>
    </View>
  );
}
