import React from "react";

import "./index.scss";

import DonutGrass from "../../../img/donut-grass.jpg";
import DonutBlackBg from "../../../img/donut-blackbg.jpeg";

const AboutUs = () => {
    return (
        <div className="about-us">
            <div
                className="img-header"
                style={{
                    backgroundImage: `linear-gradient(
                        90deg,
                        rgba(235, 51, 161, 0.7),
                        rgba(244, 92, 67, 0.7)
                      ), url(${DonutGrass})`
                }}
            >
                <h1>
                    Olá! Nós somos a <br />
                    Sweet-D!
                </h1>
                <hr />
                <p>
                    Somos um grupo de estudantes da Universidade Federal de
                    Uberlândia que através da disciplina de empreendedorismo do
                    curso de bacharelado em Ciência da Computação desenvolvemos
                    uma confeitaria para vendas de doces semelhante ao IFood.
                    Com tal iniciativa, juntamente desenvolvemos esse site como
                    um protótipo para aproximar o conteúdo de tecnologia da
                    informação com o pedido do trabalho de empreendedorismo.
                </p>
            </div>

            <div className="our-mission">
                <div className="first">
                    <hr />
                    <h3>NOSSA MISSÃO</h3>
                    <p>
                        Nós acreditamos no potencial que os doces tem em
                        inspirar e nutrir o espírito humano – uma pessoa, um
                        donut e uma comunidade de cada vez. Desde 2020, nossa
                        missão tem sido focada em levar as pessoas à um outro
                        mundo, onde o prazer e a inspiração agem em primeiro
                        plano. Assim, por meio de nossos doces você tem essa
                        capacidade e consegue aproveitar a suavidade dos nossos
                        mais diversos alimentos.
                    </p>
                </div>
                <div
                    className="second"
                    style={{
                        backgroundImage: `url(${DonutBlackBg})`
                    }}
                ></div>
            </div>
        </div>
    );
};

export default AboutUs;
