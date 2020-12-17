import React from 'react';
import { TouchableOpacity, Button, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


// BUTTON-ELEMENTE
const ButtonElementsStyle = StyleSheet.create({
    // Steuer-Bereich
    ButtonStyle: {
        display: 'flex',
        fontSize: 60
    },
    ButtonStyleExtra: {
        display: 'flex',
        fontSize: 55,
        color: 'white',
        position: 'relative',
        top: -8
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        maxHeight: 59,
        marginTop: 7
    },
});

export class NiedrigerButton extends Button {
    render() {
        return (
            <TouchableOpacity onPress={() => alert('Niedriger geklickt!')}>
                <Text style={[ButtonElementsStyle.ButtonStyle, {}]}>⬇️</Text>
            </TouchableOpacity>
        );
    }
}
export class GleichButton extends Button {
    render() {
        return (
            <TouchableOpacity onPress={() => alert('Gleich geklickt!')}>
                <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={ButtonElementsStyle.linearGradient}>
                    <Text style={[ButtonElementsStyle.ButtonStyleExtra, {}]}>
                        =
            </Text>
                </LinearGradient>


            </TouchableOpacity >
        );
    }
}
export class HochButton extends Button {
    render() {
        return (
            <TouchableOpacity onPress={() => alert('Höher geklickt!')}>
                <Text style={[ButtonElementsStyle.ButtonStyle, {}]}>⬆️</Text>
            </TouchableOpacity>
        );
    }
}