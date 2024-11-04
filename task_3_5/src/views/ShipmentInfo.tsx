import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Container, Form, Label, Title, Input, Select, Error } from "./Form";
import { useState } from "react";
import { z } from "zod";
import useStore from "../store/OrderState";
import Breadcrumbs from "../components/Breadcrumbs";
import { orderSchema } from "../zodSchemas/orederSchema";
import styled from "styled-components";

export interface Shipment {
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

const Group = styled.div`
  display: flex;
`;

export interface ValidationError {
  path: string | number;
  message?: string;
}

const ShipmentInfo = () => {
  const navigation = useNavigate();
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [shipmentInfo, setshipmentInfo] = useState<Shipment>({
    address: "",
    apartment: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const setShipmentInfo = useStore((state) => state.setShipmentInfo);

  const renderError = (name: string) => {
    const error = errors.find((error) => error.path === name);
    return error ? { error: true, message: error.message } : null;
  };

  const submit = async () => {
    try {
      const parsedOrder = orderSchema.parse(shipmentInfo);

      setShipmentInfo(shipmentInfo);

      if (parsedOrder) {
        navigation("/success");
      }

      setErrors([]);
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
    setshipmentInfo({ ...shipmentInfo, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Breadcrumbs
        links={[
          { name: "Cart", link: "/cart", active: true, current: false },
          {
            name: "Contact information",
            link: "/contact-information",
            active: true,
            current: false,
          },
          {
            name: "Shipment information",
            link: "/shipment-information",
            active: true,
            current: true,
          },
        ]}
      />
      <Title>Shipment Info</Title>
      <Form className="column">
        <Label>
          Address (No P. O. Boxes)*
          <Input
            type="text"
            name="address"
            placeholder="Enter your address"
            className={errors && renderError("address")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("address")?.error && (
            <Error>{renderError("address")?.message}</Error>
          )}
        </Label>
        <Label>
          Apartment, suite etc. (optional)
          <Input
            type="text"
            name="apartment"
            placeholder="Enter your apartment"
            className={errors && renderError("apartment")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("apartment")?.error && (
            <Error className="error">{renderError("apartment")?.message}</Error>
          )}
        </Label>
        <Label>
          City*
          <Input
            type="text"
            name="city"
            placeholder="Enter your city"
            className={errors && renderError("city")?.error ? "error" : ""}
            onChange={handleChange}
          />
          {errors && renderError("city")?.error && (
            <Error>{renderError("city")?.message}</Error>
          )}
        </Label>
        <Group>
          <Label>
            Country/Region*
            <Select
              name="country"
              className={errors && renderError("country")?.error ? "error" : ""}
              onChange={handleChange}
            >
              <option value="">Select your country/region</option>
              <option value="1">Country 1</option>
              <option value="2">Country 2</option>
            </Select>
            {errors && renderError("country")?.error && (
              <Error>{renderError("country")?.message}</Error>
            )}
          </Label>
          <Label>
            State*
            <Select
              name="state"
              className={errors && renderError("state")?.error ? "error" : ""}
              onChange={handleChange}
            >
              <option value="">Select your state</option>
              <option value="1">State 1</option>
              <option value="2">State 2</option>
            </Select>
            {errors && renderError("state")?.error && (
              <Error>{renderError("state")?.message}</Error>
            )}
          </Label>
          <Label>
            ZIP code*
            <Input
              type="text"
              name="zipCode"
              placeholder="Enter your zip code"
              className={errors && renderError("zipCode")?.error ? "error" : ""}
              onChange={handleChange}
            />
            {errors && renderError("zipCode")?.error && (
              <Error>{renderError("zipCode")?.message}</Error>
            )}
          </Label>
        </Group>
      </Form>
      <Button click={() => submit()}>Submit order</Button>
    </Container>
  );
};

export default ShipmentInfo;
