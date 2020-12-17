
import React from 'react';
import { TouchableOpacity, StyleSheet, Text, GestureResponderEvent } from 'react-native';

// Karte-Element

export class TableModul extends React.Component<{
    game: boolean,
    handleCardClicked: () => void
}> {
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
                fontSize: 100
            }

        });


        return (
            <TouchableOpacity style={ImageModulStyles.imageModul} onPress={() => this.props.handleCardClicked()}>
                <Text style={ImageModulStyles.TextStyle} > {this.props.game ? '🃏' : 'Start'}</Text>
            </TouchableOpacity>
        );
    }
}
  // -----