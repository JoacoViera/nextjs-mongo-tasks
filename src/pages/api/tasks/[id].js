import Task from "models/Tasks"
import { dbConnect } from "utils/mongoose"

dbConnect()

export default async (req, res) => {
  const {
    body,
    query: { id },
    method
  } = req

  switch (method) {
  case "GET":
    try {
      const task = await Task.findById(id)
      if (!task) {
        return res.status(404).json({ msg: "Task not found" })
      }
      return res.status(200).json(task)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  case "PUT":
    try {
      const task = await Task.findByIdAndUpdate(id, body, { new: true })
      if (!task) {
        return res.status(404).json({ msg: "Task not found" })
      }
      return res.status(200).json(task)
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  case "DELETE":
    try {
      const task = await Task.findByIdAndDelete(id)
      if (!task) {
        return res.status(404).json({ msg: "Task not found" })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ msg: error.message })
    }
  default:
    return res.status("400").json({ msg: "Method do not allowed" })
  }
}
