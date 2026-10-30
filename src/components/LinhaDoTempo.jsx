import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link, useNavigationType } from 'react-router-dom';
import { ArrowDown, ArrowRight, Heart } from 'lucide-react';
import { dates, rooms, timeline } from '../lib/content';
import './LinhaDoTempo.css';

// As fotos ficam em /assets/images (fora de src). O Vite resolve cada arquivo em tempo de
// build e devolve a URL final — mesma estratégia das páginas de Scrapbook e Cartinhas.
const imageModules = import.meta.glob(
  '../../assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { query: '?url', import: 'default', eager: true },
);

// '../../assets/images/1º Encontro/foto.jpeg' -> '1º Encontro/foto.jpeg'.
// NFC porque o macOS grava acentos decompostos e o texto digitado em content.js não.
const photoUrls = new Map(
  Object.entries(imageModules).map(([path, url]) => [
    path.split('assets/images/')[1].normalize('NFC'),
    url,
  ]),
);

const room = rooms.find((r) => r.id === 'linha-do-tempo');
const futuro = rooms.find((r) => r.id === 'futuro');

// ===== Montagem dos acontecimentos a partir de content.js =====

const DAY_MS = 24 * 60 * 60 * 1000;
const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long', timeZone: 'UTC' });

// 'AAAA-MM-DD' ou 'AAAA-MM'. Tudo em UTC para o horário de verão não bagunçar a contagem de dias.
function parseDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  const hasDay = Number.isFinite(day);
  return { year, month, day, hasDay, time: Date.UTC(year, month - 1, hasDay ? day : 1) };
}

function sinceLabel(days) {
  if (days === null || days < 0) return null;
  if (days === 0) return 'O ponto de partida';
  return `${days} ${days === 1 ? 'dia depois' : 'dias depois'} de nos conhecermos`;
}

const metAt = parseDate(dates.nosConhecemos).time;

// Ordena pela data (o sort é estável: no mesmo dia vale a ordem escrita em content.js).
const events = [...timeline]
  .sort((a, b) => a.date.localeCompare(b.date))
  .map((item) => {
    const d = parseDate(item.date);
    const photoUrl = item.photo ? photoUrls.get(item.photo.normalize('NFC')) : undefined;
    if (import.meta.env.DEV && item.photo && !photoUrl) {
      console.warn(`[Linha do Tempo] Foto não encontrada em assets/images: "${item.photo}"`);
    }
    return {
      ...item,
      photoUrl,
      day: d.hasDay ? String(d.day).padStart(2, '0') : null,
      month: monthName.format(new Date(d.time)),
      year: d.year,
      // Sem o dia exato, "N dias depois" seria chute — então o rótulo some.
      since: sinceLabel(d.hasDay ? Math.round((d.time - metAt) / DAY_MS) : null),
    };
  });

// ===== Preenchimento da linha + destaque dos marcadores =====
//
// Um único "ponto de referência" fica a 55% da altura da janela. A linha se preenche até ele e
// cada marcador acende quando o ponto passa pelo seu centro — as duas coisas usam a mesma conta,
// então nunca ficam dessincronizadas.
//
// Para não pesar: o listener é passivo, o trabalho é agrupado em um requestAnimationFrame,
// as posições são medidas só quando o layout muda (não a cada scroll) e o resultado vai direto
// para o DOM (uma variável CSS e um atributo). Nada passa por estado do React, então rolar a
// página não re-renderiza nada.
const REFERENCE = 0.55;

function useTimelineProgress(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const line = root?.querySelector('.timeline__line');
    if (!line) return undefined;

    // O atributo data-reached vai no pai do marcador (o <li> ou o bloco final).
    const stops = [...root.querySelectorAll('[data-marker]')].map((marker) => ({
      marker,
      owner: marker.parentElement,
      y: 0,
      reached: null,
    }));

    let lineTop = 0;
    let lineHeight = 1;
    let lastProgress = -1;
    let frame = 0;
    let firstPass = true;
    let active = true;

    const render = () => {
      frame = 0;
      const pointer = window.scrollY + window.innerHeight * REFERENCE;
      const progress = Math.min(1, Math.max(0, (pointer - lineTop) / lineHeight));

      if (progress !== lastProgress) {
        lastProgress = progress;
        line.style.setProperty('--timeline-progress', progress.toFixed(4));
      }

      stops.forEach((stop) => {
        const reached = pointer >= stop.y;
        if (reached === stop.reached) return;
        stop.reached = reached;
        if (reached) {
          // 'initial' = já estava para trás ao abrir a página; só 'live' faz o "pulso".
          stop.owner.setAttribute('data-reached', firstPass ? 'initial' : 'live');
        } else {
          stop.owner.removeAttribute('data-reached');
        }
      });
      firstPass = false;
    };

    // Posições absolutas na página — só mudam quando o layout muda, não a cada scroll.
    const measure = () => {
      const scrollY = window.scrollY;
      const lineBox = line.getBoundingClientRect();
      lineTop = lineBox.top + scrollY;
      lineHeight = Math.max(lineBox.height, 1);
      stops.forEach((stop) => {
        const box = stop.marker.getBoundingClientRect();
        stop.y = box.top + scrollY + box.height / 2;
      });
      render();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);

    // Fontes e fotos carregando mudam a altura da página sem ninguém rolar nem redimensionar.
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(() => active && measure());

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, [rootRef]);
}

