interface ITask {
  id: number;
  isDone: boolean;
  text: string;
}

const formElement: HTMLFormElement | null = document.querySelector("form");
const ulElement: HTMLUListElement | null = document.querySelector(".list");

let tdl = getCookie("toDoList");

if (!tdl) {
  setCookie("toDoList", JSON.stringify([]), 365);
}

function getCookie(name: string): string | undefined {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split("=");
    if (cookiePair[0] === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return undefined;
}

function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

formElement?.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask: HTMLInputElement = formElement.elements.namedItem(
    "newTask"
  ) as HTMLInputElement;

  let tdl: string | undefined = getCookie("toDoList");
  if (tdl) {
    const tasks: ITask[] = JSON.parse(tdl);

    tasks.push({
      id: Date.now(),
      isDone: false,
      text: newTask.value,
    });

    setCookie("toDoList", JSON.stringify(tasks), 365);
  }

  newTask.value = "";
  renderTasks(ulElement!);
});
renderTasks(ulElement!);

function renderTasks(parent: HTMLUListElement) {
  let tdl: string | undefined = getCookie("toDoList");

  if (tdl) {
    const tasks: ITask[] = JSON.parse(tdl);

    parent.innerHTML = tasks.reduce((acc: string, task: ITask) => {
      return (acc += `
      <div class="task ${task.isDone ? "done" : ""}" data-id=${
        task.id
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

ulElement?.addEventListener("click", (e) => {
  if (e.target instanceof Element) {
    const task: HTMLDivElement | null = e.target.closest(".task");
    const id: number = Number(task?.dataset.id);

    if (!task || !id) return;

    const inputElement: HTMLInputElement | null = task.querySelector("input");
    const editElement: HTMLImageElement | null = task.querySelector(".edit");
    const deleteElement: HTMLImageElement | null =
      task.querySelector(".delete");
    const taskControllerElement: HTMLDivElement | null =
      task.querySelector(".task-controller");

    if (
      !inputElement ||
      !editElement ||
      !deleteElement ||
      !taskControllerElement
    )
      return;

    inputElement.addEventListener("change", () => {
      task.classList.add("done");
      inputElement.disabled = true;

      let tdl: string | undefined = getCookie("toDoList");
      if (tdl) {
        const tasks: ITask[] = JSON.parse(tdl);

        tasks.find((task) => task.id === id && (task.isDone = true));
        setCookie("toDoList", JSON.stringify(tasks), 365);

        renderTasks(ulElement!);
      }
    });

    deleteElement.addEventListener("click", () => {
      let tdl: string | undefined = getCookie("toDoList");

      if (tdl) {
        const tasks: ITask[] = JSON.parse(tdl);

        const index = tasks.findIndex((task) => task.id == id);
        tasks.splice(index, 1);
        setCookie("toDoList", JSON.stringify(tasks), 365);
        renderTasks(ulElement!);
      }
    });

    editElement.addEventListener("click", () => {
      const input: HTMLInputElement = document.createElement("input");
      const span: HTMLSpanElement | null = task.querySelector("span");

      input.value = span?.innerHTML || "";
      span!.innerHTML = "";
      span?.appendChild(input);
      input.focus();

      taskControllerElement.innerHTML = `<img src="./public/confirm.png"  class="confirm" alt="confirm" />`;
      const confirmElement = task.querySelector(".confirm");

      confirmElement?.addEventListener("click", () => {
        let tdl: string | undefined = getCookie("toDoList");

        if (tdl) {
          const tasks: ITask[] = JSON.parse(tdl);
          tasks.find((task) => task.id === id && (task.text = input.value));

          setCookie("toDoList", JSON.stringify(tasks), 365);

          taskControllerElement.innerHTML = `<img src="./public/edit.png" class="edit" alt="edit task" />
                        <img src="./public/delete.png" class="delete" alt="delete task" />`;
          renderTasks(ulElement!);
        }
      });
    });
  }
});
