import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet,ScrollView } from 'react-native'
import io from 'socket.io-client/dist/socket.io.js';
import { Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { getTasks } from '../api';
import { LineChart, Grid } from 'react-native-svg-charts'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



const TaskListScreen = () => {

  let fase1 = 0;
  let fase2 = 0;
  let fase3 = 0;
  let volL1 = 0;
  let volL2 = 0;
  let volL3 = 0;
  let hz = 0;
  const [fas1, setfase1] = useState(0);
  const [fas2, setfase2] = useState(0);
  const [fas3, setfase3] = useState(0);
  const [voltL1, setvolL1] = useState(0);
  const [voltL2, setvolL2] = useState(0);
  const [voltL3, setvolL3] = useState(0);
  const [fhz, setHz] = useState(0);

  const loadEnergy = async () => {
    socket = io("http://192.168.100.124:3000", { jsonp: false });

    socket.on("variador", function (datos) {
      //console.log("variador:", datos.data);

      datos.data.map(elemento => {
        //console.log('vari: ', elemento);
        fase1 = elemento.valor1/100;
        fase2 = elemento.valor2/100;
        fase3 = elemento.valor3/100;
        volL1 = elemento.valor4;
        volL2 = elemento.valor5;
        volL3 = elemento.valor6;
        hz = elemento.valor7;
      });
      setfase1(fase1);
      setfase2(fase2);
      setfase3(fase3);

      setvolL1(volL1);
      setvolL2(volL2);
      setvolL3(volL3);

      setHz(hz);

    })
  }

  useEffect(() => {
    loadEnergy();
  }, [])


  return (
    <ScrollView style={styles.scroll}>  
    <View style={styles.rowf}>
      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'bolt'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}>{fas1}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Fase 1A</Card.Title>
        <Card.Divider style={styles.linef1} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'bolt'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}>{fas2}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Fase 2A</Card.Title>
        <Card.Divider style={styles.linef2} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'bolt'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}>{fas3}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Fase 3A</Card.Title>
        <Card.Divider style={styles.linef3} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'lightbulb'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}> {voltL1}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Volts L1-L2</Card.Title>
        <Card.Divider style={styles.lineL1} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'lightbulb'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}>{voltL2}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Volts L2-L3</Card.Title>
        <Card.Divider style={styles.lineL2} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
        <FontAwesome5 name={'lightbulb'} size={20} color='white'></FontAwesome5>
        <Text style={styles.eje}>{voltL3}</Text>
        </View>
        <Card.Title style={styles.ejeT}>Volts L2-L3</Card.Title>
        <Card.Divider style={styles.lineL3} />
      </Card>

      <Card containerStyle={styles.cardsx}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={'rss'} size={20} color='white'></FontAwesome5>
          <Text style={styles.eje}>{fhz}</Text>
        </View>
        <Card.Title style={styles.ejeT}>HZ</Card.Title>
        <Card.Divider style={styles.lineHZ} />
      </Card>
    </View>
    </ScrollView>
  )
};
const styles = StyleSheet.create({
  cardsgraf: {
    width: "100%",
    backgroundColor: "#2f3135",
    margin: 0,
    padding: 0,
    borderColor: '#2f3135'
  },
  eje: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: "#ffff",
    marginLeft: 10
  },
  linef1: {
    borderWidth: 4,
    borderColor: '#5AA454'
  },
  linef2: {
    borderWidth: 4,
    borderColor: '#800080'
  },
  linef3: {
    borderWidth: 4,
    borderColor: '#ffa500'
  },
  lineL1: {
    borderWidth: 4,
    borderColor: '#ff0000'
  },
  lineL2: {
    borderWidth: 4,
    borderColor: '#000080'
  },
  lineL3: {
    borderWidth: 4,
    borderColor: '#FF5733'
  },
  lineHZ: {
    borderWidth: 4,
    borderColor: '#A02751',
  },
  ejeT: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    color: "#ffff"
  },
  cardsx: {
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: "#2f3135",
    borderColor: '#2f3135',
    width: '42%',
  },
  rowf: {
    backgroundColor: "#12161c",
    
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent:'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    height: 'auto',
  },
  scroll:{
    backgroundColor: "#12161c",
    height: '100%',
    alignContent: 'center',
    
  },
  vertical:{
    height: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }


})

export default TaskListScreen
