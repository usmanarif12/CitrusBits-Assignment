import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Platform
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element'
import MapView from 'react-native-maps';

import { SPACING, ITEM_WIDTH, width, height, } from '../configs/theme';
import { ITEM_HEIGHT } from './UsersList';
import WebApi from '../services/WebApis';
import Header from '../components/Header';

const TOP_HEADER_HEIGHT = height * 0.3;
const DURATION = 400;
class AlbumsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };
    }
    componentDidMount() {
        const { item } = this.props.route.params;
        const { id } = item || {};
        new WebApi().getAlbums(id).then(response => {
            const { status = 0, data = [] } = response || {};
            if (status == 200) {
                this.setState({ albums: data });
            }
        }).catch(error => {
            const { response = {} } = error || {};
            console.log('Error', response);
        })
    }
    render() {
        const { item } = this.props.route.params;
        const { id = '', color = '', name = '', image = '', username = '', address = {} } = item || {};
        const { geo = {} } = address || {};
        const { lat = '', lng = '' } = geo || {};
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={color} barStyle='light-content' />
                <Header
                    title=''
                    onPress={() => this.props.navigation.goBack()}
                    backgroundColor='transparent'
                    style={{ position: 'absolute', top: Platform.OS == 'ios' ? 40 : 0 }}
                />
                <SharedElement id={`item.${item.id}.bg`} style={[StyleSheet.absoluteFillObject]} >
                    <View style={[
                        StyleSheet.absoluteFillObject,
                        { backgroundColor: color, padding: SPACING, height: TOP_HEADER_HEIGHT + 32 }]} />
                </SharedElement>
                <SharedElement id={`item.${item.id}.name`}>
                    <Text style={styles.name}>{name}</Text>
                </SharedElement>
                <Text style={styles.userName}>@{username}</Text>
                <SharedElement id={`item.${item.id}.image`}>
                    <Image source={{ uri: image }} style={styles.image} />
                </SharedElement>
                <SharedElement id='general.bg' style={styles.bg}>
                    <View>
                        <View style={styles.mapContainer}>
                            <MapView style={styles.map}
                                scrollEnabled={false}
                                zoomControlEnabled={false}
                                zoomEnabled={false}
                                zoomTapEnabled={false}
                                initialRegion={{
                                    latitude: parseFloat(lat),
                                    longitude: parseFloat(lng),
                                    latitudeDelta: 0.03,
                                    longitudeDelta: 0.03,
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: parseFloat(lat),
                                        longitude: parseFloat(lng),
                                    }}
                                />
                            </MapView>
                        </View>
                        <View style={{ width: '100%', height: 40, marginTop: 10, paddingHorizontal: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15, textTransform: 'uppercase' }}>Albums</Text>
                        </View>
                        <View style={{ height: '60%' }}>
                            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                                {
                                    this.state.albums.map((album, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index.toString()}
                                                // animation='fadeInUp'
                                                // delay={(DURATION * 2) + index * 100}
                                                onPress={() => this.props.navigation.navigate('PhotosList', { album })}
                                                style={{ marginVertical: 5, zIndex: 5, justifyContent: 'center', borderColor: '#d3d3d3', borderBottomWidth: 1 }}>
                                                <Text style={styles.title}>{index + 1}. {album.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </SharedElement>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    name: {
        fontWeight: '700',
        fontSize: 20,
        position: 'absolute',
        top: Platform.OS == 'ios' ? TOP_HEADER_HEIGHT - SPACING * 6.5 : TOP_HEADER_HEIGHT - SPACING * 4,
        left: SPACING,
    },
    userName: {
        fontSize: 16,
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 2.2,
        left: SPACING,
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        top: Platform.OS == 'ios' ? TOP_HEADER_HEIGHT - ITEM_HEIGHT * 1 + 10 : TOP_HEADER_HEIGHT - ITEM_HEIGHT * 0.8 + 10,
        right: SPACING
    },
    bg: {
        position: 'absolute',
        backgroundColor: 'white',
        height,
        width,
        elevation: 2,
        borderRadius: 32,
        padding: SPACING,
        zIndex: 2,
        transform: [{ translateY: TOP_HEADER_HEIGHT }]
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: SPACING
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.8
    },
    mapContainer: {
        height: 130,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
AlbumsList.sharedElements = (route, otherRoute, showing) => {
    const { item } = route.params;
    return [
        {
            id: `item.${item.id}.bg`
        },
        {
            id: `item.${item.id}.name`
        },
        {
            id: `item.${item.id}.image`
        },
        {
            id: 'general.bg'
        }
    ]
}
export default AlbumsList;