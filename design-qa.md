# Portfolio implementation — visual and functional QA

Date: 2026-10-11. Scope: the 32 Portuguese and English portfolio pages.

## Source of truth and comparison state

The accepted direction is the portfolio audit in `../ai-job-search-br/reports/auditoria-portfolio-2026-10-11/ESTUDO_COMPLETO_PORTFOLIO.md`, refined by the user's request to preserve visual character, motion and small interaction details. This is an intentional redesign, not a pixel-identical reconstruction.

Source visual truth: `../ai-job-search-br/reports/implementacao-portfolio-2026-10-11/home-antes.png`, captured from the original home.

Rendered implementation: `http://127.0.0.1:4173/`; screenshot `../ai-job-search-br/reports/implementacao-portfolio-2026-10-11/home-depois-normalizada.png`.

Both images were opened together in the same comparison input. State: Portuguese home, top of page, default light theme, animation complete, desktop navigation visible. The browser override was 1280 × 724 CSS pixels; the page's drawable width was 1272 pixels. The source image is 1272 × 716 pixels; the final raw implementation capture is 1272 × 719 pixels. A comparison-only copy removes the bottom three pixels, yielding 1272 × 716 at 1:1 scale. No resampling or alteration of content was performed; originals are retained. No density mismatch was used to judge fidelity.

Focused comparison: `sidebar-antes.png` and `sidebar-depois.png` were opened together at 280 × 716 pixels. The original portrait, blue accent, neutral background and sidebar structure remain recognizable. Navigation labels, active states, contrast and contact controls are clearer. The new project composition was inspected in `home-produtos-final.png`; the full FA hero was inspected in `forca-desktop-final.png`. Mobile composition was inspected in `home-mobile-final.png` and `home-mobile-produtos-final.png`. These are intentional new content regions rather than unchanged source regions.

## Findings and comparison history

No actionable P0, P1 or P2 findings remain in the final pass.

- **[P1, fixed] Product evidence and hierarchy.** The source home mixed software and creative work, repeated infrastructure as a principal product, and displayed unverified operation metrics. The implementation groups own products, academic teamwork, and creative work; infrastructure is a complementary case. Product imagery uses actual captured interfaces. Source metrics were removed rather than presented as measurements.
- **[P2, fixed] Loss of visual distinction during organization changes.** Early implementation cards had overly uniform treatment. The final home uses individual FA, Miguel, Busca and Hyro palettes, real interface compositions, refined type hierarchy, restrained elevation, image movement and arrows on hover. The latest desktop and mobile evidence confirms that identity and hierarchy coexist.
- **[P2, fixed] Hero and grid overflow.** Initial responsive checks found decorative hero overflow and four-column flow tracks wider than narrow screens. Heroes now clip decorative overflow and flow tracks use responsive `minmax(0, 1fr)` columns. Follow-up checks found long headings and Hyro's miniature path overflow near the desktop breakpoint; shrinkable heading columns and a vertical path at intermediate widths resolve those cases. Latest evidence: `responsive-narrow-final.json`, 38 clean checks, including all 32 pages at 320 pixels and six affected technology routes at 969 pixels.
- **[P2, fixed] Inconsistent navigation and modal behavior.** Duplicated menu scripts, sidebar font resizing and obsolete language animations were replaced by a shared shell. Mobile menu and image dialogs support keyboard navigation, Escape, focus containment and focus restoration. Existing galleries and product demonstrations remain functional.
- **[P2, fixed] Credential, CV and metadata drift.** Broken public credential links now open local IBM PDFs. The public CV includes the confirmed academic contribution rather than claiming all implementation work. Person metadata no longer implies completed graduation; canonical URLs, language alternates and the 32-page sitemap match the published route structure.

The original full view and the revised full view were compared again after these fixes. Sidebar detail was compared separately. Changes to the hero text, portrait crop, section ordering and card proportions are expected consequences of the accepted audit, not unintended drift.

## Required fidelity surfaces

- **Fonts and typography:** Inter remains the reading and UI typeface. Instrument Serif is limited to the home display accent. Technical case identities retain their existing display typography. Wrapping was checked at 320, 390, 968, 969 and 1280 pixel browser widths. No text is made unreadably small to fit the navigation.
- **Spacing and layout rhythm:** Home section spacing, two-column product grouping, creative collection, sidebar and mobile header were inspected. Product copy remains visible without hovering. The mobile layout does not overflow horizontally. Page-specific dark and light cases share consistent navigation without erasing their visual identities.
- **Colors and tokens:** The existing neutral/blue portfolio frame remains; FA uses its gold/dark palette, Miguel a restrained warm frame, Busca green, and Hyro cyan/dark. Hover and keyboard focus are visible. Dark navigation contrast was strengthened.
- **Image quality and fidelity:** Existing creative artwork and product screenshots were preserved. Real Manager and Community captures replace the abstract product cover. The original FA mark is used as an image asset. No invented dashboards, online counts, fake queues or substitute drawings were introduced. Detailed FA captures can be enlarged and viewed at original size. Public images exclude the private local path present in an unused full Manager screenshot.
- **Copy and content:** Benefits lead technical detail. The contribution in collective projects is explicit; presentation leadership is credited. Community history is separated from software development starting November 2025. Manager and Community development stages are stated. Private investor discussions are absent.

