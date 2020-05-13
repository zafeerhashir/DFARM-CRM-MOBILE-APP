import React from "react";
import { ActivityIndicator, View } from "react-native";
import color from '../assets/color/Index';


function TransparentActivityIndicator () 
 {

    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3000,
          position: "absolute",
          top: -5,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(255,255,255,0.5)",
          elevation: 5,
          height: "100%",
          width: "100%"
        }}
      >
        <ActivityIndicator  color={color.themeColor} size="large" />
      </View>
    );
  
}
export { TransparentActivityIndicator };

