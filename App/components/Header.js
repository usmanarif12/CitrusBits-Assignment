import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = ({
    title, onPress, backgroundColor, opacity, style, activeColor,
}) => (
        <SafeAreaView style={{
            width: '100%',
            height: 56,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 1,
            backgroundColor: backgroundColor,
            opacity: opacity,
            ...style
        }}>
            <AntDesign
                name='arrowleft'
                size={28}
                style={{
                    padding: 12,
                    position: 'absolute',
                    left: 0,
                    zIndex: 2
                }}
                color={activeColor}
                onPress={onPress}
            />
            <Text style={{ color: activeColor, padding: 12, fontSize: 18, fontWeight: 'bold' }}>
                {title}
            </Text>
        </SafeAreaView>
    );

export default Header;
