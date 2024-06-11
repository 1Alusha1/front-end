import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "./Form";
import { userSchema } from "../userSchema";
import { z } from "zod";

jest.mock("../userSchema", () => {
  return {
    userSchema: {
      parse: jest.fn(),
    },
  };
});

jest.mock("../validation", () => ({
  isConfirmedPassword: jest.fn(),
}));

describe("Form Component", () => {

  test("submits the form", async () => {
    (userSchema.parse as jest.Mock).mockImplementation(() => ({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password1!",
      confirmedPassword: "Password1!",
      gender: "Male",
      hobbies: ["Music", "Movies"],
      sourceOfIncome: "Employed",
      income: 100,
      upload: "profile.jpg",
      age: 30,
      bio: "Hello, I am John!",
    }));

    const { isConfirmedPassword } = require("../validation");
    (isConfirmedPassword as jest.Mock).mockReturnValue({ success: true });

    render(<Form />);

    fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "Password1!" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Please repeat your confirm password"),
      {
        target: { value: "Password1!" },
      }
    );
    fireEvent.click(screen.getByLabelText("Male"));
    fireEvent.click(screen.getByLabelText("Music"));
    fireEvent.click(screen.getByLabelText("Movies"));

    fireEvent.change(screen.getByTestId("sourceOfIncome"), {
      target: { value: "Employed" },
    });
    fireEvent.change(screen.getByTestId("income"), {
      target: { value: 100 },
    });
    fireEvent.change(screen.getByTestId("upload"), {
      target: { files: ["profile.jpg"] },
    });
    fireEvent.change(screen.getByTestId("age"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell about yourself"), {
      target: { value: "Hello, I am John!" },
    });

    fireEvent.click(screen.getByTestId("create"));

    expect(userSchema.parse).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "Password1!",
      confirmedPassword: "Password1!",
      gender: "Male",
      hobbies: ["Music", "Movies"],
      sourceOfIncome: "Employed",
      income: 100,
      upload: '["profile.jpg"]',
      age: 30,
      bio: "Hello, I am John!",
    });

    expect(isConfirmedPassword).toHaveBeenCalledWith(
      "Password1!",
      "Password1!"
    );
  });

  test("shows validation errors on invalid input", async () => {
    (userSchema.parse as jest.Mock).mockImplementation(() => {
      throw new z.ZodError([
        {
          path: ["firstName"],
          message: "First name is required",
          code: "custom",
        },
        { path: ["email"], message: "Invalid email address", code: "custom" },
      ]);
    });

    render(<Form />);

    fireEvent.click(screen.getByText(/Create/i));

    expect(
      await screen.findByText("First name is required")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid email address")
    ).toBeInTheDocument();
  });
});
