
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import SplashScreen from './screens/SplashScreen';
import UsersList from './screens/UsersList';
import AlbumsList from './screens/AlbumsList';
import PhotosList from './screens/PhotosList';
import Preview from './screens/Preview';

const Stack = createStackNavigator();
const SharedElementStack = createSharedElementStackNavigator();
const Router = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    })
    const usersListStack = () => {
        return (
            <SharedElementStack.Navigator headerMode='none'>
                <SharedElementStack.Screen name='UsersList' component={UsersList} />
                <SharedElementStack.Screen name='AlbumsList' component={AlbumsList} options={() => ({
                    gestureEnabled: false,
                    transitionSpec: {
                        open: { animation: "timing", config: { duration: 500, easing: Easing.inOut(Easing.ease) }, },
                        close: { animation: "timing", config: { duration: 500, easing: Easing.inOut(Easing.ease) } }
                    },
                    cardStyleInterpolator: ({ current: { progress } }) => {
                        return {
                            cardStyle: {
                                opacity: progress
                            }
                        }
                    }
                })} />
            </SharedElementStack.Navigator>
        )
    }
    if (isLoading) {
        return (
            <SplashScreen />
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none'>
                    <Stack.Screen name='Users' component={usersListStack} />
                    <Stack.Screen name='PhotosList' component={PhotosList} />
                    <Stack.Screen name='Preview' component={Preview} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Router;
