import { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { covers } from '../lib/content';
import './TrilhaSonora.css';

// Os vídeos ficam em /assets/Música (fora de src). O Vite só resolve a URL final de
// cada arquivo aqui — o vídeo em si NÃO é baixado até alguém tocar nele. Mesma
// estratégia das páginas Cartinhas e Scrapbook.
// O padrão usa "*" no lugar do nome da pasta para não depender de como o sistema
// grava o acento de "Música" (macOS decompõe); a pasta é conferida logo abaixo.
const videoModules = import.meta.glob('../../assets/*/*.{mp4,webm,mov,MP4,MOV,WEBM}', {
  query: '?url',
  import: 'default',
  eager: true,
});

// Aspecto padrão dos vídeos atuais (474×850, gravados na vertical).
const DEFAULT_ASPECT = '474 / 850';

const normalize = (s) => s.normalize('NFC').toLowerCase();

// '../../assets/Música/iris.mp4' -> { folder: 'Música', file: 'iris.mp4' }
function parsePath(path) {
  const [folder, file] = path.split('assets/')[1].split('/');
  return { folder, file };
}

// Só usado para arquivos que ainda não foram cadastrados em content.js:
// 'meu_cover-novo.mp4' -> 'Meu cover novo'.
function titleFromFile(file) {
  const name = file
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function buildTracks() {
  const files = Object.entries(videoModules)
    .map(([path, url]) => ({ ...parsePath(path), url }))
    .filter((f) => normalize(f.folder) === 'música')
    .sort((a, b) => a.file.localeCompare(b.file, 'pt-BR', { numeric: true }));

  const listed = covers.flatMap((cover) => {
    const media = files.find((f) => normalize(f.file) === normalize(cover.file));
    if (!media) {
      if (import.meta.env.DEV) {
        console.warn(`[Trilha Sonora] "${cover.file}" está em content.js mas não existe em assets/Música.`);
      }
      return [];
    }
    return [{ ...cover, id: media.file, url: media.url }];
  });

  const unlisted = files
    .filter((f) => !covers.some((c) => normalize(c.file) === normalize(f.file)))
    .map((f) => ({ id: f.file, file: f.file, url: f.url, title: titleFromFile(f.file) }));

  return [...listed, ...unlisted];
}

const tracks = buildTracks();

// ===== Uma faixa: capa (disco) até alguém tocar, depois o vídeo =====
function Track({ track, index, active, onOpen }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const number = String(index + 1).padStart(2, '0');
  const showVideo = active && !failed;
  const showError = active && failed;

  // O vídeo só existe no DOM depois do clique. Como foi um gesto da pessoa, tocamos
  // na hora (sem isso seriam dois cliques); se o navegador não deixar, os controles
  // nativos continuam ali. Nada toca sozinho ao abrir a página.
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    video.focus({ preventScroll: true });
    video.play().catch(() => {});
  }, [active, attempt]);

  const handleOpen = () => {
    setFailed(false);
    onOpen(track.id);
  };

  const handleRetry = () => {
    setFailed(false);
    setAttempt((n) => n + 1);
  };

  return (
    <article className={`track ${active ? 'track--active' : ''}`}>
      <div className="track__stage" style={{ aspectRatio: track.aspect ?? DEFAULT_ASPECT }}>
        {showVideo && (
          <video
            key={attempt}
            ref={videoRef}
            className="track__video"
            src={track.url}
            controls
            playsInline
            preload="auto"
            aria-label={`Vídeo: ${track.title}`}
            onError={() => setFailed(true)}
          />
        )}

        {showError && (
          <div className="track__error" role="alert">
            <p>Não consegui carregar este vídeo.</p>
            <button type="button" className="track__retry" onClick={handleRetry}>
              <RotateCcw size={16} />
              Tentar de novo
            </button>
          </div>
        )}

        {!active && (
          <button
            type="button"
            className="track__cover"
            onClick={handleOpen}
            aria-label={`Tocar ${track.title}`}
          >
            <span className="track__number" aria-hidden="true">
              {number}
            </span>

            <span className="track__vinyl" aria-hidden="true">
              <span className="track__grooves" />
              <span className="track__label">
                <Play size={22} fill="currentColor" strokeWidth={0} />
              </span>
            </span>

            <span className="track__hint" aria-hidden="true">
              toque para ouvir
            </span>
          </button>
        )}
      </div>

      <div className="track__info">
        <span className="track__index">faixa {number}</span>
        <h2 className="track__title">{track.title}</h2>
        {track.artist && <p className="track__artist">{track.artist}</p>}
        {track.note && <p className="track__note">{track.note}</p>}
      </div>
    </article>
  );
}

// ===== Página =====
export default function TrilhaSonora() {
  // Só uma faixa fica "aberta" por vez: abrir outra desmonta o vídeo anterior, o que
  // para o som e libera o arquivo.
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="trilha">
      <div className="trilha__glow trilha__glow--lavender" aria-hidden="true" />
      <div className="trilha__glow trilha__glow--peach" aria-hidden="true" />

      <header className="trilha__intro">
        <span className="trilha__kicker">uma coleção só nossa</span>
        <h1 className="trilha__title">Trilha Sonora</h1>
        <p className="trilha__lead">
          Os covers que gravei pra você, um por faixa. Cada vídeo é uma música e uma
          lembrança — toque em um disco para ouvir.
        </p>
      </header>

      {tracks.length === 0 ? (
        <p className="trilha__empty">Os primeiros covers vão aparecer aqui.</p>
      ) : (
        <>
          <p className="trilha__count">
            {tracks.length} {tracks.length === 1 ? 'faixa' : 'faixas'}
          </p>

          <ul className="trilha__grid">
            {tracks.map((track, i) => (
              <li key={track.id} style={{ '--i': i }}>
                <Track
                  track={track}
                  index={i}
                  active={track.id === activeId}
                  onOpen={setActiveId}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
