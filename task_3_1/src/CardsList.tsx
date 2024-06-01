import styled from "styled-components";
import { useEffect, useState } from "react";
import images from "./images.json";
const Container = styled.div`
  @media (width: 320px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Card = styled.div`
  position: relative;
  width: 50%;
  height: 105px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 375px) {
    height: auto;
  }
`;

const Title = styled.div`
  position: absolute;
  left: 0;
  bottom: 5px;
  padding: 5px;
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 14px;
  background: #0000005a;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
`;

interface Image {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  userImageURL: string;
}
const PAGE_SIZE = 10;
const CadrsList = () => {
  const [loadedImages, setLoadedImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);

  const fetchImages = (page: number) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    const newImages = images.hits.slice(startIndex, endIndex);
    setLoadedImages((prevImages) => [...prevImages, ...newImages]);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchImages(1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      fetchImages(page);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);
  return (
    <Container>
      <Wrapper>
        {loadedImages.map((image) => (
          <Card key={image.id}>
            <Image src={image.previewURL} alt={image.tags} />
            <Title>{image.type}</Title>
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default CadrsList;
