import axios from "axios";
import { BACKEND_URL } from "config";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

export default function TaskFormPage() {
  const { query } = useRouter();
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (query.id) {
      getTask();
    } else {
      setLoading(false);
    }
  }, []);

  const getTask = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/tasks/${query.id}`);
    setNewTask({ title: data.title, description: data.description });
    setLoading(false);
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
    setLoading(true);
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setLoading(false);
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
      await axios.post(`${BACKEND_URL}/tasks`, {
        title: newTask.title,
        description: newTask.description,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTask = async () => {
    try {
      await axios.put(`${BACKEND_URL}/tasks/${query.id}`, {
        title: newTask.title,
        description: newTask.description,
      });
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);
  };

  if (loading) return <Loader active size="massive" />;

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
