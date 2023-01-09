import { memo, useRef } from "react";
import { Animated, PanResponder, View } from "react-native";

const POINT_SIZE = 20;
const OPACITIES = {
  active: 1,
  inactive: 0.8,
  disabled: 0.5,
};
export const ShootPoint = memo(({ x, y, disabled }) => {
  const pan = useRef(
    new Animated.ValueXY({ x, y }, { useNativeDriver: false })
  ).current;
  const test = "";
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // eslint-disable-next-line no-underscore-dangle
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event) => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        position: "absolute",
        x: -POINT_SIZE / 2,
        y: -POINT_SIZE / 2,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        zIndex: 100,
        width: POINT_SIZE,
        height: POINT_SIZE,
      }}
      {...panResponder.panHandlers}
    >
      <View
        style={{
          transform: [
            { translateX: -POINT_SIZE / 2 },
            { translateY: -POINT_SIZE / 2 },
          ],
          height: POINT_SIZE,
          width: POINT_SIZE,
          backgroundColor: "blue",
          borderRadius: "50%",
          opacity: disabled ? OPACITIES.disabled : OPACITIES.inactive,
          zIndex: 100,
        }}
      />
    </Animated.View>
  );
});
