import React from "react"
import { Container } from "unstated"

class Login_Container extends Container {
  state = {
    count: 0,
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 })
  }
}

export default Login_Container
