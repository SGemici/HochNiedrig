
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Karte-Element

export class TableModul extends React.Component {
    render() {

        const ImageModulStyles = StyleSheet.create({
            // Bild-Bereich
            imageModul: {
                alignSelf: 'stretch',
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                borderWidth: 2,
                borderRadius: 30,
                borderColor: 'gray',

            },
            TextStyle: {
                fontSize: 100,
            }

        });


        return (
            <View style={ImageModulStyles.imageModul}>
                <Text style={ImageModulStyles.TextStyle} >🃏</Text>
            </View >
        );
    }
}
  // -----