import styled from "styled-components";
import Button from "../components/Button";
import minus from "../assets/images/minus.svg";
import plus from "../assets/images/plus.svg";
import basket from "../assets/images/basket.svg";
import useStore from "../store/CartState";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Container = styled.div`
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;
const CartItem = styled.div`
  display: flex;
  margin-bottom: 16px;
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  background: #fff;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Group = styled.div`
  margin-bottom: 32px;
`;

const CartImage = styled.img`
  width: 130px;
  height: 130px;
`;
const CartName = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;
const Price = styled.div`
  & span {
    font-size: 24px;
  }
`;
const CartControll = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin: 0 10px;
  }
`;
const Total = styled.div`
  margin-bottom: 20px;
`;
const Paragraph = styled.div`
  color: #243573;

  & span {
    margin-left: 50px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const Cart = () => {
  const goods = useStore((state) => state.goods);
  const increase = useStore((state) => state.increase);
  const decrease = useStore((state) => state.decrease);
  const deleteGood = useStore((state) => state.delete);
  const sum = useStore((state) => state.sum);
  const together = useStore((state) => state.together);
  const navigation = useNavigate();

  return (
    <Container>
      <Breadcrumbs
        links={[
          { name: "Cart", link: "/cart", active: true, current: true },
          {
            name: "Contact information",
            link: "/contact-information",
            active: goods.length ? true : false,
            current: false,
          },
          {
            name: "Shipment information",
            link: "/shipment-information",
            active: false,
            current: false,
          },
        ]}
      />
      {goods.length ? (
        goods.map((good) => (
          <CartItem key={good.id}>
            <CartImage
              src={`../../public/images/${good.img}`}
              alt={good.alt}
            ></CartImage>
            <Wrapper>
              <Flex>
                <CartName>{good.name}</CartName>
                <Button click={() => deleteGood(good)}>
                  <img src={basket} alt="basket icon" />
                  delete
                </Button>
              </Flex>
              <Flex>
                <CartControll>
                  <Button click={() => decrease(good)}>
                    <img src={minus} alt="minus icon" />
                  </Button>
                  <span>{good.count}</span>
                  <Button click={() => increase(good)}>
                    <img src={plus} alt="plus icon" />
                  </Button>
                </CartControll>
                <Price>
                  Price: <span>$179.99</span>
                </Price>
              </Flex>
            </Wrapper>
          </CartItem>
        ))
      ) : (
        <h3>Add something to cart</h3>
      )}
      <Total>
        <Group>
          <Paragraph>
            Together: <span>{together}</span>
          </Paragraph>
          <Paragraph>
            Sum: <span>${sum}</span>
          </Paragraph>
        </Group>
        <Button
          disabled={!goods.length}
          click={() => navigation("/contact-information")}
        >
          Next step
        </Button>
      </Total>
    </Container>
  );
};

export default Cart;
