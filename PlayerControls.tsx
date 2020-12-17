
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GleichButton, HochButton, NiedrigerButton } from './buttons';


// STEUER-ELEMENT
type ControlElementProps = {
    inverseOrder: boolean;
    transformRotateZ: string;
    gameState: boolean;
}
export class PlayerControls extends React.Component<ControlElementProps> {



    render() {

        const opacityValue = this.props.gameState ? 1 : 0.2;

        const ControlElementsStyle = StyleSheet.create({
            // Steuer-Bereich
            controlModul: {
                margin: '5%',
                justifyContent: 'space-evenly',
                width: '100%',
                flexDirection: 'row',
                padding: 2,
                transform: [
                    { rotateZ: "0deg" }
                ],
                borderWidth: 2,
                borderRadius: 30,
                borderColor: 'gray',
                opacity: opacityValue
            }

        });

        const flexDirection = this.props.inverseOrder ? 'row-reverse' : 'row';
        const rotate = this.props.transformRotateZ;
        return (
            <View style={
                [ControlElementsStyle.controlModul, {
                    flexDirection: flexDirection, transform: [{ rotateZ: rotate }]
                }]} >
                {/* <NiedrigerButton GameState={this.props.gameState} /> */}
                <NiedrigerButton />
                <GleichButton />
                <HochButton />
            </View>
        );

    }

}
  // -----