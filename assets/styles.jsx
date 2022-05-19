import { StyleSheet, StatusBar } from "react-native"

export const styles =  StyleSheet.create({
    footer: {
        backgroundColor: 'grey',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
    },
    mainContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    containerTeam: {
        flex: 1,
    },
    header: {
        backgroundColor: 'grey',
        padding: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
    },
    content: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    removeBtn:{
        position: 'absolute',
        right: 5,
        fontSize: 30,
        textAlign:'center',
        paddingLeft: 10,
        paddingRight:10,
        borderWidth:2,
        marginTop: 5,
        borderColor: "black",
        borderRadius: 10
    },
    editBtn:{
      position: 'absolute',
      right: 50,
      fontSize: 22,
      color: "transparent",
      shadowRadius: 10,  
      textAlign:'center',
      textShadowColor: 'rgba(0, 0, 0, 0.99)',
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 0.1,
      padding: 5,
      borderWidth:2,
      marginTop: 5,
      borderColor: "black",
      borderRadius: 10
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      viewRegister: {
        width: '80%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputRegister: {
        width: '80%',
        height: 40,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        color: '#132851',
        marginTop: 5,
        marginBottom: 5,
      },
      logout: {
        position: 'absolute',
        top: 0 + StatusBar.currentHeight,
        right: 0
      },
})