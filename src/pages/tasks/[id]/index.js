import axios from "axios";
import { BACKEND_URL } from "config";
import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Grid, Button, Confirm } from "semantic-ui-react";

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/tasks/${router.query.id}`, {
        method: "DELETE",
      });
      setIsDeleting(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleteTask();
    close();
    router.push("/");
  };
  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }
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
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button
              color="red"
              onClick={open}
              loading={isDeleting}
              style={{ marginTop: "20px" }}
            >
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
        style={{ color: "black" }}
      />
    </Grid>
  );
}

export async function getServerSideProps({ query }) {
  const { data, status } = await axios(`${BACKEND_URL}/tasks/${query.id}`);
  if (status === 200) {
    return {
      props: {
        task: data,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: status,
        statusText: "Invalid id",
      },
    },
  };
}
