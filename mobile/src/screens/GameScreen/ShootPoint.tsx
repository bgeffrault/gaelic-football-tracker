import { memo, useRef } from "react";
import { Animated, PanResponder, TouchableOpacity, View } from "react-native";

const POINT_SIZE = 20;
const halfPointSize = POINT_SIZE / 2;

const OPACITIES = {
  active: 1,
  inactive: 0.8,
  disabled: 0.5,
};

export const ShootPoint = memo(({ x, y, disabled, fieldSize, color, onPress }: {
  x: number;
  y: number;
  disabled: boolean;
  fieldSize: { width: number; height: number; };
  color: string;
  onPress: () => void;
}) => {
  const pan = useRef(
    new Animated.ValueXY({ x, y }, { useNativeDriver: false })
  ).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // @ts-ignore
          x: pan.x._value,
          // @ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: (e, gestureState) =>
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: "absolute",
        // @ts-ignore
        x: -halfPointSize,
        y: -halfPointSize,
        transform: [
          {
            translateX: pan.x.interpolate({
              inputRange: [0, fieldSize.width],
              outputRange: [0, fieldSize.width],
              extrapolate: "clamp",
            }),
          },
          {
            translateY: pan.y.interpolate({
              inputRange: [0, fieldSize.height],
              outputRange: [0, fieldSize.height],
              extrapolate: "clamp",
            }),
          },
        ],
        zIndex: 100,
        width: POINT_SIZE,
        height: POINT_SIZE,
      }}
      {...panResponder.panHandlers}

    >
      <TouchableOpacity
        style={{
          transform: [
            { translateX: -halfPointSize },
            { translateY: -halfPointSize },
          ],
          height: POINT_SIZE,
          width: POINT_SIZE,
          backgroundColor: color,
          borderRadius: halfPointSize,
          opacity: disabled ? OPACITIES.disabled : OPACITIES.inactive,
          zIndex: 100,
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <View />
      </TouchableOpacity>
    </Animated.View>
  );
});
