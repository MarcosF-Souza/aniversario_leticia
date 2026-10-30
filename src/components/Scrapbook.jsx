import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Play, X } from 'lucide-react';
import { rooms, scrapbookCaptions, scrapbookSections } from '../lib/content';
import './Scrapbook.css';

// As mídias ficam em /assets (fora de src). O Vite resolve cada arquivo em tempo
// de build e devolve a URL final — mesma estratégia da página de Cartinhas.
const imageModules = import.meta.glob(
  '../../assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { query: '?url', import: 'default', eager: true },
);
const videoModules = import.meta.glob('../../assets/videos/**/*.{mp4,webm,mov,MP4,MOV}', {
  query: '?url',
  import: 'default',
  eager: true,
});

const room = rooms.find((r) => r.id === 'scrapbook');

// ===== Montagem do álbum a partir das pastas =====

// Compara nomes de pasta ignorando acentos decompostos (macOS) e maiúsculas.
const normalize = (s) => s.normalize('NFC').toLowerCase();

// '../../assets/images/praia/foto.jpeg' -> { folder: 'praia', file: 'foto.jpeg' }
function parsePath(path) {
  const parts = path.split(/assets\/(?:images|videos)\//)[1].split('/');
  const file = parts.pop();
  return { folder: parts.join('/'), file };
}

// "WhatsApp Image 2026-… " e "WhatsApp Video 2026-… " passam a ordenar pelo carimbo,
// para fotos e vídeos ficarem intercalados em vez de separados por tipo.
const sortKey = (file) => file.replace(/^WhatsApp (Image|Video) /i, '');

function buildSections() {
  const media = [
    ...Object.entries(imageModules).map(([path, url]) => ({ path, url, type: 'photo' })),
    ...Object.entries(videoModules).map(([path, url]) => ({ path, url, type: 'video' })),
  ].map((m) => ({ ...m, ...parsePath(m.path) }));

  const byFolder = new Map();
  media.forEach((m) => {
    const key = normalize(m.folder);
    if (!byFolder.has(key)) byFolder.set(key, { name: m.folder, items: [] });
    byFolder.get(key).items.push(m);
  });

  const configured = scrapbookSections.map((s) => ({ key: normalize(s.folder), title: s.title }));
  const extras = [...byFolder.entries()]
    .filter(([key]) => !configured.some((s) => s.key === key))
    .map(([key, { name }]) => ({ key, title: name }));

  return [...configured, ...extras]
    .map((s, i) => ({
      id: `album-${i}`,
      title: s.title,
      items: (byFolder.get(s.key)?.items ?? []).sort((a, b) =>
        sortKey(a.file).localeCompare(sortKey(b.file), 'pt-BR', { numeric: true }),
      ),
    }))
    .filter((s) => s.items.length > 0);
}

const sections = buildSections();

// ===== Aparência das recordações =====
// Cada item recebe um "jeitinho" da lista, em ciclo (7 não divide 2, 3 nem 4 colunas,
// então o padrão não se repete em linha reta). Rotações ficam entre -2° e 2°, como no design.md.
const looks = [
  { tilt: '-1.6deg', frame: 'polaroid', deco: 'tape-blush', drop: '0px' },
  { tilt: '1.2deg', frame: 'print', deco: 'none', drop: '10px' },
  { tilt: '-0.8deg', frame: 'print', deco: 'heart', drop: '4px' },
  { tilt: '1.7deg', frame: 'polaroid', deco: 'tape-lavender', drop: '12px' },
  { tilt: '-1.3deg', frame: 'print', deco: 'tape-peach', drop: '2px' },
  { tilt: '0.9deg', frame: 'polaroid', deco: 'none', drop: '8px' },
  { tilt: '-1.8deg', frame: 'print', deco: 'none', drop: '0px' },
];

function formatTime(seconds) {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function countLabel(items) {
  const photos = items.filter((i) => i.type === 'photo').length;
  const videos = items.length - photos;
  return [
    photos > 0 && `${photos} ${photos === 1 ? 'foto' : 'fotos'}`,
    videos > 0 && `${videos} ${videos === 1 ? 'vídeo' : 'vídeos'}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

// ===== Uma recordação (foto ou vídeo) colada na página =====
function Print({ item, look, label, onOpen }) {
  const [duration, setDuration] = useState(null);
  const isVideo = item.type === 'video';
  const caption = scrapbookCaptions[item.file];
  const polaroid = isVideo || Boolean(caption) || look.frame === 'polaroid';
  const strip = caption ?? (isVideo ? 'vídeo' : '');

  return (
    <button
      type="button"
      className={`print ${polaroid ? 'print--polaroid' : ''}`}
      style={{ '--tilt': look.tilt }}
      onClick={onOpen}
      aria-label={`Abrir ${label}`}
    >
      {look.deco.startsWith('tape') && (
        <span className={`print__tape print__tape--${look.deco.slice(5)}`} aria-hidden="true" />
      )}

      <span className="print__photo">
        {isVideo ? (
          <>
            {/* #t=0.1 faz o navegador mostrar um quadro do vídeo como miniatura. */}
            <video
              className="print__media print__media--video"
              src={`${item.url}#t=0.1`}
              preload="metadata"
              muted
              playsInline
              tabIndex={-1}
              aria-hidden="true"
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />
            <span className="print__play" aria-hidden="true">
              <Play size={20} fill="currentColor" strokeWidth={0} />
            </span>
            {duration > 0 && <span className="print__duration">{formatTime(duration)}</span>}
          </>
        ) : (
          <img className="print__media" src={item.url} alt="" decoding="async" />
        )}
      </span>

      {polaroid && <span className="print__strip">{strip}</span>}

      {look.deco === 'heart' && (
        <Heart
          className="print__heart"
          size={22}
          color="#804760"
          fill="#FFACDB"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </button>
  );
}

// ===== Visualização ampliada =====
function Lightbox({ section, index, onChange, onClose }) {
  const dialogRef = useRef(null);
  const touchStartX = useRef(null);

  const total = section.items.length;
  const item = section.items[index];
  const isVideo = item.type === 'video';
  const label = `${isVideo ? 'Vídeo' : 'Foto'} ${index + 1} de ${total} — ${section.title}`;
  const caption = scrapbookCaptions[item.file];

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    // No StrictMode (dev) o efeito roda duas vezes; o guard evita reabrir.
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Não chamamos dialog.close() aqui: ao desmontar, o <dialog> sai do DOM e
    // deixa a camada modal sozinho (chamar close() dispararia onClose de novo).
    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  const go = (next) => {
    if (next >= 0 && next < total) onChange(next);
  };

  const handleKeyDown = (e) => {
    // Em um vídeo, as setas pertencem ao player (avançar/voltar o tempo).
    if (e.target instanceof HTMLVideoElement) return;
    if (e.key === 'ArrowRight') go(index + 1);
    if (e.key === 'ArrowLeft') go(index - 1);
  };

  // Clique no fundo escuro (a área vazia ao redor da foto) fecha.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Deslizar o dedo troca de foto (nos vídeos o gesto fica com os controles do player).
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={label}
      onClose={onClose}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      {/* O palco ignora o mouse; só a foto e os botões o recebem. Assim, clicar em
          qualquer área vazia cai direto no <dialog> e fecha. */}
      <div className="lightbox__stage">
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        <figure
          key={item.url}
          className="lightbox__figure"
          onTouchStart={isVideo ? undefined : handleTouchStart}
          onTouchEnd={isVideo ? undefined : handleTouchEnd}
        >
          {isVideo ? (
            <video className="lightbox__media" src={item.url} controls autoPlay playsInline />
          ) : (
            <img className="lightbox__media" src={item.url} alt={label} />
          )}
          {caption && <figcaption className="lightbox__caption">{caption}</figcaption>}
        </figure>

        <div className="lightbox__bar">
          <button
            type="button"
            className="lightbox__nav"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <p className="lightbox__count">
            {index + 1} de {total} · {section.title}
          </p>

          <button
            type="button"
            className="lightbox__nav"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label="Próxima"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </dialog>
  );
}

// ===== Página =====
export default function Scrapbook() {
  const [selected, setSelected] = useState(null); // { sectionId, index }

  const openSection = sections.find((s) => s.id === selected?.sectionId);

  // Sem "behavior": quem decide é o scroll-behavior do CSS (suave, e desligado para
  // quem pede menos movimento — ver index.css).
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  };

  return (
    <section className="scrapbook">
      <div className="scrapbook__glow scrapbook__glow--blush" aria-hidden="true" />
      <div className="scrapbook__glow scrapbook__glow--peach" aria-hidden="true" />

      <header className="scrapbook__intro">
        <span className="scrapbook__kicker">{room.label}</span>
        <h1 className="scrapbook__title">{room.title}</h1>
        <p className="scrapbook__lead">
          {room.text} Toque em qualquer foto ou vídeo para ver de perto.
        </p>
      </header>

      {sections.length > 1 && (
        <nav className="scrapbook__chips" aria-label="Páginas do álbum">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className="scrapbook__chip"
              onClick={() => scrollToSection(s.id)}
            >
              {s.title}
            </button>
          ))}
        </nav>
      )}

      {sections.length === 0 && (
        <p className="scrapbook__empty">As primeiras recordações vão aparecer aqui.</p>
      )}

      {sections.map((section, sectionIndex) => {
        const few = section.items.length <= 3;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`album-page album-page--${sectionIndex % 2 === 0 ? 'peach' : 'blush'}`}
            aria-labelledby={`${section.id}-title`}
          >
            <header className="album-page__head">
              <div>
                <h2 id={`${section.id}-title`} className="album-page__title">
                  {section.title}
                </h2>
                <p className="album-page__meta">{countLabel(section.items)}</p>
              </div>
              <span className="album-page__stamp" aria-hidden="true">
                {section.items.length}
              </span>
            </header>

            <ul className={`album-page__board ${few ? 'album-page__board--few' : ''}`}>
              {section.items.map((item, i) => {
                const look = looks[(i + sectionIndex * 2) % looks.length];
                const kind = item.type === 'video' ? 'vídeo' : 'foto';
                return (
                  <li key={item.path} className="album-page__item" style={{ '--drop': look.drop }}>
                    <Print
                      item={item}
                      look={look}
                      label={`${kind} ${i + 1} de ${section.items.length} — ${section.title}`}
                      onOpen={() => setSelected({ sectionId: section.id, index: i })}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {openSection && (
        <Lightbox
          section={openSection}
          index={selected.index}
          onChange={(index) => setSelected({ sectionId: openSection.id, index })}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