## Browser and functional validation

- All 32 routes loaded in the browser at desktop and mobile sizes; additional narrow and breakpoint checks cover the previously affected layouts.
- Mobile menu: open/close, Tab and Shift+Tab containment, Escape and opener focus restoration.
- Lô gallery: keyboard opening, Escape and restored image focus.
- FA image viewer: keyboard opening, original-size toggle, Escape and restored opener focus.
- Hyro interactive chat, Busca gallery and Miguel compatibility control responded to selection.
- Contact form: visible required-field validation. Six meaningful isolated behavior checks passed: invalid input, HTTP failure, network failure, successful reset, duplicate submission prevention and timeout. No real test email was sent.
- Reduced-motion preferences skip/cancel entrance motion and disable movement transitions; content remains visible without the motion enhancement. Native cross-document view transitions are progressive enhancement.
- Browser console checks found no local `ReferenceError`, `TypeError` or `SyntaxError`. Third-party provider warnings are not treated as proof of a local implementation failure.
- Static verification: 32 pages, 1,940 local references, 52 parsed scripts, zero errors and zero warnings. `git diff --check` passed.
- Public CV: regenerated as a two-page PDF, both pages rendered and visually inspected. IBM credential PDFs were checked against their originals and contain no government identifiers or private login contact details.

## Residual test limits

Real contact delivery was not exercised to avoid sending unsolicited test mail. Native view transitions depend on browser support; the navigation works without them. No conversion rate or recruiter outcome is claimed from visual QA.

## Implementation checklist

- [x] Preserve the portfolio's visual identity while improving organization.
- [x] Restore distinctive product imagery, typography and restrained motion.
- [x] Verify the five fidelity surfaces and focused regions.
- [x] Repair all recorded P0/P1/P2 findings and compare final captures again.
- [x] Verify responsive layouts and primary keyboard interactions.
- [x] Check public PDFs, local references, scripts and metadata.

## Follow-up: restore the original navigation details

The user requested the old menu icons and language selector. Source assets were read directly from commit `672700392ce58105b2b6217ada57b7d85595a46b`. The original person, return arrow, chat and social SVGs are reused; WhatsApp is restored with the public professional contact. The original Brazil/US flags are copied as SVG assets. No new icon drawings substitute those originals.

Source evidence: `menu-original-detalhe.png`; revised evidence: `menu-restaurado-detalhe.png`, both in the report folder named above. Both were opened together in one comparison input at 280 × 712 pixels, 1:1, without resampling. The desktop browser viewport was 1280 × 716 CSS pixels; the screenshot's drawable width was 1272 pixels. The focused source crop removes only four bottom pixels to match the revised capture. The full revised view is `menu-restaurado-local.png`. The type sizes, navigation groups and 44-pixel interaction targets from the accepted redesign remain intentional; the restored flags, capsule, shadow, person and chat marks visibly match the original visual vocabulary.

The capsule again has the original enlarged hover and elastic return. An optional Pointer Events enhancement adds horizontal drag while preserving native links, vertical touch scrolling and reduced-motion preferences. Clicks are not delayed; each language remains a real anchor, and the current page determines the resting pill position, including hidden mobile menus. The old single-button toggling and global touch interception were not reinstated.

Browser checks confirmed desktop PT→EN with Enter and EN→PT with click; mobile language switching preserves the selected case route. The English pill sits under EN when the mobile menu opens. Escape closes the menu and restores focus to the trigger. Internal pages display the original return icon. Light/dark and 320-pixel mobile states were inspected without horizontal overflow. Eight isolated gesture/native-link scenarios passed, including cancellation and reduced motion. Physical touch/drag was not exercised through the browser control surface; this remains a test limitation, not a claim of on-device gesture validation.

Comparison history: **[P2, fixed]** the first mobile capture showed icons touching their text. A 10-pixel flex gap fixes both main navigation and contact. Final capture `menu-restaurado-mobile-final.png` was opened and inspected after the correction. No actionable P0/P1/P2 findings remain. Final static verification covers 32 pages, 2,100 local references and 53 scripts with zero errors/warnings.

final result: passed

## Art direction and case depth — 2026-10-11

Source visual truth: the previously published631c504 site, existing original artwork and authentic product captures. This is an intentional redesign, not a pixel clone. Larger cover stages, product chapters and case-specific typography/materials are approved scope.

Evidence directory: `C:/Users/gabal/OneDrive/Documentos/Buscador de emprego/ai-job-search-br/reports/implementacao-portfolio-2026-10-11`.

