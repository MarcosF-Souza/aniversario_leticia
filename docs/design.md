# System Design & Diretrizes de Estética — Projeto Aniversário Letícia (`design.md`)

Este documento consolida a identidade visual, sistema de design e decisões de interface/experiência (UI/UX) para o projeto **"Aniversário da Letícia**. O objetivo deste guia é garantir consistência visual, sensibilidade emocional e sofisticação em toda a experiência digital.

---

## 🎨 1. Paleta de Cores (Palette)

A paleta foi desenhada para transmitir afeto, aconchego, nostalgia e leveza. Substituindo tons desbotados por uma combinação vibrante mas delicada de pastéis quentes, a paleta reflete a personalidade da Letícia e a atmosfera íntima.

### Cores Principais

| Papel | Nome | Código HEX | Aplicação no Sistema |
| :--- | :--- | :--- | :--- |
| **Primary** | Rosa Suave (*Soft Pink*) | `#FFACDB` | Botões primários, destaques emocionais, marcadores no mapa, ícones ativos, cor principal da marca. |
| **Secondary** | Amarelo Quente (*Warm Peach*) | `#FFE0BB` | Fundo de seções aconchegantes (ex: Cartinhas, Scrapbook), cards secundários, destaques quentes. |
| **Tertiary** | Roxo Suave (*Soft Lavender*) | `#D1B5EE` | Seção Trilha Sonora, badges, tags de categorias, microinterações, estados de hover. |
| **Neutral** | Off-White Quente (*Warm Cream*) | `#FFF9F5` | Fundo principal da aplicação, cards e containers elevados, superfícies de leitura. |

### Cores de Suporte, Texto e Contraste

Para evitar um visual infantil ou genérico, **o preto absoluto (`#000000`) é proibido**. Utilizamos tons quentes, profundos e terrosos para textos e elementos de alto contraste.

* **Texto Principal / Headline:** Marrom Ameixa Escuro (`#3D2E35` ou `#2E2227`) — garante excelente legibilidade com conforto e calor.
* **Acentuação Primária (Vinho Escuro):** `#804760` — usado para texto em botões invertidos, ícones em destaque e bordas ativas.
* **Acentuação Secundária (Oliva Terra):** `#6E5A3D` — usado para linhas de divisão, textos secundários e ícones terrosos.
* **Acentuação Terciária (Roxo Profundo):** `#5C4375` — usado para estados ativados e ícones da área musical.
* **Fundo de Tela / Canvas:** `#D6D0CC` — tom de cinza quente e suave para a área externa de enquadramento dos cards.

---

## ✒️ 2. Tipografia (Typography)

A tipografia combina o charme editorial dos livros e revistas de moda com a clareza de interfaces modernas.

### Fontes Principais

1. **Headline (Títulos Principais): `Playfair Display`**
   * *Estilo:* Serifada clássica, elegante, cinematográfica.
   * *Uso:* Títulos de páginas, cabeçalhos dos capítulos, frases de impacto e citações destacadas.
   * *Pesos:* Bold (700), Semi-Bold (600), Italic (400i).

2. **Body & Label (Corpo de Texto e Rótulos): `Literata`**
   * *Estilo:* Serifada contemporânea projetada para leitura digital prolongada, com toque de livro de memórias/diário.
   * *Uso:* Cartas, descrições do scrapbook, detalhes do mapa, textos corridos, botões e labels de navegação.
   * *Pesos:* Regular (400), Medium (500), Semi-Bold (600).

3. **Accent / Handwritten (Fonte Manuscrita Complementar - Opcional): `Caveat` ou `Sacramento`**
   * *Estilo:* Manuscrito pessoal, delicado e espontâneo.
   * *Uso:* Anotações nas margens das fotos do scrapbook, bilhetinhos secretamente "colados", datas de momentos e assinaturas.

### Hierarquia Tipográfica

| Elemento | Fonte | Tamanho (Desktop) | Tamanho (Mobile) | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | Playfair Display | 48px - 64px | 32px - 40px | 1.1 | -0.02em |
| **H1 (Capítulos)** | Playfair Display | 32px - 40px | 24px - 28px | 1.2 | -0.01em |
| **H2 (Subseções)** | Playfair Display | 24px - 28px | 20px - 22px | 1.3 | Normal |
| **H3 / Subtítulos** | Literata (Medium) | 18px - 20px | 16px - 18px | 1.4 | Normal |
| **Body (Texto)** | Literata (Regular) | 16px - 18px | 15px - 16px | 1.6 | +0.01em |
| **Label / Caption**| Literata (Medium) | 13px - 14px | 12px - 13px | 1.4 | +0.02em |
| **Sticky Note** | Caveat / Sacramento | 20px - 24px | 18px - 20px | 1.3 | Normal |

---

## 💡 3. Iluminação & Atmosfera (Lighting & Glow)

A atmosfera visual deve simular a luz natural do fim da tarde (*Golden Hour*) e o brilho suave da fotografia analógica.

* **Glow Ambiental (Ambient Aura):** Gradientes radiais extremamente difusos e de baixa opacidade (15-25%) utilizando `#FFACDB` e `#FFE0BB` atrás de cards e fotos para criar uma aura calorosa.
* **Luz Analógica (Light Leaks):** Pequenos efeitos de sobreposição de luz estilo filme 35mm em fotos e transições de capítulo.
* **Backdrop Blur & Transparência:** Superfícies translúcidas com `backdrop-filter: blur(12px)` e background `rgba(255, 249, 245, 0.85)` para modals, cards flutuantes e barra de navegação.

