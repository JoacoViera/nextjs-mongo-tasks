/* eslint-disable no-case-declarations */
import Task from "models/Tasks"
import { dbConnect } from "utils/mongoose"
dbConnect()

export default async function handler (req, res) {
  const { method, body } = req
  switch (method) {
  case "GET":
    try {
      const tasks = await Task.find()
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json(error)
    }

  case "POST":
    try {
      const newTask = new Task(body)
      const savedTask = await newTask.save()
      return res.status(201).json(savedTask)
    } catch (error) {
      return res.status(500).json(error)
    }

  default:
    return res.status("400").json({ msg: "Method do not allowed" })
  }
}
