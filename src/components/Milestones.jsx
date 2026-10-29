import { milestones } from '../lib/content';
import './Milestones.css';

const rotations = ['-1.5deg', '1deg', '-1deg'];

export default function Milestones() {
  return (
    <section className="milestones">
      <div className="milestones__intro">
        <h2 className="milestones__title">Três datas que mudaram tudo</h2>
        <p className="milestones__subtitle">
          Antes das cartas, do mapa e do scrapbook — foi aqui que a nossa
          história começou a ser escrita.
        </p>
      </div>

      <div className="milestones__grid">
        {milestones.map((m, i) => (
          <article
            key={m.id}
            className="milestone-card"
            style={{ transform: `rotate(${rotations[i]})` }}
          >
            <span className="milestone-card__stamp">{m.stamp}</span>

            <span className="milestone-card__tag">{m.tag}</span>
            <h3 className="milestone-card__title">{m.title}</h3>
            <p className="milestone-card__text">{m.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
