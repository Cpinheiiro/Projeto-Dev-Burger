import Styled from 'styled-components';

import BannerHome from '../../assets/banner-home.svg';
import Background from '../../assets/fundo.svg';

export const Banner = Styled.div`
    background-image: url(${BannerHome});
    background-size: cover;
    background-position: center;
    height: 480px;

    h1 {
        font-family: 'Road Rage', sans-serif;
        font-size: 80px;
        color: #f4f4f4;
        position: absolute;
        right: 20%;
        top: 10%;
    }
`;

export const Container = Styled.section`
    background: linear-gradient(
        rgba(255,255,255,0.7),
        rgba(255,255,255,0.7)
    ),
    url(${Background});
    background-size: cover;
`;
