import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import { images, colors } from '../configs/data';
import { ITEM_WIDTH, width, SPACING, height, } from '../configs/theme';

import WebApi from '../services/WebApis';
export const ITEM_HEIGHT = height * 0.18;
export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
        };
    }
    componentDidMount() {
        this.setState({ loading: true });
        new WebApi().getUsersList().then(response => {
            let tempUsers = [];
            const { status = 0, data = [] } = response || {};
            if (status == 200) {
                tempUsers = data.map((item, index) => ({
                    ...item,
                    image: images[index].image,
                    color: colors[index % colors.length],
                }))
                this.setState({ users: tempUsers, loading: false });
            }
        }).catch(error => {
            const { response = {} } = error || {};
            console.log("Error", response);
            this.setState({ loading: false });
        })
    }

    renderUsersList = ({ item }) => {
        const { name = '', email = '', color = '', username = '', address = {}, company = {} } = item || {};
        const { suite = '', street = '', city = '' } = address || {};

        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('AlbumsList', { item }) }} style={{ marginBottom: SPACING, height: ITEM_HEIGHT, }} >
                <View style={{ flex: 1, padding: SPACING }}>
                    <SharedElement id={`item.${item.id}.bg`} style={[StyleSheet.absoluteFillObject,]} >
                        <View style={[
                            StyleSheet.absoluteFillObject,
                            { backgroundColor: color, borderRadius: 16 }]} />
                    </SharedElement>
                    <SharedElement id={`item.${item.id}.name`} style={styles.name}>
                        <Text style={styles.name}>{name}</Text>
                    </SharedElement>
                    <View style={styles.bottomDetails}>
                        <View style={styles.row}>
                            <FontAwesome name='user-circle' size={15} color='#333' />
                            <Text style={styles.text}>@{username}</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name='mail' size={15} color='#333' />
                            <Text style={styles.text}>{email}</Text>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome name='briefcase' size={15} color='#333' />
                            <Text style={styles.text}>{company.name}</Text>
                        </View>
                        <View style={[styles.row, { width: '60%' }]}>
                            <Icon name='location' size={15} color='#333' />
                            <Text style={styles.text}>{suite}, {street}, {city}</Text>
                        </View>
                    </View>
                    <SharedElement id={`item.${item.id}.image`} style={styles.image}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </SharedElement>
                </View>

            </TouchableOpacity>
        )
    }
    render() {
        const { users = [], loading } = this.state;
        return (
            <SafeAreaView style={styles.RootContainer}>
                <StatusBar backgroundColor='#f4f4f4' barStyle='dark-content' />
                <Spinner
                    visible={loading}
                    color='black'
                    size='small'
                    overlayColor='transparent'
                />
                <FlatList
                    data={users}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: SPACING }}
                    renderItem={this.renderUsersList}
                />
                <SharedElement id='general.bg'>
                    <View style={styles.bg} />
                </SharedElement>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    RootContainer: {
        flex: 1,
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        position: 'absolute',
        marginTop: 18 * 0.2,
        marginLeft: SPACING - 6,
    },
    bottomDetails: {
        marginTop: SPACING,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        opacity: 0.7,
        marginLeft: SPACING - 10,
    },
    text: {
        fontSize: 11,
        marginLeft: SPACING - 10,
    },
    address: {
        fontSize: 11,
        opacity: 0.7,
        marginTop: 5,
        marginLeft: SPACING - 10,
    },
    image: {
        width: ITEM_HEIGHT * 0.8,
        height: ITEM_HEIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        right: 5,
    },
    bg: {
        position: 'absolute',
        backgroundColor: 'white',
        height,
        width,
        borderRadius: 32,
        transform: [{ translateY: height }]
    },
})