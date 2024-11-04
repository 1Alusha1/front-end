import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface BreadcrumbsProps {
  links: { name: string; link: string; active: boolean; current: boolean }[];
}

const StyledLink = styled(Link)`
  color: #243573;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbItem = styled.span<{ active: boolean }>`
  cursor: ${({ active }) => (active ? "pointer" : "default")};
  color: ${({ active }) => (active ? "#243573" : "#243573")};
`;

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <>
      {links &&
        links.map((link, index) => (
          <span key={index}>
            {link.active ? (
              <StyledLink
                to={link.link}
                style={{ color: link.current ? "#00AE1C" : "#243573" }}
              >
                {link.name}
              </StyledLink>
            ) : (
              <BreadcrumbItem active={link.active}>{link.name}</BreadcrumbItem>
            )}

            {index < links.length - 1 && <span> - </span>}
          </span>
        ))}
    </>
  );
};

export default Breadcrumbs;
