import React from "react"
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Avatar, Button, Card, Title, Paragraph, DataTable } from "react-native-paper"

function Transaction_History_Screen(props) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Card>
            <Card.Content>
              <Title>UUID</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 14,
  },
})
export default Transaction_History_Screen
