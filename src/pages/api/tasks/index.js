import Tasks from "models/Tasks"
import { dbConnect } from "utils/mongoose"
dbConnect()

export default async function handler (req, res) {
  const tasks = await Tasks.find()
  console.log(tasks)
  res.status(200).json("tasks")
}
