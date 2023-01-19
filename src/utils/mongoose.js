import { connect, connection } from "mongoose"

const conn = {
  isConnect: false
}

export async function dbConnect () {
  if (conn.isConnect) return
  const db = await connect(process.env.MONGODB_URL)

  conn.isConnect = db.connections[0].readyState
  console.log(db.connection.db.databaseName)
}

connection.on("connected", () => {
  console.log("Mongoose connected to db")
})

connection.on("error", (err) => {
  console.log("Error on connection:", err)
})
