import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import io from 'socket.io-client/dist/socket.io.js';
import { LineChart, Grid } from 'react-native-svg-charts'
import { getTasks } from '../api';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = () => {
    const ejex = [];
    const ejey = [];
    const ejez = [];

    const [datax, setEjex] = useState([0, 0]);
    const [datay, setEjey] = useState([0, 0]);
    const [dataz, setEjez] = useState([0, 0]);

    const [Dejex, setDEjex] = useState(0);
    const [Dejey, setDEjey] = useState(0);
    const [Dejez, setDEjez] = useState(0);

    const loadEjes = async () => {
        socket = io("http://192.168.100.124:3000", { jsonp: false });

        socket.on('ejes', function (datos) {
            datos.data[0].map(elemento => {

                ejex.push(elemento.ejex);
                ejey.push(elemento.ejey);
                ejez.push(elemento.ejez);

                setDEjex(elemento.ejex.toFixed(2));
                setDEjey(elemento.ejey.toFixed(2));
                setDEjez(elemento.ejez.toFixed(2));

            });
            setEjex(ejex);
            setEjey(ejey);
            setEjez(ejez);
            //console.log('eje x: '+ dat);
        });
    };

    useEffect(() => {
        loadEjes();
        changeScreenOrientation();
    }, []);


    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }

    const data = [
        {
            data: datax,
            svg: { stroke: '#5AA454' },
        },
        {
            data: datay,
            svg: { stroke: '#E44D25' },
        },
        {
            data: dataz,
            svg: { stroke: '#CFC0BB' },
        }
    ]

    useEffect(() => {

    }, []);




    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.body}>
                <Card containerStyle={styles.cardsgraf}>
                    <LineChart
                        style={{ height: 265 }}
                        data={data}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                </Card>


                <View style={styles.cardsEjes}>
                    <Card containerStyle={styles.cardsx}>
                        <Text style={styles.eje}>
                            {Dejex}
                        </Text>
                        <Card.Title style={styles.ejeT}>Eje x</Card.Title>
                        <Card.Divider style={styles.linex} />

                    </Card>

                    <Card containerStyle={styles.cardsy}>
                        <Text style={styles.eje}>
                            {Dejey}
                        </Text>
                        <Card.Title style={styles.ejeT}>Eje y</Card.Title>
                        <Card.Divider style={styles.liney} />
                    </Card>
                    <Card containerStyle={styles.cardsz}>
                        <Text style={styles.eje}>
                            {Dejez}
                        </Text>
                        <Card.Title style={styles.ejeT}>Eje z</Card.Title>
                        <Card.Divider style={styles.linez} />
                    </Card>
                </View>
            </View>
        </ScrollView>
    );


};
const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: "#12161c",
        alignContent: 'center',
        
    },
    cardsEjes: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    cardsx: {
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: "#2f3135",
        borderColor: '#2f3135',
        width: '40%',
        height: '39%',
    },
    linex: {
        borderWidth: 4,
        borderColor: '#5AA454'
    },
    liney: {
        borderWidth: 4,
        borderColor: '#E44D25'
    },
    linez: {
        borderWidth: 4,
        borderColor: '#CFC0BB'
    },
    cardsy: {
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: "#2f3135",
        borderColor: '#2f3135',
        width: '40%',
        height: '39%',

    },
    cardsz: {
        borderWidth: 1,
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: "#2f3135",
        borderColor: '#2f3135',
        width: '40%',
        height: '39%',
    },
    eje: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        color: "#ffff"
    },
    ejeT: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 10,
        color: "#ffff"
    },
    cardsgraf: {
        width: "100%",

        backgroundColor: "#2f3135",
        margin: 0,
        padding: 0,
        borderColor: '#2f3135'
    },
    scroll: {
        backgroundColor: "#12161c",
        height: '100%',
        width: "100%",
       

    }
})

export default HomeScreen
