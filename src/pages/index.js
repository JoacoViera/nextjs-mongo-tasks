import React from "react";
import { Button, Card, Container, Grid } from "semantic-ui-react";

export default function HomePage({ tasks }) {
  console.log("here", tasks);
  if (tasks.length !== 0) {
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
          <Button primary>Create a task</Button>
        </div>
      </Grid>
    );
  }
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary>View</Button>
              <Button secondary>Edit</Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/tasks");
  const tasks = await data.json();

  return {
    props: {
      tasks,
    },
  };
}
