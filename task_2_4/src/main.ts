interface IErrorMessage {
  element: HTMLInputElement;
  message: string;
}

interface IOptional {
  max: number;
  min: number;
}

class Validator {
  errorMessage: IErrorMessage[] = [];
  private password: string | null = null;
  [key: string]: any;

  isEmpty(element: HTMLInputElement): boolean {
    return Boolean(element.value.trim());
  }

  isUpperCase(element: HTMLInputElement) {
    if (element.value[0]) {
      return element.value[0] === element.value[0].toUpperCase();
    }
  }

  isRadioButtonEmpty(elements: HTMLInputElement[]): boolean {
    let flag = false;

    for (let elem of elements) {
      if (elem.checked) {
        flag = true;
      }
    }
    return flag;
  }

  isCheckBoxEmpty(elements: HTMLInputElement[]): boolean {
    let flag = false;
    for (let elem of elements) {
      if (elem.checked) {
        flag = true;
      }
    }
    return flag;
  }

  isEmail(element: HTMLInputElement): boolean {
    const expression = /^([\w.-]+)@([a-zA-Z\d.-]+)\.([a-zA-Z]{2,})$/;
    return expression.test(String(element.value).toLowerCase());
  }

  isValidPassword(element: HTMLInputElement): boolean {
    this.password = element.value;

    const specialCharacters = "!@#$%^&_";
    const isUpperCase = /[A-Z]/.test(element.value);
    const isLowerCase = /[a-z]/.test(element.value);
    const isSpecialCharacter = element.value
      .split("")
      .some((i) => specialCharacters.split("").some((s) => i === s));

    return isLowerCase && isUpperCase && isSpecialCharacter;
  }
  isConfirmedPassword(element: HTMLInputElement): boolean {
    return element.value === this.password;
  }

  isValidAge(element: HTMLInputElement, min: number, max: number):boolean {
    return Boolean(+element.value >= min && +element.value <= max);
  }

  isEmptyRange(element: HTMLInputElement) {
    return +element.value > 0;
  }

  isFileEmpty(element: HTMLInputElement) {
    return element.files?.length;
  }

  toggleError(
    element:
      | HTMLInputElement
      | HTMLSelectElement
      | NodeListOf<HTMLInputElement>,
    message: string,
    addError: boolean
  ) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement
    ) {
      if (addError) {
        element.classList.remove("success");
        element.classList.add("error");
      } else {
        element.classList.remove("error");
      }

      let parent: HTMLElement | null = element.parentElement;
      let messageElement: HTMLDivElement | null | undefined =
        parent?.querySelector(".message");

      messageElement!.innerHTML = addError ? message : "";
    }

    if (element instanceof NodeList) {
      for (let i = 0; i < element.length; i++) {
        if (element[i]) {
          const fieldsetElement: HTMLElement | null =
            element[i].closest("fieldset");

          const fieldsetParent: HTMLElement | null | undefined =
            fieldsetElement?.parentElement;

          let messageElement: HTMLElement | null =
            fieldsetParent!.querySelector(".message");
          messageElement!.innerHTML = addError ? message : "";
        }
      }
    }
  }

  body(
    element: HTMLInputElement,
    methods: { method: string; message: string }[],
    optional?: IOptional
  ) {
    this.toggleError(element, "", false);

    for (const { method, message } of methods) {
      if (!this[method](element, optional?.min, optional?.max)) {
        this.errorMessage.push({ element, message });
        this.toggleError(element, message, true);
      }
    }

    if (!this.errorMessage.length) {
      if (
        element instanceof HTMLInputElement ||
        (element as any) instanceof HTMLSelectElement ||
        (element as any) instanceof HTMLTextAreaElement
      ) {
        element.classList.add("success");
      }
    }
  }

  getErrorList() {
    return this.errorMessage;
  }
}

const form: HTMLFormElement | null = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName: HTMLInputElement = form.elements.namedItem(
      "firstName"
    ) as HTMLInputElement;
    const lastName: HTMLInputElement = form.elements.namedItem(
      "lastName"
    ) as HTMLInputElement;
    const email: HTMLInputElement = form.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const password: HTMLInputElement = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const confirmedPassword: HTMLInputElement = form.elements.namedItem(
      "confirmedPassword"
    ) as HTMLInputElement;
    const gender: HTMLInputElement = form.elements.namedItem(
      "gender"
    ) as HTMLInputElement;
    const hobbies: HTMLInputElement = form.elements.namedItem(
      "hobbies"
    ) as HTMLInputElement;
    const sourceOfIncome: HTMLInputElement = form.elements.namedItem(
      "sourceOfIncome"
    ) as HTMLInputElement;
    const age: HTMLInputElement = form.elements.namedItem(
      "age"
    ) as HTMLInputElement;

    const upload: HTMLInputElement = form.elements.namedItem(
      "upload"
    ) as HTMLInputElement;
    const bio = form.elements.namedItem("bio") as HTMLTextAreaElement;
    const validator = new Validator();
    validator.body(firstName, [
      { method: "isEmpty", message: "Поле не може бути пустим" },
      {
        method: "isUpperCase",
        message: "Ім'я повинно починатися з великої літери",
      },
    ]);
    validator.body(lastName, [
      { method: "isEmpty", message: "Поле не може бути пустим" },
      {
        method: "isUpperCase",
        message: "Прізвище повинно починатися з великої літери",
      },
    ]);
    validator.body(email, [
      { method: "isEmail", message: "Не коректна пошта" },
    ]);
    validator.body(password, [
      {
        method: "isValidPassword",
        message: "Пароль має мати заглавну літеру та спец. символ",
      },
    ]);
    validator.body(confirmedPassword, [
      {
        method: "isValidPassword",
        message: "Паролі не співпадають",
      },
      { method: "isConfirmedPassword", message: "Паролі не співпадають" },
    ]);
    validator.body(gender, [
      {
        method: "isRadioButtonEmpty",
        message: "Потрібно обрати стать",
      },
    ]);
    validator.body(hobbies, [
      {
        method: "isCheckBoxEmpty",
        message: "Потрібно обрати хоббі",
      },
    ]);
    validator.body(sourceOfIncome, [
      {
        method: "isEmpty",
        message: "Потрібно обрати джерело заробітку",
      },
    ]);
    validator.body(
      age,
      [
        {
          method: "isValidAge",
          message: "Введіть коректний вік",
        },
      ],
      { min: 18, max: 80 }
    );
    validator.body(upload, [
      {
        method: "isFileEmpty",
        message: "Потрібно обрати фото профілю",
      },
    ]);
    validator.body(bio as any, [
      {
        method: "isEmpty",
        message: "Потрібно заповнити біо",
      },
    ]);

    if (!validator.getErrorList().length) {
      console.log("send");
    }
  });
}
