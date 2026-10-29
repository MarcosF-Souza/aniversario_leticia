import DaysCounter from './DaysCounter';
import './Hero.css';

function Polaroid({ accent, caption, position }) {
  return (
    <figure className={`polaroid polaroid--${accent} polaroid--${position}`}>
      <div className="polaroid__frame">
        <span>sua foto aqui</span>
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
          <p className="hero__kicker">para a Letícia,</p>

          <h1 className="hero__title">
            Um ano de nós, contado em pequenos momentos.
          </h1>

          <p className="hero__lead">
            Esse site não foi feito para ser visto apenas uma vez. Ele foi
            feito para ser revisitado sempre que você quiser lembrar da
            nossa história.
          </p>

          <div className="hero__counter-row">
            <DaysCounter />
          </div>

          <div className="hero__dates">
            <span className="hero__date-pill">🎂 Seu aniversário · 04/11</span>
            <span className="hero__date-pill">💌 Primeiro encontro · 01/11</span>
            <span className="hero__date-pill">💋 Primeiro beijo · 01/11</span>
          </div>
        </div>

        {/* Coluna de "polaroids" — placeholders para fotos reais */}
        <div className="hero__photos">
          <Polaroid accent="peach" caption="Halloween, 25/10" position="front" />
          <Polaroid accent="blush" caption="Jardim de Alah" position="back" />
        </div>
      </div>
    </section>
  );
}
