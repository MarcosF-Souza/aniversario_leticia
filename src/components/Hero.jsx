import DaysCounter from './DaysCounter';
import './Hero.css';

import primeiroEncontro from "/home/marcos/Desktop/Marcos/projetos/aniversario_leticia/assets/images/1º Encontro/WhatsApp Image 2026-10-11 at 00.12.27(2).jpeg";
import hojeEmDia from "/home/marcos/Desktop/Marcos/projetos/aniversario_leticia/assets/images/WhatsApp Image 2026-10-29 at 23.12.50.jpeg";

function Polaroid({ src, accent, caption, position }) {
  return (
    <figure className={`polaroid polaroid--${accent} polaroid--${position}`}>
      <div className="polaroid__frame">
        <img src={src}/>
      </div>
      <figcaption className="polaroid__caption">{caption}</figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      {/* Glow ambiental sutil, per design.md */}
      <div className="hero__glow hero__glow--blush" aria-hidden="true" />
      <div className="hero__glow hero__glow--peach" aria-hidden="true" />

      <div className="hero__grid">
        {/* Coluna de texto */}
        <div>
          <p className="hero__kicker">À Letícia, meu amor</p>

          <h1 className="hero__title">
            1 ano de nós e 23 anos seus, contado em pequenos momentos.
          </h1>

          <p className="hero__lead">
            Esse site não foi feito para ser visto apenas uma vez. Ele foi
            feito para ser revisitado sempre que você quiser lembrar da
            gente.
          </p>

          <div className="hero__counter-row">
            <DaysCounter />
          </div>

          <div className="hero__dates">
            <span className="hero__date-pill">🎂 Seu aniversário · 04/11</span>
            <span className="hero__date-pill">💌 Primeiro encontro · 01/11</span>
            <span className="hero__date-pill">💋 Primeiro beijo · 01/11</span>
            <span className="hero__date-pill">💓 1 ano que nos conhecemos · 25/10</span>
          </div>
        </div>

        {/* Coluna de "polaroids" — placeholders para fotos reais */}
        <div className="hero__photos">
          <Polaroid src={primeiroEncontro} accent="peach" caption="Primeiro Encontro" position="front"/>
          <Polaroid src={hojeEmDia} accent="blush" caption="Hoje em Dia" position="back"/>
        </div>
      </div>
    </section>
  );
}