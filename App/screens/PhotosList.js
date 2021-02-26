import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'

import WebApi from '../services/WebApis';
import Header from '../components/Header';

export default class PhotosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            loading: false,
            spinnerLoading: false
        };
    }

    componentDidMount() {
        const { album } = this.props.route.params;
        const { id = '' } = album || {};
        this.setState({ spinnerLoading: true })
        new WebApi().getPictures(id).then(response => {
            console.log('Photos', response);
            const { status = 0, data = [] } = response || {};
            if (status == 200) {
                this.setState({ photos: data, spinnerLoading: false })
            }

        }).catch(error => {
            const { response = {} } = error || {};
            console.log('Error', response);
            this.setState({ spinnerLoading: false })
        })
    }

    renderPhotos = ({ item, index }) => {
        const { thumbnailUrl = '' } = item;
        return (
            <TouchableOpacity style={styles.photoItem} onPress={() => this.props.navigation.navigate('Preview', { item })}>
                <Image source={{ uri: thumbnailUrl }} resizeMode='cover' style={styles.photo} onLoadStart={() => this.setState({ loading: true })} onLoadEnd={() => this.setState({ loading: false })} />
                {this.renderLoader()}
            </TouchableOpacity>
        )
    }

    renderLoader = () => {
        const { loading } = this.state;
        if (loading) {
            return (
                <View style={{ position: 'absolute', alignSelf: 'center', zIndex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color='black' size='small' animating={true} />
                </View>
            )
        }
    }

    render() {
        const { photos, spinnerLoading } = this.state;
        return (
            <SafeAreaView style={{ backgroundColor: "white" }}>
                <StatusBar backgroundColor='white' barStyle='dark-content' />
                <Header title='Photos' onPress={() => this.props.navigation.goBack()} backgroundColor='white' opacity={1} activeColor='#333' />
                <Spinner
                    visible={spinnerLoading}
                    color='black'
                    size='small'
                    overlayColor='transparent'
                />
                <FlatList
                    data={photos}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    renderItem={this.renderPhotos}
                    numColumns={3}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    photoItem: {
        width: '33%',
        height: 130,
        margin: '0.2%',
        marginVertical: 1,
        borderRadius: 6,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: '100%',
        height: '100%'
    }
})
