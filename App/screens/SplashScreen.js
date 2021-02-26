import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F08080' }}>
                <StatusBar backgroundColor='#F08080' barStyle='light-content' />
                <Text style={{ fontSize: 20 }}>Citrusbits</Text>
                <Text style={{ fontSize: 14 }}>Code Assignment </Text>
            </SafeAreaView>
        );
    }
}
