const { todos } = require("./data");

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(todos);
      break;
    case "POST":
      const { title, description, completed } = req.body;
      const newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: completed || false,
      };
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
