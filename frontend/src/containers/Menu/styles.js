import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BannerHome from '../../assets/banner-cardapio.svg';
import Background from '../../assets/fundo.svg';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f0f0f0;

  background:
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
    url(${Background});
`;

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 480px;
  width: 100%;
  position: relative;

  background: url(${BannerHome}) no-repeat;
  background-color: #1f1f1f;
  background-position: center;
  background-size: cover;

  h1 {
    font-family: 'Road Rage', sans-serif;
    font-size: 80px;
    line-height: 65px;
    color: #ffffff;
    position: absolute;

    right: 20%;
    top: 30%;
  }

  span {
    display: block;
    color: #fff;
    font-size: 20px;
  }
`;

export const CategoryMenu = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;

export const CategoryButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  background: none;
  color: ${(props) => (props.$isActiveCategory ? '#9758a6' : '#524f4f')};
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 5px;
  line-height: 20px;
  border: none;
  border-bottom: ${(props) => props.$isActiveCategory && '3px solid #9758a6'};
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  gap: 60px;
  justify-content: center;
  max-width: 1280px;
  margin: 60px auto;
`;

export const BackButton = styled(Link)`
  display: flex;
  width: fit-content;
  height: 58px;
  padding: 0 48px;
  border: 0;
  border-radius: 5px;
  background-color: #9758a6;
  font-family: 'Road Rage', sans-serif;
  font-size: 36px;
  color: #fff;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin: 20px auto;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f357c;
  }

  &:active {
    opacity: 0.9;
  }
`;
