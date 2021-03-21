function alert_pop_up(message) {
  return alert(
    `${message}`,
    [
      {
        text: "OK",
        onPress: () => console.log(`OK pressed from alert`),
      },
    ],
    {
      cancelable: false,
    }
  )
}

export default alert_pop_up
