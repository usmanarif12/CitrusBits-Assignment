import React, { Component } from 'react';
import { View, Text, Dimensions, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';

import Header from '../components/Header';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item } = this.props.route.params;
        const { url = '' } = item;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar backgroundColor='#333' barStyle='light-content' />
                <Header title='Preview'
                    onPress={() => this.props.navigation.goBack()}
                    backgroundColor='black'
                    opacity={0.9}
                    activeColor='white'
                    style={{ position: 'absolute', top: Platform.OS == 'ios' ? 40 : 0 }} />
                <ImageZoom cropWidth={Dimensions.get('window').width}
                    cropHeight={Dimensions.get('window').height}
                    imageWidth={width}
                    imageHeight={height}>
                    <Image style={{ width, height: height }}
                        source={{ uri: url }}
                        resizeMode='contain' />
                </ImageZoom>
            </SafeAreaView>
        );
    }
}
export default Preview;