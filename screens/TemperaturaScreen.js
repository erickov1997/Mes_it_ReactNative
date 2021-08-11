import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native'
import io from 'socket.io-client/dist/socket.io.js';
import { Card,ListItem, Button, Icon } from 'react-native-elements'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const TemperaturaScreen = () => {
    let temp = 0;
    const [temperatura, setTemperatura] = useState(0);
    const [statuTemp, setStatuTemp] = useState('');

    const [Tagstyle, SetTagstyle] = useState({
        color: 'green',
        fontSize: 30,
        textAlign: 'center'
    });

    const [Tagicon, SetIcon] = useState({
        fontSize: 55,
        color: "#DCD2D4",
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    });

    const loadTemperature = async () => {
        socket = io("http://192.168.100.124:3000", { jsonp: false });
        socket.on('datosTemperatura', function (datos) {
            setTemperatura(datos.data[0].valor)
            //console.log('temperatura: ',datos.data[0].valor);

            datos.data.map(elemento => {
                //console.log('temperatura: ',);
                temp = elemento.valor
            });
            setTemperatura(temp.toFixed(1));
            if (temp < 20) {
                setStatuTemp('Normal');
                SetTagstyle({
                    color: 'green',
                    fontSize: 30,
                    textAlign: 'center'
                })

                SetIcon({
                    color: "green",
                    fontSize: 55,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                })

            } else if (temp > 20 && temp < 35) {
                setStatuTemp('Warning');
                SetTagstyle({
                    color: 'yellow',
                    fontSize: 30,
                    textAlign: 'center'
                })

                SetIcon({
                    color: "yellow",
                    fontSize: 55,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                })
            } else {
                setStatuTemp('Danger');
                SetTagstyle({
                    color: 'red',
                    fontSize: 30,
                    textAlign: 'center'
                })

                SetIcon({
                    color: "red",
                    fontSize: 55,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                })
            }

        })


    }

    useEffect(() => {
        loadTemperature();
    }, []);

    return (
        <View style={styles.rowf}>
            <StatusBar backgroundColor="#141414" />
            <View style={styles.contTemp}>
                <Card containerStyle={styles.tempContainer}>
                    <FontAwesome5 style={Tagicon} name={'temperature-high'} size={35} color='red'></FontAwesome5>
                    <Text style={styles.temp}>{temperatura} °C</Text>
                    <Text style={styles.title}>Temperatura</Text>
                    <Text style={Tagstyle}>{statuTemp}
                    </Text>
                </Card>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    rowf: {
        backgroundColor: "#12161c",
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',

    },
    temp: {
        fontSize: 55,
        color: "#DCD2D4",
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 35,
        color: "#DCD2D4",
        textAlign: 'center'
    },
    cardsx: {
        height: '20%',
        width: 90,
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: "#2f3135",
        borderColor: '#2f3135',
        width: '42%'
    },
    status: {
        color: 'green',
        fontSize: 30,
        textAlign: 'center'
    },
    warning: {
        color: 'yellow',
        fontSize: 30,
        textAlign: 'center'
    },
    danger: {
        color: 'red',
        fontSize: 30,
        textAlign: 'center'
    },
    tempContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        borderRadius: 300,
        backgroundColor: '#2f3135',
        width: '100%',
        height: '90%',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contTemp: {
        flexDirection: 'row',
        justifyContent: 'center'
    }


})

export default TemperaturaScreen
