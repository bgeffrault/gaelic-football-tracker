import { View, PanResponder, Animated, Image } from "react-native";

import clsx from "clsx";
import { clone } from "lodash";
import { ShootPoint } from "./ShootPoint";
import { Field, Goal } from "../../../assets";
import { Shoots } from "../../gql/graphql";

export const FIELD_SIZE = {
  width: 350,
  height: 425,
};

const renderShoots = (shoots: Shoot[], color: string, disabled: boolean) =>
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
      />
    ));

const addingShoot = (teamState, key, location) => {
  const shoots = clone(teamState[key]);
  shoots.pop();
  shoots.push({ ...location, playerId: undefined });
  return shoots;
};

export type Shoot = Pick<Shoots, "x" | "y">;
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
}: {
  addingShoot: AddingShoot;
  setAddingShoot: React.Dispatch<React.SetStateAction<AddingShoot>>;
  cn?: string;
  teamGameState: TeamShoots;
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
        {renderShoots(teamGameState.pointShoots, "#90CBD7", disabled)}
        {renderShoots(teamGameState.goalShoots, "#1C282B", disabled)}
        {renderShoots(teamGameState.blockedShoots, "#ddd", disabled)}
        {renderShoots(teamGameState.missedShoots, "#bbb", disabled)}
        {addingShoot && renderShoots([{ ...addingShoot.location }], "#0FF", disabled)}
      </View>
    </View>
  );
}
