
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GleichButton, HochButton, NiedrigerButton } from './buttons';


// STEUER-ELEMENT
type ControlElementProps = {
    inverseOrder: boolean;
    transformRotateZ: string;
}
export class PlayerControls extends React.Component<ControlElementProps> {
    render() {

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
            }

        });

        const flexDirection = this.props.inverseOrder ? 'row-reverse' : 'row';
        const rotate = this.props.transformRotateZ;
        return (
            <View style={[ControlElementsStyle.controlModul, {
                flexDirection: flexDirection, transform: [{ rotateZ: rotate }]
            }]} >
                <NiedrigerButton />
                <GleichButton />
                <HochButton />
            </View>
        );

    }

}
  // -----