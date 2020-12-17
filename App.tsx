import React, { useImperativeHandle } from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
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

class NiedrigerButton extends Button {
  render() {
    return (
      <TouchableOpacity onPress={() => alert('Niedriger geklickt!')}>
        <Text style={[ButtonElementsStyle.ButtonStyle, {}]}>⬇️</Text>
      </TouchableOpacity>
    );
  }
}
class GleichButton extends Button {
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
class HochButton extends Button {
  render() {
    return (
      <TouchableOpacity onPress={() => alert('Höher geklickt!')}>
        <Text style={[ButtonElementsStyle.ButtonStyle, {}]}>⬆️</Text>
      </TouchableOpacity>
    );
  }
}
// -----


// STEUER-ELEMENT
type ControlElementProps = {
  inverseOrder: boolean;
  transformRotateZ: string;
}
class ControlElements extends React.Component<ControlElementProps> {
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









// Karte-Element

class ImageModul extends React.Component {
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




// INFO-Bereich
type InfoElementProps = {
  transformRotateZ: string;
}
class InfoModul extends React.Component<InfoElementProps> {
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



// Main
export default function App() {
  return (
    <View style={styles.container}>

      <ControlElements inverseOrder={false} transformRotateZ={'180deg'} />

      <InfoModul transformRotateZ={'180deg'} />

      <ImageModul />

      <InfoModul transformRotateZ={'0deg'} />


      <ControlElements inverseOrder={false} transformRotateZ={'0deg'} />


    </View>
  );
}
// -----






const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    padding: 30,
    flexDirection: 'column',
    //borderColor: 'red',
    //borderWidth: 2
  }
});
