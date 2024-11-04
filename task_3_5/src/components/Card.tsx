import { FC } from "react";
import styled from "styled-components";
import Button from "./Button";
import plus from "../assets/images/plus.svg";
import useStore from "../store/CartState";

const CardEl = styled.div`
  padding: 8px;
  color: #0c0c0c;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px #0000001a;

  button {
    width: 100%;
    justify-content: center;
  }
`;
const Image = styled.img`
  margin-bottom: 16px;
`;
const Paragraph = styled.p`
  margin-bottom: 16px;
  height: 40px;
  font-size: 16px;
`;
const Price = styled.p`
  margin-bottom: 16px;
  height: 20px;
  font-size: 24px;
`;
export interface Good {
  id: number;
  name: string;
  price: number;
  img: string;
  alt: string;
}
interface Card {
  good: Good;
}

const Card: FC<Card> = ({ good }) => {
  const addToCart = useStore((state) => state.addToCart);
  const goods = useStore((state) => state.goods);
  const normalizeString = (str: string) => str.split(" ").slice(0, 6).join(" ");

  const add = (good: Good) => {
    addToCart(good);
    console.log(goods);
  };

  return (
    <CardEl>
      <Image src={`../../public/images/${good.img}`} alt={good.alt}></Image>
      <Paragraph>{normalizeString(good.name)}</Paragraph>
      <Price>${good.price}</Price>
      <Button click={() => add(good)}>
        <img src={plus} alt="plus icon" /> Add to cart
      </Button>
    </CardEl>
  );
};

export default Card;
