import React, { Component } from 'react'
import axios from 'axios';
import { BASE_URL } from '../configs/config';

export default class WebApi {
    get(url) {
        return axios.get(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
    getUsersList() {
        const url = BASE_URL + 'users';
        return this.get(url);
    }
    getAlbums(userId) {
        let url = BASE_URL + 'albums?userId=' + userId;
        return this.get(url);
    }
    getPictures(id) {
        let url = BASE_URL + 'photos?albumId=' + id;
        return this.get(url);
    }

}