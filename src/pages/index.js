import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { Button, Card, Container, Grid } from "semantic-ui-react";

export default function HomePage({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns={1}
        style={{
          height: "80vh",
        }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              alt="No tasks yet"
              src="https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png"
            ></img>
          </Grid.Column>
        </Grid.Row>
        <div>
          <Button primary onClick={() => router.push("/tasks/new")}>
            Create a task
          </Button>
        </div>
      </Grid>
    );
  }
  return (
    <Container className="main-container">
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header style={{ fontWeight: "bold" }}>
                {task.title}
              </Card.Header>
              <p style={{ color: "black" }}>{task.description}</p>
            </Card.Content>
            <Card.Content extra className="buttons-container">
              <Button
                className="ui teal button"
                onClick={() => router.push(`/tasks/${task._id}`)}
              >
                View
              </Button>
              <Button
                secondary
                onClick={() => router.push(`/tasks/${task._id}/edit`)}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/tasks`);

  return {
    props: {
      tasks: data,
    },
  };
}
