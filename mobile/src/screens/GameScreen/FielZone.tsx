import { View, PanResponder, Animated, Image } from "react-native";

import clsx from "clsx";
import { clone } from "lodash";
import { ShootPoint } from "./ShootPoint";
import { Field, Goal } from "../../../assets";
import { Shoots } from "../../gql/graphql";

export const getShootColor = {
  point: "#B4E3A6",
  goal: "#8CB080",
  blocked: "#CAC9C0",
  missed: "#CAC9C0",
}

export const FIELD_SIZE = {
  width: 350,
  height: 425,
};

const renderShoots = (shoots: Shoot[], color: string, disabled: boolean, onPress: (shoot: Shoot) => void) =>
  shoots
    .filter((shoot) => shoot.x && shoot.y)
    .map((shoot, index) => (
      <ShootPoint
        key={index}
        x={shoot.x ?? 0}
        y={shoot.y ?? 0}
        disabled={disabled}
        fieldSize={FIELD_SIZE}
        color={color}
        onPress={() => onPress(shoot)}
      />
    ));

const addingShoot = (teamState, key, location) => {
  const shoots = clone(teamState[key]);
  shoots.pop();
  shoots.push({ ...location, playerId: undefined });
  return shoots;
};

export type Shoot = Pick<Shoots, "x" | "y" | "memberId" | "type">;
export type ShootType = "point" | "goal" | "missed" | "blocked"
export type TeamShoots = {
  pointShoots: Shoot[],
  goalShoots: Shoot[],
  missedShoots: Shoot[],
  blockedShoots: Shoot[],
  teamGameId: number,
}
export type AddingShoot = {
  type: ShootType, teamGameId: number, location: {
    x: number,
    y: number
  } | null
} | null

// @To do: do it for opponentTeamGame too
export function FieldZone({
  addingShoot,
  setAddingShoot,
  cn,
  teamGameState,
  onPress
}: {
  addingShoot: AddingShoot | null;
  setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
  cn?: string;
  teamGameState: TeamShoots;
  onPress: (shoot: Shoot) => void
}) {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderGrant: () => false,
    onPanResponderMove: () => false,
    onPanResponderRelease: (event) => {
      event.persist();
      if (!event.nativeEvent || !addingShoot) {
        return;
      }

      const location = {
        x: Number(event.nativeEvent?.locationX.toFixed(0)),
        y: Number(event.nativeEvent?.locationY.toFixed(0)),
      };
      setAddingShoot((shoot) => ({ ...shoot, location }));
    },
  });

  const disabled = Boolean(addingShoot);

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
        {renderShoots(teamGameState.pointShoots, getShootColor.point, disabled, onPress)}
        {renderShoots(teamGameState.goalShoots, getShootColor.goal, disabled, onPress)}
        {renderShoots(teamGameState.blockedShoots, getShootColor.blocked, disabled, onPress)}
        {renderShoots(teamGameState.missedShoots, getShootColor.missed, disabled, onPress)}
        {addingShoot && renderShoots([{ ...addingShoot.location }], getShootColor[addingShoot.type], disabled, onPress)}
      </View>
    </View>
  );
}