// ===== Aparição dos acontecimentos =====
// Cada [data-reveal] ganha data-visible na primeira vez que entra na tela e fica assim
// (não some ao rolar de volta, para a leitura não "piscar"). O CSS faz a animação.
function useRevealOnScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const targets = root.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-visible', ''));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-visible', '');
          observer.unobserve(entry.target);
        });
      },
      // Só revela quando o acontecimento já ganhou um pedaço da tela, e não na beirada.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef]);
}

// ===== Peças =====

function Marker({ end = false }) {
  return (
    <span
      className={`timeline__marker ${end ? 'timeline__marker--end' : ''}`}
      data-marker
      aria-hidden="true"
    >
      <Heart className="timeline__heart" />
    </span>
  );
}

function TimelineItem({ event, side }) {
  return (
    <li className={`timeline-item timeline-item--${side}`} data-reveal>
      <Marker />

      <div className="timeline-item__date">
        <time className="timeline-item__when" dateTime={event.date}>
          {event.day && <span className="timeline-item__day">{event.day}</span>}
          <span className="timeline-item__month">{event.month}</span>
          <span className="timeline-item__year">{event.year}</span>
        </time>
        {event.since && <p className="timeline-item__since">{event.since}</p>}
      </div>

      <article className="timeline-item__card">
        {event.photoUrl && (
          <figure
            className="timeline-item__photo"
            style={{ '--photo-position': event.photoPosition ?? 'center' }}
          >
            <div className="timeline-item__photo-frame">
              <img
                src={event.photoUrl}
                alt={event.photoAlt ?? ''}
                loading="lazy"
                decoding="async"
              />
            </div>
          </figure>
        )}
        {event.tag && <span className="timeline-item__tag">{event.tag}</span>}
        <h2 className="timeline-item__title">{event.title}</h2>
        <p className="timeline-item__text">{event.text}</p>
      </article>
    </li>
  );
}

// ===== Página =====
export default function LinhaDoTempo() {
  const rootRef = useRef(null);
  const navigationType = useNavigationType();

  // O app não zera o scroll ao trocar de página. Quem chega aqui por um link (PUSH) vindo do
  // meio de outra página cairia no meio da história, e a linha não começaria vazia. Voltar/
  // recarregar (POP) continua com a restauração normal do navegador.
  useLayoutEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [navigationType]);

  useTimelineProgress(rootRef);
  useRevealOnScroll(rootRef);

  return (
    <section className="timeline" ref={rootRef}>
      <div className="timeline__glow timeline__glow--blush" aria-hidden="true" />
      <div className="timeline__glow timeline__glow--peach" aria-hidden="true" />

      <header className="timeline__intro">
        <span className="timeline__kicker">{room.label}</span>
        <h1 className="timeline__title">{room.title}</h1>
        <p className="timeline__lead">{room.text}</p>
        <p className="timeline__cue">
          <ArrowDown size={20} aria-hidden="true" />
          role devagar, a linha vai se preenchendo
        </p>
      </header>

      {events.length === 0 ? (
        <p className="timeline__empty">Os primeiros momentos vão aparecer aqui.</p>
      ) : (
        <div className="timeline__path">
          <div className="timeline__track">
            {/* Trilho: pontilhado de fundo, linha colorida que enche e a "cabeça" luminosa. */}
            <div className="timeline__line" aria-hidden="true">
              <span className="timeline__line-base" />
              <span className="timeline__line-fill" />
              <span className="timeline__line-head" />
            </div>

            <ol className="timeline__list">
              {events.map((event, i) => (
                <TimelineItem
                  key={event.id}
                  event={event}
                  side={i % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </ol>
          </div>

          <div className="timeline__end">
            <Marker end />
            <div className="timeline__end-body" data-reveal>
              <p className="timeline__quote">
                Meu momento favorito da nossa história ainda não aconteceu.
              </p>
              <Link to="/futuro" className="timeline__end-link">
                Ir para {futuro.label}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