---

## 🌑 4. Sombras & Profundidade (Shadows & Elevation)

Em vez de sombras pretas frias e artificiais, o projeto utiliza sombras difusas com tonalidades marrom-vinho quentes (`#3D2E35`), simulando papel sobreposto sobre superfícies iluminadas.

* **Elevation 1 (Cards & Superfícies Estáticas):**
  `box-shadow: 0px 4px 20px rgba(61, 46, 53, 0.05);`
* **Elevation 2 (Hover & Cards Interativos):**
  `box-shadow: 0px 12px 32px rgba(61, 46, 53, 0.10);`
* **Elevation 3 (Floating Dock / Modals / Player):**
  `box-shadow: 0px 20px 48px rgba(61, 46, 53, 0.15);`
* **Efeito Scrapbook (Fotos e Selos):**
  Rotações sutis (`transform: rotate(-1.5deg)` ou `rotate(1.5deg)`) combinadas com sombra suave para criar visual de fotos coladas manualmente.

---

## 🎬 5. Motion & Animações (Motion Design)

O movimento no site deve ser fluido, calmo e cinematográfico, desacelerando suavemente (easing orgânico) para incentivar a contemplação.

### Princípios de Movimento

* **Curva de Easing Padrão:** `cubic-bezier(0.25, 1, 0.5, 1)` (Desaceleração cinematográfica e suave).
* **Duração Padrão:**
  * Microinterações (Hover, Clique): `200ms - 300ms`
  * Transições de Card/Modal: `400ms - 500ms`
  * Mudança de Capítulo/Página: `700ms - 900ms`

### Efeitos Principais

1. **Scroll Reveal (Revelação de Memórias):** As imagens e cartas surgem com um leve fade-in e subida (`translateY(20px)` -> `translateY(0)`).
2. **Hover em Fotos:** Efeito de leve ampliação (`scale(1.02)`) com aumento sutil de sombra.
3. **Animação de Troca de Músicas:** Movimento circular suave do disco de vinil/fita e transição suave na barra de progresso.
4. **Linha do Tempo Interativa:** A linha preenche gradualmente de acordo com a rolagem do usuário.

---

## 📚 6. Referências Visuais & Direção Artística (References)

O projeto combina três universos visuais para criar uma estética única:

1. **Scrapbook Premium Contemporâneo:** Texturas suaves de papel, recortes delicados, sobreposição de memórias, selos com datas, notas adesivas.
2. **Fotografia Analógica & Cinema Romântico:** Tons quentes de filtro 35mm, grão sutil opcional, sensação de enquadramento de filme (*vibe* *Before Sunrise*, *Acinzento*, *La La Land*).
3. **Editorial de Revista / Diário Pessoal:** Tipografia serifada marcante, grande uso de espaço em branco (espaço de respiro), layouts assimétricos elegantes.

---

## 🎨 7. Componentes de UI (User Interface)

### Botões

* **Primary Button:** Fundo `#FFACDB` (ou Vinho `#804760` na variação invertida), texto marrom escuro ou branco, cantos arredondados (`border-radius: 12px` ou `999px` pill), padding `12px 24px`.
* **Secondary Button:** Fundo `#FFE0BB`, texto escuro terroso, hover suave.
* **Tertiary / Lavender Button:** Fundo `#D1B5EE` para ações alternativas.
* **Outlined Button:** Borda fina de `1.5px solid #804760` sobre fundo translúcido `#FFF9F5`.
* **Icon Buttons:** Botões de formato quadrado arredondado ou circular (`44px x 44px`) com fundos pastéis (`#FFACDB`, `#FFE0BB`, `#D1B5EE`, `#B83A3A` para ações destrutivas/favoritos).

### Cards e Containers

* **Border Radius:** Cards e containers principais com cantos bem arredondados (`20px` a `28px`), transmitindo maciez e acolhimento.
* **Bordas:** Bordas internas sutis de `1px solid rgba(61, 46, 53, 0.06)` para definição precisa de contraste.
* **Barra de Busca / Inputs:** Fundo `#FFF9F5` com borda suave, ícone de lupa e tipografia `Literata`.

---

## 🧭 8. Diretrizes de UX & Jornada Emocional (User Experience)

### Filosofia UX: "A Casa de Memórias"

A navegação deve parecer a exploração de uma casa cheia de memórias e cômodos afetivos, e não uma lista fria de páginas web.

1. **Jornada Guiada + Livre Exploração:**
   * A primeira visita oferece uma **narrativa guiada** (os 6 Capítulos: O Acaso -> A Descoberta -> A Conexão -> A Intimidade -> A Construção -> O Futuro).
   * O usuário pode alternar a qualquer momento para **modo livre exploração** através do menu interativo.

2. **Gatilhos de Intimidade e Cuidado:**
   * **Detalhes que Importam:** O destaque para símbolos como o "PIX de R$40", a "garrafa de vinho no Leblon" e a "Estação Jardim de Alah".
   * **Easter Eggs & Mensagens Escondidas:** Frases que aparecem ao passar o cursor sobre determinados objetos, botões secretamente interativos que revelam áudios ou notas de voz.

3. **Inclusividade Visual e Conforto:**
   * Leitura altamente confortável em dispositivos móveis e desktop.
   * Contraste cromático validado para leitura sem cansaço visual em horários noturnos.
   * Áudio e músicas ativados por escolha do usuário, mantendo o controle total da experiência emocional.