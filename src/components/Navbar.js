
import React from "react"
import { Button, Menu, Container } from "semantic-ui-react"

export const Navbar = () => {
  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <img src="./favicon.ico"></img>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary size="mini" onClick={() => alert("click")}>
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}
