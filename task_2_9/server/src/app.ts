import express, { Request, Response } from "express";
import cfg from "./cfg";
import todoModel from "./models/todo.model";
import connect from "./db";
import cors from "cors";
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;

interface ToDo {
  id: string;
  isDone: boolean;
  text: string;
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await todoModel.find();

    if (!tasks) return res.status(404).json({ message: "not found any tasks" });

    return res.status(200).json({
      tasks,
    });
  } catch (err) {
    if (err)
      return res
        .status(500)
        .json({ message: "Unseccessful try to get list tasks" });
  }
});

app.post(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const task = await todoModel.findOne({ _id: id });

      if (!task) return res.status(404).json({ message: "task not found" });

      return res.status(200).json({
        task,
      });
    } catch (err) {
      if (err) return res.status(500).json({ message: "Something wrong" });
    }
  }
);

app.post("/", async (req: RequestWithBody<{ text: string }>, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "You should add text" });

    const task = await new todoModel({
      text,
    });

    task.save();

    return res.status(201).json({
      message: "Task successfully created",
    });
  } catch (err) {
    if (err)
      return res
        .status(500)
        .json({ message: "An error occurred when creating the task" });
  }
});

app.patch(
  "/:id",
  async (
    req: RequestWithParamsAndBody<{ id: string }, ToDo>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { text, isDone } = req.body;
      await todoModel.findOneAndUpdate(
        { _id: id },
        {
          text,
          isDone,
        },
        { new: true }
      );

      res.status(204).json({ message: "Task was updated" });
    } catch (err) {
      if (err)
        return res
          .status(500)
          .json({ message: "An error occurred when updating the task" });
    }
  }
);

app.delete(
  "/:id",
  async (req: RequestWithParams<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      await todoModel.findByIdAndDelete({ _id: id });
      res.status(204).json({ message: "Task was deleted" });
    } catch (err) {
      if (err)
        return res
          .status(500)
          .json({ message: "An error occurred when deleting the task" });
    }
  }
);

connect(cfg.DB_URI);
app.listen(cfg.PORT, () => console.log("server was start on PORT:" + cfg.PORT));
