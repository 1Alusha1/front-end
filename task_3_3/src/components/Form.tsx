import React, { useState } from "react";
import { userSchema, User } from "../userSchema";
import { z } from "zod";
import { isConfirmedPassword } from "../validation";
const Form: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<any | null>(null);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    gender: "",
    hobbies: [],
    sourceOfIncome: "",
    income: 0,
    upload: "",
    age: 0,
    bio: "",
  });

  const setHobbies = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      ["Music", "Sports", "Travel", "Movies"].includes(
        value as (typeof user.hobbies)[number]
      )
    ) {
      setUser({
        ...user,
        hobbies: [...user.hobbies, value as (typeof user.hobbies)[number]],
      });
    }
  };

  const renderError = (name: string, errors: any[]) => {
    const error = errors?.find((error) => error.path === name);
    return error ? { error: true, message: error.message } : null;
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const parsedUser = userSchema.parse(user);

      const confirmedPasswordValidation = isConfirmedPassword(
        parsedUser.password,
        parsedUser.confirmedPassword
      );

      if (!confirmedPasswordValidation.success) {
        throw confirmedPasswordValidation.error;
      }

      setErrors(null);
      console.log("Form submitted successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.map((error) => ({
            path: error.path[0],
            message: error.message,
          }))
        );
      } else if (error instanceof Error) {
        setErrors([{ path: "password", message: error.message }]);
      }
    }
  };
  return (
    <form onSubmit={submitForm}>
      <div className="full-name form-control">
        <div className="form-item">
          <label htmlFor="firstName">First name*</label>
          <input
            type="text"
            name="firstName"
            data-testid="FirstName"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            placeholder="Enter your first name"
            className={
              isSubmitted
                ? renderError("firstName", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && <p>{renderError("firstName", errors)?.message} </p>}
        </div>
        <div className="form-item">
          <label htmlFor="lastName">Last name*</label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            placeholder="Enter your last name"
            className={
              isSubmitted
                ? renderError("lastName", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && <p>{renderError("lastName", errors)?.message} </p>}
        </div>
      </div>

      <div className="email form-control">
        <div className="form-item">
          <label htmlFor="email">Email*</label>

          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name="email"
            placeholder="Enter your email"
            className={
              isSubmitted
                ? renderError("email", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && <p>{renderError("email", errors)?.message} </p>}
        </div>
      </div>

      <div className="password form-control">
        <div className="form-item">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className={
              isSubmitted
                ? renderError("password", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && <p>{renderError("password", errors)?.message} </p>}
        </div>
        <div className="form-item">
          <label htmlFor="confirmedPassword">Confirm Password*</label>
          <input
            type="password"
            onChange={(e) =>
              setUser({ ...user, confirmedPassword: e.target.value })
            }
            name="confirmedPassword"
            placeholder="Please repeat your confirm password"
            className={
              isSubmitted
                ? renderError("confirmedPassword", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && (
            <p>{renderError("confirmedPassword", errors)?.message} </p>
          )}
        </div>
      </div>
      <div className="group">
        <div className="gender form-control">
          <fieldset>
            <legend>Gender:</legend>
            <div className="gender-wrap">
              <div className="radio">
                <input
                  type="radio"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  name="gender"
                  value="Male"
                  id="Male"
                />
                <label htmlFor="Male">Male</label>
              </div>
              <div className="radio">
                <input
                  type="radio"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  name="gender"
                  value="Female"
                  id="Female"
                />
                <label htmlFor="Female">Female</label>
              </div>
            </div>
          </fieldset>
          {isSubmitted && (
            <p className="error">{renderError("gender", errors)?.message} </p>
          )}
        </div>
        <div className="hobbies form-control">
          <fieldset>
            <legend>Hobbies:</legend>
            <div className="hobbies-wrap">
              <div className="radio">
                <input
                  type="checkbox"
                  name="hobbies"
                  onChange={setHobbies}
                  value="Music"
                  id="Music"
                  className={
                    isSubmitted
                      ? renderError("hobbies", errors)?.error
                        ? "error"
                        : "success"
                      : ""
                  }
                />
                <label htmlFor="Music">Music</label>
              </div>
              <div className="radio">
                <input
                  type="checkbox"
                  name="hobbies"
                  onChange={setHobbies}
                  value="Sports"
                  id="Sports"
                  className={
                    isSubmitted
                      ? renderError("hobbies", errors)?.error
                        ? "error"
                        : "success"
                      : ""
                  }
                />
                <label htmlFor="Sports">Sports</label>
              </div>
              <div className="radio">
                <input
                  type="checkbox"
                  name="hobbies"
                  onChange={setHobbies}
                  value="Travel"
                  id="Travel"
                  className={
                    isSubmitted
                      ? renderError("hobbies", errors)?.error
                        ? "error"
                        : "success"
                      : ""
                  }
                />
                <label htmlFor="Travel">Travel</label>
              </div>
              <div className="radio">
                <input
                  type="checkbox"
                  name="hobbies"
                  onChange={setHobbies}
                  value="Movies"
                  id="Movies"
                  className={
                    isSubmitted
                      ? renderError("hobbies", errors)?.error
                        ? "error"
                        : "success"
                      : ""
                  }
                />
                <label htmlFor="Movies">Movies</label>
              </div>
            </div>
          </fieldset>
          {isSubmitted && (
            <p className="error">{renderError("hobbies", errors)?.message} </p>
          )}
        </div>
      </div>

      <div className="income form-control">
        <div className="form-item">
          <label htmlFor="sourceOfIncome">Source of Income</label>
          <select
            onChange={(e) =>
              setUser({ ...user, sourceOfIncome: e.target.value })
            }
            name="sourceOfIncome"
            id="sourceOfIncome"
            data-testid="sourceOfIncome"
            className={
              isSubmitted
                ? renderError("sourceOfIncome", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          >
            <option value="Employed">Employed</option>
            <option value="Employed">Employed</option>
            <option value="Employed">Employed</option>
            <option value="Employed">Employed</option>
          </select>
          {isSubmitted && (
            <p className="error">
              {renderError("sourceOfIncome", errors)?.message}{" "}
            </p>
          )}
        </div>
        <div className="form-item income-l">
          <label htmlFor="income">Income</label>
          <input
            type="range"
            min="0"
            max="100"
            name="income"
            data-testid="income"
            onChange={(e) => setUser({ ...user, income: +e.target.value })}
            id="income"
            className={
              isSubmitted
                ? renderError("income", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          <button className="btn">20K</button>
        </div>
        {isSubmitted && (
          <p className="error income-l-e">
            {renderError("income", errors)?.message}{" "}
          </p>
        )}
      </div>

      <div className="upload form-control ">
        <div className="form-item">
          <label htmlFor="upload">Upload Profile Picture</label>
          <div className="upload-g">
            <input
              type="file"
              onChange={(e) =>
                setUser({ ...user, upload: JSON.stringify(e.target.files) })
              }
              name="upload"
              id="upload"
              data-testid="upload"
              className={
                isSubmitted
                  ? renderError("upload", errors)?.error
                    ? "error"
                    : "success"
                  : ""
              }
            />
            <button className="btn btn-dark">Choose file</button>
            <span>No file chosen</span>
          </div>
          {isSubmitted && (
            <p className="error">{renderError("upload", errors)?.message} </p>
          )}
        </div>
        <div className="form-item ">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            name="age"
            id="age"
            data-testid="age"
            className={
              isSubmitted
                ? renderError("age", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          />
          {isSubmitted && (
            <p className="error">{renderError("age", errors)?.message} </p>
          )}
        </div>
      </div>

      <div className="about form-control">
        <div className="form-item">
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            placeholder="Tell about yourself"
            cols={30}
            rows={10}
            className={
              isSubmitted
                ? renderError("bio", errors)?.error
                  ? "error"
                  : "success"
                : ""
            }
          ></textarea>
          {isSubmitted && (
            <p className="error">{renderError("bio", errors)?.message} </p>
          )}
        </div>
      </div>
      <div className="submit form-control">
        <div className="form-item">
          <input type="submit" className="btn" value="Create" data-testid="create" />
        </div>
      </div>
    </form>
  );
};

export default Form;
