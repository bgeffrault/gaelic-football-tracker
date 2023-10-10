import { View, PanResponder, Animated, Image } from "react-native";

import clsx from "clsx";
import { clone } from "lodash";
import { ShootPoint } from "./ShootPoint";
import { Field, Goal } from "../../../assets";
import { Shoots } from "../../gql/graphql";

export const getShootColor = {
  team: {
    point: "#B4E3A6",
    goal: "#8CB080",
    blocked: "#CAC9C0",
    missed: "#CAC9C0",
  },
  opponentTeam: {
    point: "#c38080",
    goal: "#c80f0f",
    blocked: "#CAC9C0",
    missed: "#CAC9C0",
  }
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
        onPress={() => onPress({ ...shoot })}
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

export function FieldZone({
  addingShoot,
  setAddingShoot,
  cn,
  teamGameState,
  onPress,
  isOpponentSelected
}: {
  addingShoot: AddingShoot | null;
  setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
  cn?: string;
  teamGameState: TeamShoots;
  onPress: (shoot: Shoot) => void;
  isOpponentSelected: boolean
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
  const type = isOpponentSelected ? "opponentTeam" : "team"

  return (
    <View className={clsx(cn)}>
      <View className="items-center" >
        <Image source={Goal} />
      </View>
      <View className="m-auto">
        <Animated.Image
          source={Field}
          style={FIELD_SIZE}
          resizeMode="contain"
          {...panResponder.panHandlers}
        />
        {!addingShoot && renderShoots(teamGameState.pointShoots, getShootColor[type].point, disabled, onPress)}
        {!addingShoot && renderShoots(teamGameState.goalShoots, getShootColor[type].goal, disabled, onPress)}
        {!addingShoot && renderShoots(teamGameState.blockedShoots, getShootColor[type].blocked, disabled, onPress)}
        {!addingShoot && renderShoots(teamGameState.missedShoots, getShootColor[type].missed, disabled, onPress)}
        {addingShoot && renderShoots([{ ...addingShoot.location, type: addingShoot.type }], getShootColor[type][addingShoot.type], disabled, onPress)}
      </View>
    </View>
  );
}
