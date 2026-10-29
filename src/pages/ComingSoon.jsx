import { Link, useLocation } from 'react-router-dom';
import { rooms } from '../lib/content';
import './ComingSoon.css';

export default function ComingSoon() {
  const { pathname } = useLocation();
  const id = pathname.replace('/', '');
  const room = rooms.find((r) => r.id === id);

  return (
    <section className="coming-soon">
      <span className="coming-soon__kicker">em construção</span>
      <h1 className="coming-soon__title">
        {room ? room.title : 'Essa página ainda está sendo escrita'}
      </h1>
      <p className="coming-soon__text">
        Essa parte da nossa casa de memórias ainda vai ganhar vida — com
        fotos, cartas e detalhes de verdade. Por enquanto, volte para o
        início.
      </p>
      <Link to="/" className="coming-soon__link">
        Voltar para o início
      </Link>
    </section>
  );
}