Full comparisons opened together in one comparison input:
- `capas-arte-antes.png` / `capas-arte-local-final.png`: both1105×878px, same home software anchor, desktop viewport1113×884CSSpx. The8px gutter and bottom capture crop are identical. No rescaling.
- `community-caso-antes.jpg` / `community-caso-depois-final.jpg`: both1265×889px, viewport1280×900CSSpx, same Community anchor. Screenshot gutters/crop are identical. Full-width evidence and the shorter heading are intended changes.
- `sobre-arte-antes.png` / `sobre-arte-local-1.png` / `sobre-arte-local-2.png`: same1105×878px desktop frames, including the actual navigation-overlay bug and corrected chapter row.
- `sobre-arte-mobile.png` / `sobre-arte-mobile-2.png`: same312×780px captures of the320×800CSSpx viewport; no density rescaling. The legacy grid-row problem is visibly resolved.

Focused surfaces: cover screenshots, About portrait/chapter navigation, FA real image layers and Lô typography were additionally inspected. Original graphic files were opened directly; logos and UI assets are retained rather than reconstructed. `lo-caso-arte-final.jpg` records the original green/cream palette with Instrument Serif400. Browser font-loading checks passed.

Findings and repairs:
- P1 About: internal fixed aside overlaid navigation. Replaced it with a normal-flow div. Sidebar is visible; notes remain in the document flow.
- P2 About: global nav flex-direction made chapter links a long column. Explicit row direction fixes it; desktop comparison repeated.
- P2 About mobile: legacy image grid-row placed caption above the portrait. Reset grid-row; matched mobile captures confirm repair.
- P2 new mobile case hero: eyebrow was behind the fixed header. Restored108px plus safe-area clearance. DOM and mobile captures confirm the opening is clear.
- P2 narrow technology covers: Miguel heading collided with the window; Hyro footer caption collided with the screenshot. Compact labels, container-specific spacing and removal of redundant tiny labels repaired them. Layered artwork adapts to card width, not only viewport width.
- P2 old video controls: caption/fullscreen controls extended beyond320px. Wrapped control groups without removing functions and kept44px buttons.
- P2 motion: generic old image zoom competed with the new art and parent cards still animated with reduced motion. Excluded art-cover and added final motion overrides.
- P2 player duration: original controller updated duration only during timeupdate. Added metadata/duration listeners and initialization. It now shows0:00/16:28 before playback.
- Media compatibility: HEVC has conditional browser support. Added a full-length960×540VP9/Opus web version,24,576,371bytes, within Pages25MiB asset limit. Original MP4 remains available. The new version played to2:04 in the review browser with audio muted, then paused successfully.

Required surfaces:
- Typography: Inter, Syne and DM Mono retained where appropriate; Instrument Serif400 used for Lô/podcast and About accents. No synthetic bold on that face. Labels and body copy wrap without truncation in tested sizes.
- Rhythm: per-case material and spacing, readable product chapters, consistent case endings. Larger evidence is deliberate. New interactive studies keep stable stages; changes follow visitor action.
- Tokens: authentic artwork palettes; neutral/blue portfolio shell preserved, FA black/gold. Light text and descriptive copy contrast improved. Selected/focus states are visible.
- Asset fidelity: all logos and native interface images are original. New Community capture is anonymous/public and excludes unverified trending totals. New film still is extracted from the existing published documentary at02:10. No fictional online-player counts, queued downloads, user messages or metrics.
- Copy: accurate ownership, contribution, academic dates and product stages preserved. Architecture and crop demonstrations are labeled as explanations/illustrative views, not operational sessions or platform performance results.

Interactions verified in the browser: actual FA pointer hover, keyboard focus on layered covers; gallery History selection; shared-services→Community architecture selection; G mark dark variant (correct file/surface/pressed state); Valorada central crop; thumbnail Compact160px; Miguel smaller-size preset and resulting priority order; image viewer open, Escape close (hidden/display:none) and focus return; video metadata, muted playback and pause. Reduced-motion CSS and handler paths inspected; no automatic activity simulations.

Responsive evidence:30 changed routes at320px and969px without document overflow, broken loaded images or off-screen main controls. After final control changes,15 relevant routes rechecked at320px and7 at768px; no issues. JSON files `casos-arte-qa-320.json`, `casos-arte-qa-969.json`, `casos-arte-qa-320-final.json`, `casos-arte-qa-768-final.json` contain the observations.

Static verification:32 pages,2206 local references,54 scripts parsed,0 errors/warnings. Git whitespace check passes. No runtime error logs in the final reviewed case. Contact behavior was not modified. All public assets satisfy the25MiB limit; media conversion tools and rejected trial encodes are outside the repository.

