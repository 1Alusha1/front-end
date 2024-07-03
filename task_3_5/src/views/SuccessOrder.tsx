import styled from "styled-components";
import successIcon from "../assets/images/successOrder.svg";
import userIcon from "../assets/images/userIcon.svg";
import vanIcon from "../assets/images/vanIcon.svg";
import callSign from "../assets/images/callSign.svg";
import useStore from "../store/OrderState";
import cartState from "../store/CartState";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
`;

const SuccessIcon = styled.img`
  display: block;
  margin-bottom: 24px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 400;
  color: #243573;
  text-align: center;
`;
const Paragraph = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  color: #243573;

  &.center {
    justify-content: center;
  }

  &.order-number {
    font-weight: 700;
  }
  &.order-date {
    color: #737373;
  }
  &.order-info {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  &.price {
    font-weight: 700;
  }

  &.total {
    font-size: 20px;
    font-weight: 700;
  }

  img {
    margin-right: 8px;
  }
`;
const Info = styled.div`
  margin-bottom: 40px;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const ContactInfo = styled.div`
  width: 45%;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px #0000001a;
`;

const UList = styled.ul``;
const Li = styled.li`
  list-style: none;
`;

const Summary = styled.div`
  margin-bottom: 40px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px #0000001a;
`;

const GoodsInfo = styled.div`
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
  border-bottom: 1px solid #c8c8c8;
`;
const GoodsImg = styled.img`
  margin-right: 8px;
  width: 90px;
  height: 90px;
`;
const GoodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin-bottom: 0;
    color: #000;
  }
`;

const Total = styled.div`
  display: flex;

  p {
    margin-bottom: 16px;
    color: #000;
  }
`;

const Amount = styled.div`
  margin-left: 57px;
`;

const SuccessOrder = () => {
  const navigation = useNavigate();
  const { userInfo, shipmentInfo, setShipmentInfo, setUserInfo } = useStore(
    (state) => ({
      userInfo: state.userInfo,
      shipmentInfo: state.shipmentInfo,
      setShipmentInfo: state.setShipmentInfo,
      setUserInfo: state.setUserInfo,
    })
  );

  const { goods, sum, clearCart } = cartState((state) => ({
    goods: state.goods,
    sum: state.sum,
    clearCart: state.clearCart,
  }));

  const backToMain = () => {
    setShipmentInfo(null);
    setUserInfo(null);
    clearCart();
    navigation("/");
  };

  return (
    <Container>
      <Info>
        <SuccessIcon src={successIcon} />
        <Title>Thank you for your order!</Title>
        <Paragraph className="center">
          The order confirmation email with details of your order and a link to
          track its progress has been sent to your email address.
        </Paragraph>
        <Paragraph className="order-number center">
          Your order # is 000000003 - PENDING
        </Paragraph>
        <Paragraph className="order-date center">
          Order Date: 6 Nov 2023
        </Paragraph>
      </Info>
      <OrderInfo>
        <ContactInfo>
          <Paragraph className="order-info">
            <img src={userIcon} alt="user icon" />
            Contact information
          </Paragraph>
          <UList>
            <Li>
              {userInfo?.firstName} {userInfo?.lastName}
            </Li>
            <Li>{userInfo?.email}</Li>
            <Li>{userInfo?.phone}</Li>
          </UList>
        </ContactInfo>
        <ContactInfo>
          <Paragraph className="order-info">
            <img src={vanIcon} alt="van icon" />
            Shipment information
          </Paragraph>
          <UList>
            <Li>
              {shipmentInfo?.address}, {shipmentInfo?.apartment}
            </Li>
            <Li>
              {shipmentInfo?.city}, {shipmentInfo?.state},{" "}
              {shipmentInfo?.zipCode}
            </Li>
            <Li>{shipmentInfo?.country}</Li>
          </UList>
        </ContactInfo>
      </OrderInfo>
      <Summary>
        <Paragraph>
          <img src={callSign} alt="call sign" /> <span>Order summary</span>
        </Paragraph>
        {goods &&
          goods.map((good) => (
            <GoodsInfo>
              <GoodsImg
                src={`../../public/images/${good.img}`}
                alt={good.alt}
              />
              <GoodsWrapper>
                <Paragraph>{good.name}</Paragraph>
                <Paragraph className="price">
                  ${good.price}, {good.count}
                </Paragraph>
              </GoodsWrapper>
            </GoodsInfo>
          ))}

        <Total>
          <div className="lineNamse">
            <Paragraph>Subtotal:</Paragraph>
            <Paragraph>Shipping & Handling:</Paragraph>
            <Paragraph>Tax:</Paragraph>
            <Paragraph className="total">Grand Total:</Paragraph>
          </div>
          <Amount>
            <Paragraph>${sum}</Paragraph>
            <Paragraph>$0.00 </Paragraph>
            <Paragraph>$0.00 </Paragraph>
            <Paragraph className="total">${sum}</Paragraph>
          </Amount>
        </Total>
      </Summary>
      <Button click={() => backToMain()}>Continue shopping</Button>
    </Container>
  );
};

export default SuccessOrder;
