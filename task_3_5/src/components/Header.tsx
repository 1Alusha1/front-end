import styled from "styled-components";
import LogoIcon from "../assets/images/logo.svg";
import cartIcon from "../assets/images/cartIcon.svg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeaderEl = styled.header`
  width: 100%;
  margin-bottom: 32px;
  padding: 20px;
  background: #171717;
  box-shadow: 0px 4px 4px 0px #00000040;
`;
const Logo = styled.img``;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Header = () => {
  const navigation = useNavigate();
  return (
    <HeaderEl>
      <div className="container">
        <Wrapper>
          <Logo src={LogoIcon}></Logo>
          <Button click={() => navigation("/cart")} cart={true}>
            <img src={cartIcon} alt="cart icon" /> Cart
          </Button>
        </Wrapper>
      </div>
    </HeaderEl>
  );
};

export default Header;
