import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErros] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErros(errors);
    }
    console.log("submit", newTask);
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
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
          <h1>Create Task</h1>
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
            />
            <Button primary>Save</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
