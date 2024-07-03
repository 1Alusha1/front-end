import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Container, Form, Label, Title, Input, Error } from "./Form";
import { useState } from "react";
import { z } from "zod";
import { userSchema } from "../zodSchemas/userSchema";
import useStore from "../store/OrderState";
import Breadcrumbs from "../components/Breadcrumbs";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
export interface ValidationError {
  path: string | number;
  message?: string;
}

const ContactInfo = () => {
  const navigation = useNavigate();
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const [userInfo, setUserInfo] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const setUserInfoStre = useStore((state) => state.setUserInfo);
  const stateUserInfo = useStore((state) => state.userInfo);
  const isUserInfoNotEmpty = Object.values(userInfo || stateUserInfo).some(
    (value) => !!value
  );

  const renderError = (name: string) => {
    const error = errors.find((error) => error.path === name);
    return error ? { error: true, message: error.message } : null;
  };

  const submit = () => {
    try {
      const parsedUser = userSchema.parse(userInfo);

      setUserInfoStre(userInfo);

      if (parsedUser) {
        navigation("/shipment-information");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.map((error) => ({
            path: error.path[0],
            message: error.message,
          }))
        );
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Title>Contact information</Title>

      <Breadcrumbs
        links={[
          { name: "Cart", link: "/cart", active: true, current: false },
          {
            name: "Contact information",
            link: "/contact-information",
            active: true,
            current: true,
          },
          {
            name: "Shipment information",
            link: "/shipment-information",
            active: isUserInfoNotEmpty,
            current: false,
          },
        ]}
      />

      <Form>
        <Label>
          First name*
          <Input
            placeholder="Enter your first name"
            type="text"
            name="firstName"
            className={errors && renderError("firstName")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("firstName")?.error && (
            <Error>{renderError("firstName")?.message}</Error>
          )}
        </Label>
        <Label>
          Last name*
          <Input
            placeholder="Enter your last name"
            type="text"
            name="lastName"
            onChange={handleChange}
            className={errors && renderError("lastName")?.error ? "error" : ""}
          />
          {errors && renderError("lastName")?.error && (
            <Error>{renderError("lastName")?.message}</Error>
          )}
        </Label>
        <Label>
          Email*
          <Input
            placeholder="Enter your email"
            type="text"
            name="email"
            className={errors && renderError("email")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("email")?.error && (
            <Error>{renderError("email")?.message}</Error>
          )}
        </Label>
        <Label>
          Phone*
          <Input
            placeholder="Enter your phone"
            type="text"
            name="phone"
            className={errors && renderError("phone")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("phone")?.error && (
            <Error>{renderError("phone")?.message}</Error>
          )}
        </Label>
      </Form>

      <Button click={() => submit()}>Next step</Button>
    </Container>
  );
};

export default ContactInfo;
