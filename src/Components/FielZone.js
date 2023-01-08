// React Native Get Clicked Location of Touchscreen Using PanResponder
// https://aboutreact.com/react-native-get-clicked-location-of-touchscreen-using-panresponder/

// import React in our code
import React, { useRef, useState } from "react";
import field from "../../assets/field.png";

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  PanResponder,
  Image,
  Button,
  Animated,
} from "react-native";
import { ShootPoint } from "./ShootPoint";

export const FieldZone = ({ src }) => {
  //   const pan = useRef(new Animated.ValueXY()).current;
  //   const locationY = pan?.y ?? 10;
  //   const locationX = pan?.x ?? 10;
  const [locations, setLocations] = useState([]);
  const [addingShoot, setAddingShoot] = useState(false);
  console.log("locations", locations);
  //panResponder initialization
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponderCapture: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (event, gestureState) => false,
    onPanResponderGrant: (event, gestureState) => false,
    onPanResponderMove: () => false,
    onPanResponderRelease: (event, gestureState) => {
      event.persist();
      if (!event.nativeEvent || !addingShoot) {
        console.log("Return event");
        return;
      }
      console.log(
        "event.nativeEvent?.locationX",
        event.nativeEvent?.locationX.toFixed(0)
      );
      setLocations((arr) => [
        ...arr,
        {
          x: Number(event.nativeEvent?.locationX.toFixed(0)),
          y: Number(event.nativeEvent?.locationY.toFixed(0)),
        },
      ]);
      setAddingShoot(false);
    },
  });

  return (
    <>
      {/* <Image
        source={src}
        className="w-full aspect-square bg-green-600 opacity-80"
        style={{
          width: undefined,
        }}
        resizeMode="contain"
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log("- - x, y, width, height ", { x, y, width, height });
        }}
      /> */}
      <View className="bg-black-200">
        <Button
          onPress={() => {
            setAddingShoot(true);
          }}
          title="Add shoot"
          accessibilityLabel="Add a shoot"
        />
      </View>
      {/* <Animated.Image
        source={src}
        className="w-full aspect-square bg-green-600 opacity-80"
        style={{
          width: undefined,
        }}
        resizeMode="contain"
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log("- - x, y, width, height ", { x, y, width, height });
        }}
        {...panResponder.panHandlers}
      /> */}
      <View style={styles.container}>
        <View style={styles.childViewStyle}>
          <Animated.Image
            source={src}
            className="w-full aspect-square bg-green-600 opacity-80"
            style={{
              width: undefined,
            }}
            resizeMode="contain"
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              console.log("- - x, y, width, height ", { x, y, width, height });
            }}
            {...panResponder.panHandlers}
          />
          {locations.map((location, index) => (
            <ShootPoint
              key={index}
              x={location.x}
              y={location.y}
              disabled={addingShoot}
            />
          ))}
          {/* <Animated.View
            style={{ flex: 1, backgroundColor: "transparent" }}
            {...panResponder.panHandlers}
          /> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleStyle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  childViewStyle: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#F5FCFF",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  pointStyle: {
    height: 22,
    width: 22,
    marginTop: 5,
    position: "absolute",
    borderRadius: 14,
    backgroundColor: "#00FF30",
  },
});
