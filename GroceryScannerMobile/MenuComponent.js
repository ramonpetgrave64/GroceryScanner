// ScannerMarket
//
import React, { Component } from 'react';
import {
        Text,
        View,
        Image,
        TouchableHighlight,
        Button
} from 'react-native';

export default class HeaderComponent extends Component {
    render() {
        return (<View style={{
            height: 90,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <TouchableHighlight style={{ marginLeft: 10, marginTop: 20 }}
                onPress={() => {

                }}>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('./assets/images/menuIcon.png')}
                />
            </TouchableHighlight>
        </View>);
    }
}