Sources: [MDN video codec guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs), [Cloudflare Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

Residual limits: only the active review-browser engine was used for physical interaction/video playback; no claim of testing every browser or physical device. Screenshot capture gutters are recorded above. No actionable P0/P1/P2 findings remain.

final result: passed


## Revisão de trajetória, contato e movimento — 11/10/2026

Fonte visual: C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\03-contato-original.jpg e C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\01-sobre-antes.jpg; original6727003 aberto no navegador nesta rodada, versão pré-ajuste dc86133. Alvo: recuperar presença visual, recursos do contato e movimento do original, com a organização aprovada e caminhos para clientes e recrutadores. Diferenças de conteúdo/layout são intencionais; não é um clone.

Implementação: C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\05-contato-revisao-2.jpg, C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\06-sobre-revisao-1.jpg, C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\09-formacao-final.jpg, C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-trajetoria-contato-2026-10-11\16-encerramento-fa-final.jpg.
Dimensões dos arquivos: {'01-sobre-antes.jpg': (1105, 878), '03-contato-original.jpg': (1105, 878), '05-contato-revisao-2.jpg': (1105, 878), '06-sobre-revisao-1.jpg': (1105, 878), '12-sobre-mobile.jpg': (382, 844), '14-menu-mobile-final.jpg': (390, 844), '15-contato-mobile-final.jpg': (382, 827), '16-encerramento-fa-final.jpg': (1098, 872), '17-encerramento-en-final.jpg': (1105, 878)}. Default viewport desktop IAB~1113×884CSS, capturas1105×878 (normalização uniforme do backend); celular390×844CSS, captura382×844. Comparação feita com os pares original/implementação no mesmo input de imagens, com as mesmas dimensões desktop. Regiões de rótulos, campos, ícones e sidebar são legíveis na comparação inteira; captura específica de formação e experiência usada para detalhes das marcas/atribuição. Não houve comparação falsa entre densidades diferentes.

### Histórico das correções
- P1: Contato perdeu visual/cópia. Cartões restabelecidos, título com Instrument Serif, links sociais reais e botão de copiar com feedback. Estado anterior02-contato-antes, comparação03-original/05-pós-ajuste.
- P1: Encerramento apenas para emprego. Nova assinatura G e caminhos de projeto/orçamento e oportunidade, pré-selecionando o assunto no formulário. Pós-ajuste11 e16/17.
- P2: Sobre sem experiência de produto atual/apoio informal. Força Aliada em destaque (nov2025 software,2021comunidade), autônomo sob demanda separado de emprego formal; screenshot08.
- P2: Reconhecimento/atalhos. Marcas oficiais de UNIVESP/Liceu/Fábricas de Cultura, sem recoloração; ícones Font Awesome+nomes;12/09.
- P2: Redes do Contato herdavam nav em coluna. Explicitado row/flex:none; antes04, depois05/15.
- P2: Menu móvel longo. Grade de duas colunas por grupo, mesmas rotas, toque≥44px;13 antes/14 depois. Não substituído por um segundo menu.
- P2: Aparente piscada ao rolar. Removida queda de opacidade de elementos já pintados, animação uma vez por bloco, sem pais/filhos simultâneos. Três rolagens repetidas registradas em scroll-stability.json: wrappers/imagens opacidade1, console sem erros. Limite: não é teste físico em todos os dispositivos/GPU.

### Superfícies avaliadas
- Tipografia: Inter existente e Instrument Serif400, sem serif sintética em negrito; hierarquia/tamanhos/quebras conferidos em PT/EN.
- Layout: duas colunas contato, atalhos5/3, timeline e marcas; 34 navegações a320px representam 32 rotas renderizadas (aliases redirecionam); superfícies críticas também768 e969. Sem overflow, controles fora do viewport ou imagens visíveis sem arquivo.
- Cor: azul original e navy da assinatura, contraste perceptivo de rótulos/foco, estados verde/vermelho apenas para feedback. Não se afirma WCAG completa.
- Imagem: logoG e retrato originais, logos institucionais baixados das fontes oficiais (FONTES.md), captura/interfaces dos projetos preservadas. Nada de métricas/atividade fictícias.
- Conteúdo: atuação real, suporte eventual sem experiência corporativa inventada, fechas corretas, idiomas/CNH preservados, perfil serve trajetória/projetos e oportunidades. Nenhuma negociação privada incluída.
- Interação: blank-submit destaca campos e foca Nome; rádio muda dica sem apagar texto; link CTA escolhe assunto; cópia exibe feedback; menu Tab/Escape e restauração de foco/inert conferidos. Galerias e demos anteriores preservados.
- Formulário: respostas mock locais de sucesso/falha, sem enviar e-mail. Sucesso limpa campos e restaura ícone; erro preserva mensagem e libera tentativa. Não se afirma teste de entrega por Formspree. A chave existente de reCAPTCHA continua carregando no domínio de produção; hostnames de preview/local não usam a chave de outro domínio. Clipboard virtual do agente é distinto do clipboard nativo da página: feedback confirmado, colagem no Windows não certificada.
- Redução de movimento: CSS/JS respeitam prefers-reduced-motion, não escondem conteúdo quando JS/observer falha. Identidade da cápsula de idioma mantida.

### Checklist de implementação
- [x] Experiências atuais e autônomas + formação com logos
- [x] Contato/cópia/assuntos + sucesso/falha
- [x] Encerramentos para clientes e recrutadores
- [x] Movimento sem queda de opacidade + detalhes de hover/foco/pressão
- [x] Menu móvel, responsividade e referências locais

Sem P0/P1/P2 acionável nas superfícies testadas. Resta validação empírica com visitantes e teste de entrega real, fora do escopo de disparos nesta rodada.

final result: passed


### Última iteração de pintura do menu
A conferência pública teve capturas intermitentes com a camada fixa do menu incompleta, apesar dos elementos visíveis no DOM. A22-contato-sem-camada.jpg mostra a correção local: no desktop, removidos backdrop-filter, transform/contain forçados e backface:hidden do rail. Não há conteúdo rolando atrás dele; a composição e as cores foram preservadas. Mobile mantém seu tratamento original, e hover do retrato/cápsula de idioma permanece. Evidência anterior20/21, pós-ajuste22, mesmo viewport; captura anterior incompleta rejeitada para handoff. Fonte exata do erro de composição do backend não foi presumida. Remoção de camadas redundantes reduz essa dependência e a nova pintura foi conferida visualmente.

final result: passed


## Vídeos de tecnologia e capas — 12/10/2026

Fonte visual: as capas fornecidas em Downloads/maxresdefault(1).jpg (HyroChat) e maxresdefault.jpg (Busca Preço), ambas1280×720, copiadas sem edição/recompressão e verificadas por SHA256. Layout de base:01-videos-antes.jpg e02-thumbnails-antes.jpg, capturados nesta rodada. Implementação: C:\Users\gabal\OneDrive\Documentos\Buscador de emprego\ai-job-search-br\reports\portfolio-videos-capas-2026-10-12\11-capas-local-final.jpg; as duas imagens originais e o render da galeria foram abertos no mesmo input para comparar sujeito, recorte, proporção e legibilidade. Captura desktop1105×878pixels, viewport1113×884CSS; o backend normaliza a captura uniformemente. Nova seção adicionada à composição existente, sem intenção de clonar o screenshot anterior.

### Superfícies
Inter e pesos existentes; títulos/legendas/rótulos coerentes, com texto humano e atribuição coletiva dos projetos. Cores/raios/ritmo acompanham as páginas anteriores; imagens inteiras16:9, sem esticar nem reinterpretar a arte. Fonte/resolução original preservadas. Vídeos públicos confirmados no oEmbed oficial do YouTube, mesmo canal Tips Tutoriais: zP2FtC3UwZY, mcEqvz35Fjw, BpA8mLzkT_E. O último substitui o aviso antigo de indisponibilidade do Detector de Fraudes; suas capas já estavam na galeria, sem duplicação.

### Histórico e teste
P1: o HTML PT de Vídeos terminava sem a tag body final, e a inclusão de script não ocorria. Corrigido fechamento/inclusão, botão abre iframe; playback real confirmado em todos os3, com contador temporal e Pausar visíveis no player.
P2: a tentativa inicial de pausa por postMessage não foi confirmada. Substituída por um único iframe ativo, restaurando a capa anterior. DOM após troca:1iframe, capaHyro restaurada. Essa troca reinicia o player anterior; não se promete retenção da posição de reprodução.
Atalhos do filme local limitados ao player visível e não interceptam links/controles das apresentações, em PT eEN. Link da capa funciona como linkYouTube sem JS. Player carrega somente na ativação; iframe de privacidade YouTube, sem falso player pintado. Abertura por Enter conferida; ampliação da capa carregou arquivo original e Escape fechou com restauração do foco. Layouts4rotas×320/969CSS: sem overflow e sem imagens visíveis quebradas. Console da galeria sem erro. Original documentário e seus controles preservados.

Capturas03–06 foram preliminares ou de página em cache e não usadas como prova da seção concluída.09-mobile mostrava contexto, não toda a capa; avaliação responsiva também usou geometria e estados do DOM.11 mostra galeria completa em estado de foco por teclado. Vídeos são conteúdo externo do YouTube, sujeito à disponibilidade do provedor; nenhuma data de upload ou métrica foi inventada.

Checklist: vídeosHyro/Busca, Detector recuperado, capasoriginais, links correspondentes, inglês, zoom/teclado, dimensões responsivas.

final result: passed

## Inventário de microinterações — 12/10/2026

### Mapa por superfície

- **Navegação compartilhada:** links laterais e menu móvel indicam foco, hover e página atual; setas acompanham a direção do destino; abrir e fechar o menu mantém a transição curta. A cápsula PT/EN conserva arraste e clique, com menos deformação e resposta instantânea quando o sistema pede movimento reduzido. Redes sociais recebem um realce discreto, sem chamar mais atenção que o contato.
- **Home:** CTAs movem apenas o ícone associado à ação. Cartões inteiros são links, por isso recebem elevação curta, pequena aproximação da imagem e retorno ao pressionar. As capas em camadas se deslocam pouco e sem brilho varrendo; a composição também responde ao foco de teclado.
- **Sobre:** capítulos são links de navegação e destacam a seção atual durante a rolagem. Cartões de competência e retrato são conteúdo editorial, então ficam imóveis; só os links dentro dos cartões recebem cor e sublinhado de foco/hover. Formação e experiência continuam com links identificáveis.
- **Contato:** caminhos, canais e redes realçam a ação; o botão de copiar muda de cópia para confirmação e anuncia o resultado, depois retorna ao estado inicial. Campos distinguem foco e erro, escolhas de assunto mostram seleção, e envio informa estado ocupado, sucesso ou falha sem apagar texto em caso de erro.
- **Casos de software:** chamadas, links externos, etapas de arquitetura, botões de galeria e prioridades têm estados visuais de foco/seleção/pressão. A galeria atualiza imagem, descrição e legenda anunciada; o detalhe do fluxo já era uma região anunciada. No HyroChat, escolhas criam mensagens, status acompanha o percurso e voltar/reiniciar refletem sua disponibilidade. Detalhes técnicos usam o controle nativo de expandir/recolher.
- **Imagens e estudos visuais:** capturas ampliáveis mantêm cursor de zoom e abrem o visualizador; o botão sincroniza texto, nome acessível e sinal de mais/menos com o nível atual. Controles de marca, escala e recorte destacam a escolha ativa e alteram a demonstração correspondente. Imagens meramente decorativas não simulam botões.
- **Vídeo:** a capa indica reprodução, ativa o player somente por ação e agora oferece “Voltar à capa”, com restauração do foco ao fechar. Os links relacionados deixam explícito quando abrem o YouTube.
- **Encerramento e rodapé:** o próximo projeto e os links de contato/redes têm foco visível e um retorno leve à pressão. A seta se desloca no mesmo sentido em que o visitante seguirá.

### Critérios aplicados

Uma resposta é associada ao tipo de ação: deslocamento para navegação, escala mínima para pressão, cor/contorno para seleção, e texto/ícone/estado acessível sincronizados para confirmação. Hover não substitui foco de teclado; movimento não é aplicado a cartões editoriais estáticos; setas e ícones não sugerem ações opostas ao rótulo. A entrada por rolagem foi encurtada para 480 ms e 12 px, com intervalo de até 108 ms entre itens. O `prefers-reduced-motion` elimina deslocamentos ornamentais e a deformação do seletor sem impedir seu uso.

### Alterações desta rodada

- Refinados a intensidade e o tempo dos movimentos da navegação, capas, contatos, controles de estudo e chamadas finais.
- Removido o brilho genérico que varria as capas e a movimentação de cartões de competência que não são clicáveis.
- Alinhados estados de foco/pressão e desativação nos controles de software.
- Adicionado retorno acessível para copiar e fechar apresentações embutidas; o zoom agora mantém ícone e rótulo coerentes.
- Atualizadas as referências cacheadas das folhas de estilo e scripts modificados nas páginas PT/EN.

Não foi feita publicação.

## Revisão dedicada de botões e alvos clicáveis — 12/10/2026

### Cobertura e achados

O inventário encontrou 217 elementos <button> nas 32 páginas publicadas em português e inglês, além de links de navegação, cartões acionáveis, imagens ampliáveis, detalhes expansíveis, campos e controles do player. Os estados de hover, foco, pressão e seleção variavam entre componentes. O player tinha um estado permanente de escala excessiva nos controles de velocidade e legenda. O seletor de tempo era uma área clicável que não recebia foco nem ativação nativa pelo teclado.

### Ajustes

- Uniformizado o retorno momentâneo ao pressionar links e controles, respeitando ações e estilos próprios.
- Completado o paralelo entre hover e foco de teclado na navegação, botões do menu, redes, links de contato, capítulos, detalhes, galerias e controles dos estudos de projeto.
- Mantida a aparência selecionada separada do hover. Velocidade diferente do normal e legendas ligadas ficam identificáveis sem aumentar permanentemente os ícones.
- Os menus de velocidade e legenda agora anunciam quando abrem, qual opção está selecionada e qual configuração está ativa. Escape fecha o menu e devolve o foco ao botão acionador.
- Convertido o seletor do tempo do player em botão nativo com dica da ação, mantendo a aparência visual da barra de controles.
- Mantidos estados de espera/desativação e o contorno de foco visível. Movimento decorativo continua respeitando prefers-reduced-motion; o efeito de pressão é discreto.

### Conferência

Na prévia local, conferi em português e inglês a abertura dos menus, a opção de velocidade escolhida, o estado de legendas e o fechamento por Escape com retorno do foco. Também confirmei no player o botão de alternar o tempo e seu foco visível. Revisão manual no Edge; sem testes automatizados e sem publicação.
### Estados dos controles de reprodução

O player também sincroniza o estado de reprodução, áudio silenciado e tela cheia com `aria-pressed`. Os nomes acessíveis permanecem estáveis nos controles de alternância; títulos contextuais indicam a ação seguinte. O estado de áudio e tela cheia tem uma marca visual persistente sutil, coerente com os demais estados ativos, sem ampliar os ícones. A página PT e a EN mantêm as mesmas interações e rótulos naturais em cada idioma. Conferido manualmente no Edge na prévia local; o player inicia parado, sem som e fora de tela cheia.
## Recuperação de intensidade e física das animações — 12/10/2026

Depois do retorno do Gabriel, reverti os cortes que deixaram os movimentos da home discretos demais. Os cartões voltam a subir 5 px e as imagens fotográficas ampliam 5% no hover/foco. Nas capas de Busca Preço, HyroChat, Miguel Downloader e Força Aliada, reativei o brilho diagonal e aumentei o deslocamento das interfaces em camadas, mantendo os recortes dentro da arte. O movimento de entrada retorna de 12 px/480 ms para 18 px/720 ms, com o escalonamento original entre elementos.

O seletor de idioma conserva a dimensão compacta escolhida, mas recupera a resposta elástica: expansão de hover, deformação pela velocidade do arraste, efeito de borracha nas extremidades e mola com mais ressalto no retorno. Os botões de produto, galerias, fluxo e escolhas ganham elevação, escala e ícones direcionais mais expressivos. A preferência explícita por movimento reduzido continua respeitada.

Conferido no Edge na prévia local; sem publicação.

## Refinamento da navegação lateral — 12/10/2026

O menu lateral ganhou um pouco mais de resposta sem alterar sua estrutura nem sua densidade. Links avançam 5 px ao receber hover ou foco; ícones acompanham com uma elevação e rotação curtas; o item atual recebe uma marca interna discreta. O avatar, contato e atalhos sociais respondem com leve escala ou elevação, enquanto a pressão confirma o clique sem competir com a navegação. No menu móvel, a entrada dos grupos tem um pouco mais de curso e os links recebem retorno tátil. O seletor de idioma mantém sua física líquida e seu tamanho compacto.

As interações de navegação continuam distinguindo hover, foco de teclado, estado atual e pressão. A configuração `prefers-reduced-motion` remove os deslocamentos e as transições adicionados. Conferido na prévia local; sem publicação.

## Precisão dos ícones e resposta tátil — 13/10/2026

O movimento existente de botões, navegação, capas e ícones foi preservado e restaurado. Ajustes de renderização vetorial ajudam a manter os traços nítidos durante as transições sem reduzir a intensidade das animações. A marca de Instagram da lateral usa o ícone oficial da família Font Awesome já carregada no site, e as redes ficam brancas sobre o fundo azul no hover.

O contato recebe dois pequenos traços animados de boas-vindas, e o ícone de Sobre mim responde com arcos curtos. Eles só se movimentam enquanto o item está em hover ou foco. Os botões da home e do rodapé ganham estados mais claros de passagem, foco e pressão, sem mexer nas animações das capas dos projetos.

No seletor compacto de idiomas, o clique faz a cápsula percorrer uma única vez o caminho até o idioma escolhido; a navegação ocorre ao final, sem um recuo intermediário. Pressionar e segurar comprime a cápsula e intensifica seu brilho; o arraste conserva a mola e a elasticidade existentes. Rótulos e bandeiras ficam parados e nítidos. Movimento reduzido continua respeitado.

Revisão manual na prévia local; sem testes automatizados e sem publicação.


## Pressão dos controles e estado ativo — 13/10/2026

Botões e itens de menu afundam brevemente durante a pressão, com deslocamento curto e leve escala. Retirei as sombras internas e os halos de afundamento; o seletor de idioma mantém sua física própria. Removi a faixa vertical dos itens de navegação ativos; o foco por teclado continua visível por um contorno externo.

Ajustei a sequência de ponteiro do seletor para iniciar a mola no pointer-up e consumir o clique nativo, evitando que a cápsula volte ao estado anterior antes de seguir ao destino. A posição final é aplicada sem transição CSS concorrente.

Conferido manualmente na prévia local; sem publicação.

## Afundamento consistente nos controles — 13/10/2026

Ampliei o retorno de pressão para todos os botões, links de navegação e ações clicáveis das páginas: um deslocamento curto para baixo, uma compressão leve e transição rápida. O estado acontece enquanto o botão do mouse ou o toque está pressionado e volta ao normal ao soltar. Não há sombra interna no afundamento. Os cartões de projeto mantêm seu movimento próprio, e o seletor de idioma preserva a animação líquida. Movimento reduzido continua respeitado.

## Navegação das galerias em liquid glass — 13/10/2026

No visualizador das páginas de projeto, as setas ficam sobre a própria imagem, com contador e miniaturas para saltar diretamente entre telas. A navegação também responde às setas do teclado e ao gesto horizontal no celular. Os controles usam transparência, desfoque, reflexo e contorno de vidro, com estados próprios de foco e pressão. Apliquei o mesmo acabamento às setas e ao zoom das galerias antigas; movimento reduzido continua respeitado.

## Audiovisual e proporções de imagens — 13/10/2026

Reorganizei as versões em português e inglês em duas frentes: apresentações de tecnologia e documentário da Fábrica de Cultura. Os atalhos iniciais levam diretamente às seções. As apresentações carregam o YouTube sob demanda e usam a API oficial com controles do portfólio fora da imagem: reprodução, pausa, retrocesso/avanço, progresso, volume, velocidade e tela cheia. Fechar restaura a capa; trocar de vídeo encerra a reprodução anterior. A identificação e os avisos do YouTube não são ocultados. Se a API não carregar, o iframe usa os controles originais.

Corrigi altura automática das artes de Um Minuto e Valorada nas duas línguas, além da imagem de Lô em inglês. Conferência no Edge: arte quadrada 400×400; identidade Valorada 880×494,78; banner 880×145,38, preservando as proporções dos arquivos. Conferi visualmente a abertura, a grade e o documentário, e o layout de 390 px sem rolagem horizontal. Pausa, volume, velocidade, fechamento e troca de apresentação funcionaram na prévia. Conferência de sintaxe e diff sem erros. Alterações locais, sem publicação.

## UNIVESP alinhada à Fábrica de Cultura — 13/10/2026

Retirei a grade de cartões e a barra de controles anterior. Cada apresentação segue as mesmas colunas da seção documental, com contexto à esquerda e painel branco à direita. A interface dos controles é clonada do componente da Fábrica de Cultura, reutilizando ícones, menus de velocidade e legenda, linha de progresso, volume expansível e acabamento de vidro. Os controles ficam sobre a capa antes de assistir e junto à imagem do iframe durante a reprodução, preservando a área do player do YouTube. Mantive o documentário como referência. Alterações aplicadas em português e inglês, apenas localmente.

## Player original também no YouTube — 13/10/2026

Apliquei a mesma classe e as camadas do player nativo aos três vídeos do YouTube. Retirei a barra inferior separada: progresso e controles ficam sobre a imagem com o gradiente original. O botão central, os saltos de dez segundos, o feedback de volume, os menus e o desaparecimento após 2,5 segundos usam o desenho do documentário. O iframe continua responsável pela reprodução; não houve publicação. Conferência visual no Edge dos estados de capa e pausa.


## Preparação para hospedagem gratuita — 13/10/2026

Escolhido o plano Free do Cloudinary, sem cartão e sem prazo de expiração. Limites consultados: 100 MB por vídeo e 25 créditos compartilhados entre armazenamento, processamento e tráfego. A conta existente foi conferida no painel como Free. Os arquivos serão otimizados localmente, entregues diretamente em MP4 e carregados somente ao iniciar a reprodução.

Removida a implementação com controles sobre iframe do YouTube. As apresentações agora recebem vídeos nativos e reutilizam os próprios controles e o inicializador do documentário, preservando desenho, animações e atalhos. As URLs públicas ficam em portfolio-video-sources.js, sem credenciais. Enquanto um arquivo não estiver configurado, a capa mantém um link funcional para a apresentação original.

Convertidas as legendas fornecidas de HyroChat e Busca Preço para WebVTT; Detector de Fraudes conserva as legendas existentes em português e inglês. Cópia anterior preservada em backup-player-before-cloudinary-20261013, fora do repositório.

Os três originais foram recebidos e preservados em Downloads/Miguel Downloader. Detector de Fraudes foi enviado em MP4 Full HD (52.328.868 bytes), com vídeo H.264 preservado e áudio convertido para AAC. HyroChat e Busca Preço estão em preparação para upload. As seis páginas PT/EN compartilham o player nativo em arquivos próprios de estilo e comportamento. Sem publicação do site e sem execução de testes automatizados.

## Vídeos nativos hospedados no Cloudinary — 13/10/2026

Concluído o envio dos três vídeos em MP4 H.264, 1920×1080, para a conta Free existente. As URLs apontam para arquivos completos independentes; a reprodução não depende dos trechos temporários de processamento. Total dos arquivos finais: 213.153.250 bytes.

| Apresentação | Original | Versão para o site | Duração |
| --- | ---: | ---: | ---: |
| HyroChat | 743.157.521 bytes | 82.322.668 bytes | 600,073 s |
| Busca Preço | 786.021.822 bytes | 78.501.714 bytes | 599,445 s |
| Detector de Fraudes | 52.370.141 bytes | 52.328.868 bytes | 373,141 s |

HyroChat preserva o áudio AAC original. Busca Preço recebe um único áudio contínuo convertido para AAC, sem concatenar o áudio dos trechos. Detector preserva o vídeo H.264 original, com áudio convertido para AAC. Os originais em Downloads/Miguel Downloader não foram alterados.

As versões PT/EN de audiovisual, HyroChat e Busca Preço utilizam os próprios controles do documentário da Fábrica de Cultura. O player compartilhado conserva vidro, gradiente, botões centrais, saltos de dez segundos, volume expansível, menus e animações. Legendas são servidas em WebVTT; há reprodução por toque e teclado, ajuste de velocidade, tela cheia e pausa dos outros vídeos ao iniciar uma apresentação. Os arquivos carregam somente quando a reprodução é iniciada. O YouTube fica como link externo alternativo, sem iframe ou API de reprodução.

Conferidos os metadados dos arquivos locais e dos uploads. Inspecionados visualmente quadros do Busca Preço em 120, 300 e 500 segundos e do HyroChat em 120 e 400 segundos, comparando texto e interface com a versão anterior à compressão. A conexão com o Edge permaneceu indisponível nesta etapa; não houve nova conferência visual completa das seis páginas após a extração do player compartilhado. A prévia local foi preparada com o tipo correto de WebVTT e suporte a solicitações parciais para navegar pelo vídeo do documentário.

Fontes e vídeos finais preservados localmente. Sem testes automatizados e sem publicação do site.

Limpeza concluída: removidos somente os 62 recursos temporários criados para esta preparação. Os três recursos finais permanecem independentes. Ponte local de transferência e túnel temporário encerrados; lista de arquivos permitidos esvaziada. Cópia completa do site em backup-native-cloudinary-final-20261013 e arquivos finais organizados em portfolio-videos-final-20261013, fora do repositório.

