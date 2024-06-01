import { createTask, deleteTask, getTasks, updateTask } from "./async";

export interface ITask {
  _id: string;
  isDone: boolean;
  text: string;
}

const formElement: HTMLFormElement | null = document.querySelector("form");
const ulElement: HTMLUListElement | null = document.querySelector(".list");

formElement?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTask: HTMLInputElement = formElement.elements.namedItem(
    "newTask"
  ) as HTMLInputElement;

  await createTask(newTask.value);

  newTask.value = "";
  renderTasks(ulElement!);
});
renderTasks(ulElement!);

async function renderTasks(parent: HTMLUListElement) {
  const todolist: ITask[] = await getTasks();
  if (todolist) {
    parent.innerHTML = todolist.reduce((acc: string, task: ITask) => {
      return (acc += `
      <div class="task ${task.isDone ? "done" : ""}" data-id=${
        task._id
      } disabled=${task.isDone}>
        <div class="task-c">
            <input type="checkbox"  ${task.isDone && "checked"} name="done" />
            <span>${task.text}</span>
        </div>
        <div class="task-controller" >
            <img src="./public/edit.png" class="edit" alt="edit task" />
            <img src="./public/delete.png" class="delete" alt="delete task" />
        </div>
      </div>
      `);
    }, "");
  }
}

ulElement?.addEventListener("mouseover", (e) => {
  if (e.target instanceof Element) {
    const task: HTMLDivElement | null = e.target.closest(".task");
    const id: string | undefined = task?.dataset.id;

    if (!task || !id) return;

    if (task.dataset.listenerAdded === "true") {
      return;
    }

    task.dataset.listenerAdded = "true";

    const inputElement: HTMLInputElement | null = task.querySelector("input");
    const editElement: HTMLImageElement | null = task.querySelector(".edit");
    const deleteElement: HTMLImageElement | null =
      task.querySelector(".delete");
    const taskControllerElement: HTMLDivElement | null =
      task.querySelector(".task-controller");
    const span: HTMLSpanElement | null = task.querySelector("span");

    if (
      !inputElement ||
      !editElement ||
      !deleteElement ||
      !taskControllerElement
    )
      return;

    inputElement.addEventListener("change", async () => {
      task.classList.add("done");
      inputElement.disabled = true;

      await updateTask({
        _id: id,
        text: span!.innerHTML,
        isDone: true,
      });

      await renderTasks(ulElement!);
    });

    deleteElement.addEventListener("click", async () => {
      await deleteTask(id);
      await renderTasks(ulElement!);
    });

    editElement.addEventListener("click", () => {
      const input: HTMLInputElement = document.createElement("input");

      input.value = span!.innerHTML || "";
      span!.innerHTML = "";
      span!.appendChild(input);
      input.focus();

      taskControllerElement.innerHTML = `<img src="./public/confirm.png"  class="confirm" alt="confirm" />`;
      const confirmElement = task.querySelector(".confirm");

      confirmElement?.addEventListener("click", async () => {
        await updateTask({
          _id: id,
          text: input.value,
          isDone: false,
        });

        taskControllerElement.innerHTML = `<img src="./public/edit.png" class="edit" alt="edit task" />
                        <img src="./public/delete.png" class="delete" alt="delete task" />`;
        await renderTasks(ulElement!);
      });
    });
  }
});
