import React from "react"

export default function HomePage () {
  return (
    <div>Hello World</div>
  )
}

export async function getServerSideProps (context) {
  const tasks = await fetch("http://localhost:3000/api/tasks")
  const data = await tasks.json()

  console.log(data)
  return {
    props: {}
  }
}
