const { todos } = require("./data");

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  switch (method) {
    case "GET":
      res.status(200).json(todos[todoIndex]);
      break;
    case "DELETE":
      const deletedTodo = todos.splice(todoIndex, 1);
      res.status(200).json(deletedTodo[0]);
      break;
    case "PUT":
      const { title, description, completed } = req.body;
      todos[todoIndex] = {
        ...todos[todoIndex],
        title: title || todos[todoIndex].title,
        description: description || todos[todoIndex].description,
        completed:
          completed !== undefined ? completed : todos[todoIndex].completed,
      };
      res.status(200).json(todos[todoIndex]);
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
