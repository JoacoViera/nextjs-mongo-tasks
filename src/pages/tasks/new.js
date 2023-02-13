import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default function TaskFormPage() {
  const { query } = useRouter();
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  const getTask = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/tasks/${query.id}`);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  const validateForm = () => {
    const errors = {};
    if (!newTask.title) {
      errors.title = "Title is required";
    }
    if (!newTask.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }

    if (query.id) {
      await updateTask();
      await router.push("/");
    } else {
      await createTaks(newTask);
      await router.push("/");
    }
  };

  const createTaks = async () => {
    try {
      await fetch(`${process.env.BACKEND_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`${process.env.BACKEND_URL}/tasks/${query.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{query.id ? "Update Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              value={newTask.title}
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              name="description"
              error={
                errors.description
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              value={newTask.description}
            />
            <Button primary>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
