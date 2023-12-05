import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { styles, theme } from "../styles/globalStyles"

const { width, height } = Dimensions.get("window")

export default function Loading() {

    return (
        <View 
            style={{height, width}} 
            className="absolute flex-row justify-center items-center flex-1"
        >
            {/* <Progress.CircleSnail 
                thickness={12} 
                size={160} 
                color={theme.backgroundYellow} 
                indeterminate={true}
            /> */}
            
            <ActivityIndicator 
                size={"large"}
                color={theme.backgroundYellow}
            />

            {/* <MotiView
                from= {{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2
                }}
                animate={{
                    width: 100 + 20,
                    height: 100 + 20,
                    borderRadius: (100 + 20) / 2
                }}
                transition={{
                    type: "timing",
                    duration: 1000,
                    loop: true
                }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100 / 2,
                    borderWidth: 100 / 2,
                    borderColor: '#eab308',
                    shadowColor: '#eab308',
                    shadowOffset: {
                        width: 0,
                        height: 0
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10 
                }}
            /> */}
        </View>
    )
}