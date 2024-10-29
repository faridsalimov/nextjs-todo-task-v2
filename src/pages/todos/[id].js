import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/todos/${id}`)
        .then((res) => res.json())
        .then((data) => setTodo(data));
    }
  }, [id]);

  const handleDelete = async () => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    router.push("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, completed: !todo.completed };
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    setTodo(updatedTodo);
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "Completed" : "Not completed"}</p>

      <button onClick={handleUpdate}>
        {todo.completed ? "Mark as incomplete" : "Mark as complete"}
      </button>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
