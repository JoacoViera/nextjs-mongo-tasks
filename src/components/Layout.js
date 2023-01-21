import { Navbar } from "./Navbar"

export const Layout = (props) => {
  console.log("ke", props)
  return (
    <>
      <Navbar />
      {props.children}
    </>
  )
}
