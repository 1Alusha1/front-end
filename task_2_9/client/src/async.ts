import { ITask } from "./main";

export const getTasks = async (): Promise<ITask[]> => {
  const res = await fetch("http://localhost:3000");
  const { tasks } = await res.json();
  return tasks;
};

export const createTask = async (text: string): Promise<void> => {
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: { "content-type": "application/json" },
  });
  const message = await res.json();

  return message;
};

export const updateTask = async (dto: ITask) => {
  const res = await fetch(`http://localhost:3000/${dto._id}`, {
    method: "PATCH",
    body: JSON.stringify({ text: dto.text, isDone: dto.isDone }),
    headers: { "content-type": "application/json" },
  });
  const message = await res.json();
  return message;
};

export const deleteTask = async (id: string) => {
  await fetch(`http://localhost:3000/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "content-type": "application/json" },
  });
};
