import React from 'react'
import { View, Text } from 'react-native'

//const data = [50.7, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -8]
const data=[];

useEffect(() => {
  socket = io("http://192.168.100.124:3000", { jsonp: false });
  socket.on('push', function (datos) {
   data.push(parseFloat(datos.data[0].valor[0][1]));
   // console.log("data: ",data);
  })
},[]);

const Layout = () => {
    return (
        <View>
           <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={300}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
        </View>
    )
}

export default Layout
