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
