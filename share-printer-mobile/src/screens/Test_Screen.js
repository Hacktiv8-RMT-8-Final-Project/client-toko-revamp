import React from "react"
import { Subscribe } from "unstated"
import { TouchableOpacity, Text, Button, View, StyleSheet } from "react-native"

import CounterContainer from "../containers/counter"

const Counter = () => {
  return (
    <Subscribe to={[CounterContainer]}>
      {(counterContainer) => (
        <View style={styles.container}>
          <Text>The current count value Count: {counterContainer.state.count}</Text>
          {/* <Button onClick={counterContainer.increment}>Increment</Button>
          <Button onClick={counterContainer.decrement}>Decrement</Button> */}
          <TouchableOpacity onPress={counterContainer.increment} style={styles.button}>
            <Text style={styles.button_text}>Increment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={counterContainer.decrement} style={styles.button}>
            <Text style={styles.button_text}>Decrement</Text>
          </TouchableOpacity>
        </View>
      )}
    </Subscribe>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    display: "flex",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
    margin: 5,
    borderWidth: 1,
    borderColor: "blue",

    backgroundColor: "white",
  },
  button_text: {
    fontSize: 16,
    textTransform: "uppercase",
  },
})

export default Counter
