import React from "react"
import { ImageBackground, TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView } from "react-native"
import { Card, Title, Paragraph, DataTable } from "react-native-paper"

function Payment_Methods_Screen(props) {

  return (
    <SafeAreaView style={styles.container} >
      <View >
        <Card style={styles.card}>
        <View style={styles.headingContainer}>
          <Title style={{marginBottom: 10}}>
            PAYMENT METHODS
          </Title>
        </View>
        <Title style={{marginBottom: 10}}>
          Bank Transfer
        </Title>

        <View style={{borderBottomColor: 'grey', borderBottomWidth: 1}}>
          <View style={{marginBottom: 20}}>
            <Title>
            BCA
            </Title>
            <Paragraph>
            8610941177 a/n PT Delta Neva Angkasa
            </Paragraph>
          </View>

          <View style={{marginBottom: 10,}}>
            <Title>
              Mandiri Bank
            </Title>
            <Paragraph>
              1370012937096 a/n PT Delta Neva Angkasa
            </Paragraph>
          </View>
        </View>
        <View>
          <Paragraph>
            Step:
          </Paragraph>
          <Paragraph>1. Find the nearest BCA/Mandiri ATM Center</Paragraph>
          <Paragraph>2. Insert your BCA/Mandiri card</Paragraph>
          <Paragraph>3. Enter your pin</Paragraph>
          <Paragraph>4. Choose Transfer</Paragraph>
          <Paragraph>5. Input rekening number <Paragraph style={{fontWeight: 'bold'}}>BCA 8610941177 a/n PT Delta Neva Angkasa </Paragraph> or <Paragraph style={{fontWeight: 'bold'}}> Mandiri 1370012937096 a/n PT Delta Neva Angkasa </Paragraph></Paragraph>
          <Paragraph>6. Input nominal transfer </Paragraph>
          <Paragraph>7. Transfer </Paragraph>
          <Paragraph>8. Upload your payment receipt </Paragraph>
          <Paragraph>9. Done </Paragraph>
        </View> 
        </Card>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 80
  },
  card: {
    padding: 20,
    borderRadius: 25,
    backgroundColor: "#fefae0"
  },
  headingContainer: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 10
  }
})

export default Payment_Methods_Screen
