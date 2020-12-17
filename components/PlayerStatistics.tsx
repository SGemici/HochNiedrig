import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


// INFO-Bereich
type InfoElementProps = {
    transformRotateZ: string;
}
export class PlayerStatistics extends React.Component<InfoElementProps> {
    render() {

        const InfoStyle = StyleSheet.create({
            InfoModul: {
                flexDirection: 'row',
                justifyContent: 'center',
                display: 'flex',
                width: '100%'
            }
        });
        return (
            <View style={[InfoStyle.InfoModul, { transform: [{ rotateZ: this.props.transformRotateZ }] }]} >
                <Text>🍺  0</Text>
            </View>
        );
    }
}


  // -----
