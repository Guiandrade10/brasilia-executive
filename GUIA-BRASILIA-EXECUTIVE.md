# GUIA DE EXECUÇÃO: BRASÍLIA EXECUTIVE

> Guia base para o Claude Code. Executar as fases em ordem. Cada fase termina com um checklist de validação. Não avançar para a fase seguinte sem completar o checklist.

---

## 0. CONTEXTO DO PROJETO

**Negócio:** Brasília Executive. Transporte executivo de alto padrão em Brasília DF. Motoristas de terno, sedãs pretos impecáveis, pontualidade absoluta, discrição total. Rede de motoristas parceiros no mesmo padrão. Atendimento em português e inglês.

**Público-alvo:** políticos, empresários, diplomatas, executivos estrangeiros e assessorias/secretárias executivas que agendam por eles. Pessoas que vêm a Brasília para compromissos importantes e não querem depender de aplicativo.

**Objetivo único do site:** converter visitantes em conversas no WhatsApp. Não há reserva online, não há pagamento online, não há formulário. O WhatsApp é o único canal de conversão.

**Serviços oferecidos:**
1. Transfer aeroporto (BSB ↔ hotéis, reuniões, embaixadas)
2. Diárias e meias diárias com motorista executivo
3. Transporte para casamentos e eventos
4. Transporte com escolta armada (executado por empresa de segurança parceira credenciada pela Polícia Federal)
5. Atendimento bilíngue PT/EN (diferencial incluso, não serviço à parte)

**Posicionamento de copy:** vender a experiência e a confiabilidade, nunca o modelo do carro. Usar sempre "sedã executivo preto". Nunca usar a palavra "luxo". Nunca citar marca ou modelo de veículo. A frota varia entre motoristas parceiros.

### Regras absolutas de escrita (aplicar em TODO o texto do site)

- NUNCA usar travessão (—) ou meia-risca (–) em nenhum texto. Reescrever a frase com ponto, vírgula ou dois-pontos.
- Não usar padrões de escrita que soam gerados por IA: "não é X, é Y", "mais do que X", "seja para A, B ou C", triplas adjetivas repetitivas, "experiência inesquecível", "superar expectativas".
- Frases curtas. Voz ativa. Zero adjetivo inflado.
- Português do Brasil (PT-BR) na versão portuguesa. Inglês nativo e natural na versão EN (não traduzir literalmente; reescrever como um falante nativo escreveria).
- Palavras proibidas: luxo, luxury, inesquecível, unforgettable, premium demais (usar no máximo 1x no site inteiro), "o melhor de Brasília".
- Palavras âncora do vocabulário da marca: pontualidade, discrição, preço fechado, sedã executivo, motorista de terno, monitoramento de voo.

### Placeholders a substituir antes do deploy

- `{{WHATSAPP}}` → número no formato internacional, ex: 5561999999999
- `{{TELEFONE_DISPLAY}}` → formato de exibição, ex: (61) 99999-9999
- `{{EMAIL}}` → e-mail comercial
- `{{INSTAGRAM}}` → URL do perfil
- `{{CNPJ}}` → CNPJ quando disponível (rodapé)

---

## 1. FASE 1: SETUP DO PROJETO

**Stack:** Astro 5 + Tailwind CSS 4. Site 100% estático. Sem CMS, sem backend.

```bash
npm create astro@latest brasilia-executive -- --template minimal --typescript strict
cd brasilia-executive
npx astro add tailwind
npx astro add sitemap
```

**i18n nativo do Astro** em `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://brasiliaexecutive.com.br',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  integrations: [sitemap()]
});
```

**Estrutura de rotas:**

```
src/pages/
  index.astro                      → home PT
  transfer-aeroporto-brasilia.astro
  motorista-executivo-diaria.astro
  transporte-casamentos.astro
  transporte-com-escolta.astro
  en/
    index.astro                    → home EN
    brasilia-airport-transfer.astro
    executive-chauffeur-daily.astro
    wedding-transportation.astro
    secure-transportation.astro
```

**Estrutura de componentes:**

```
src/
  components/
    Header.astro
    Footer.astro
    Hero.astro
    ServiceCard.astro
    HowItWorks.astro
    Differentials.astro
    Testimonials.astro
    FAQ.astro
    WhatsAppButton.astro      → botão flutuante global
    WhatsAppCTA.astro         → CTA inline, recebe props { message, label }
    SkylineDivider.astro      → assinatura visual (ver Fase 2)
    LangSwitcher.astro
  layouts/
    Base.astro                → head completo, SEO, schema, fontes
  i18n/
    ui.ts                     → strings de interface (nav, footer, botões)
  data/
    services.ts               → dados dos serviços nos 2 idiomas
    faq.ts                    → perguntas e respostas nos 2 idiomas
```

**Checklist Fase 1:**
- [ ] Projeto roda com `npm run dev` sem erros
- [ ] Rotas PT na raiz e EN em `/en/` funcionando
- [ ] Tailwind 4 aplicando estilos

---

## 2. FASE 2: DESIGN SYSTEM

Direção visual: sobriedade diplomática. O site deve parecer papelaria de embaixada, não landing page de startup. Pouquíssimos efeitos. A elegância vem do espaçamento, da tipografia e de uma única assinatura visual.

### Tokens de cor (definir como CSS variables no Base.astro)

```css
:root {
  --ink: #16181D;        /* grafite quase preto: fundos escuros e texto de display */
  --paper: #F7F5F1;      /* off-white quente: fundo principal */
  --graphite: #3A3E46;   /* texto corrido sobre claro */
  --brass: #A8853B;      /* latão discreto: apenas detalhes finos, nunca blocos */
  --line: #D8D4CC;       /* linhas divisórias sobre claro */
  --line-dark: #2A2D34;  /* linhas divisórias sobre escuro */
}
```

Regra de uso do latão (`--brass`): somente em elementos de 1 a 2px de espessura (linhas, bordas, ícones de traço) e em pequenos textos de eyebrow. Nunca como fundo de botão ou bloco. Botões primários: fundo `--ink`, texto `--paper`.

### Tipografia

- **Display (títulos):** Marcellus (Google Fonts). Caixa alta com letter-spacing de 0.04em nos eyebrows; caixa normal nos H1/H2. Marcellus tem desenho de inscrição romana, remete a placa de instituição, combina com o vocabulário diplomático de Brasília.
- **Corpo:** Instrument Sans, pesos 400 e 500.
- **Números (tabela de preços):** Instrument Sans com `font-variant-numeric: tabular-nums`.

Escala: H1 clamp(2.2rem, 5vw, 3.6rem); H2 clamp(1.6rem, 3vw, 2.2rem); corpo 1.0625rem/1.7.

### Assinatura visual: a Linha do Horizonte

Componente `SkylineDivider.astro`: um SVG de traço contínuo de 1.5px na cor `--brass`, desenhando a silhueta de Brasília em linha única (torres e cúpulas do Congresso Nacional, Catedral, mastro da Ponte JK), usado como divisor entre seções principais. Na hero, a mesma linha aparece na base, maior, com animação única de "desenho" (stroke-dashoffset) ao carregar a página. Respeitar `prefers-reduced-motion` (sem animação nesse caso).

Esta é a única animação de destaque do site. Hovers apenas com transição sutil de cor/borda (150ms).

### Componentes base

- Botões: retos, border-radius 2px, padding generoso, sem sombra.
- Cards de serviço: fundo `--paper`, borda 1px `--line`, sem sombra, hover com borda `--brass`.
- Header: fixo, fundo `--ink`, logo tipográfico "BRASÍLIA EXECUTIVE" em Marcellus, nav à direita, botão WhatsApp destacado, seletor PT/EN.
- Footer: fundo `--ink`, 3 colunas (marca + assinatura "Grupo Andrade Mesquita", links de serviços, contato), linha de latão no topo.

**Checklist Fase 2:**
- [ ] Fontes carregando com `font-display: swap` e preload
- [ ] SkylineDivider renderizando e animando apenas na hero
- [ ] Contraste AA em todas as combinações de cor

---

## 3. FASE 3: HOME (PT e EN)

Estrutura da home, na ordem. Copy pronta abaixo; usar exatamente como escrita.

### 3.1 Hero (fundo `--ink`, foto à direita ou como fundo com overlay escuro)

**PT:**
- Eyebrow: `TRANSPORTE EXECUTIVO EM BRASÍLIA`
- H1: `Chegue com pontualidade e discrição aos compromissos que importam.`
- Sub: `Sedãs executivos pretos, motoristas de terno e preço fechado antes do embarque. Transfers de aeroporto, diárias e atendimento em inglês, com reserva direta pelo WhatsApp.`
- CTA primário: `Reservar pelo WhatsApp`
- CTA secundário (ghost): `Ver serviços e valores`

**EN:**
- Eyebrow: `EXECUTIVE TRANSPORTATION IN BRASÍLIA`
- H1: `Arrive on time, in comfort, with total discretion.`
- Sub: `Black executive sedans, suited chauffeurs and a fixed price confirmed before pickup. Airport transfers, daily hire and full English support, booked directly on WhatsApp.`
- CTA: `Book on WhatsApp` / `See services and rates`

### 3.2 Barra de confiança (logo abaixo da hero)

Quatro itens em linha, ícones de traço fino:
- PT: `Preço fechado, sem surpresa` · `Monitoramento de voo` · `Motoristas verificados` · `Atendimento em inglês`
- EN: `Fixed price, no surprises` · `Flight tracking` · `Vetted chauffeurs` · `English-speaking service`

### 3.3 Serviços (4 cards, cada um linka para a página interna)

**Card 1: Transfer Aeroporto**
- PT: `Recepção no desembarque do Aeroporto de Brasília, com monitoramento do seu voo e placa de identificação. Direto ao hotel, à reunião ou à embaixada.`
- EN: `Meet and greet at Brasília International Airport with flight tracking and a name board. Straight to your hotel, meeting or embassy.`

**Card 2: Diárias Executivas**
- PT: `Motorista à disposição por meio período ou dia completo. Agenda cheia em Brasília resolvida com um único carro e um único contato.`
- EN: `A chauffeur at your disposal for a half or full day. A packed Brasília schedule handled with one car and one point of contact.`

**Card 3: Casamentos e Eventos**
- PT: `Carro do casal, cortejo de convidados e logística de chegada. Motoristas de terno e coordenação de horários com o cerimonial.`
- EN: `Bridal car, guest transfers and arrival logistics. Suited chauffeurs working in sync with your wedding planner.`

**Card 4: Transporte com Escolta**
- PT: `Para agendas que exigem segurança reforçada. Escolta armada executada por empresa de segurança parceira, credenciada pela Polícia Federal.`
- EN: `For schedules that call for added security. Armed escort provided by a partner security firm licensed by the Brazilian Federal Police.`

### 3.4 Como funciona (3 passos, numerados porque é uma sequência real)

- PT:
  1. `Você chama no WhatsApp` — informa data, horário, origem e destino.
  2. `Confirmamos valor fechado` — sem tarifa dinâmica, sem custo escondido.
  3. `Motorista de terno no local` — antes do horário, com o carro preparado.
- EN:
  1. `Message us on WhatsApp` with date, time, pickup and destination.
  2. `We confirm a fixed price.` No surge pricing, no hidden costs.
  3. `Your chauffeur arrives early,` suited, with the car ready.

(Não usar travessão na renderização; estruturar como título do passo + parágrafo.)

### 3.5 Bloco "Por que não um aplicativo" (contraste direto, fundo `--ink`)

- PT, título: `O que um aplicativo não garante.`
- PT, texto: `Tarifa dinâmica, motorista sorteado e cancelamento em cima da hora não combinam com uma audiência às 9h ou com um voo às 6h. Aqui você fala com quem dirige, confirma o valor antes e tem o mesmo padrão em todas as corridas.`
- EN, título: `What ride-hailing apps can't promise.`
- EN, texto: `Surge pricing, random drivers and last-minute cancellations don't mix with a 9 am hearing or a 6 am flight. With us you talk to the people who drive, confirm the price upfront and get the same standard on every ride.`

### 3.6 Depoimentos (3, anônimos por discrição)

- PT, título da seção: `Discrição também é não citar nomes.`
- Depoimentos PT:
  1. `"Três anos de agenda em Brasília sem um único atraso." — Diretor de multinacional, São Paulo`
  2. `"É o contato que passo para toda delegação que recebemos." — Assessoria de embaixada`
  3. `"No dia do casamento, foi a única parte da logística que não precisei conferir." — Noiva, Lago Sul`
- EN: traduzir mantendo os cargos genéricos.
- Nota: usar aspas curvas, sem travessão antes da atribuição; renderizar a atribuição em linha separada, fonte menor.

### 3.7 FAQ (com schema FAQPage, ver Fase 6)

PT (respostas curtas, 2 a 3 frases):
1. `Vocês atendem no aeroporto de Brasília a qualquer horário?` → Sim, 24 horas, incluindo madrugada e fins de semana, com reserva antecipada pelo WhatsApp.
2. `O preço é fechado mesmo com trânsito ou atraso de voo?` → Sim. O valor confirmado na reserva é o valor final. Monitoramos o voo e ajustamos a recepção sem custo extra.
3. `Do you speak English?` → Yes. Booking, driving and support are available in English. (Manter em inglês mesmo na página PT; é um sinal para o público certo.)
4. `Como funciona o pagamento?` → Pix, cartão ou faturamento para empresas e embaixadas com agenda recorrente.
5. `Vocês emitem recibo ou nota?` → Sim, emitimos comprovante para reembolso corporativo.
6. `A escolta armada é de vocês?` → A escolta é executada por empresa de segurança parceira, credenciada pela Polícia Federal. Nós coordenamos a logística em conjunto.

EN: reescrever as 6 com naturalidade (ex.: `Do you operate at Brasília airport around the clock?`).

### 3.8 CTA final (fundo `--paper`, SkylineDivider acima)

- PT: H2 `Sua próxima agenda em Brasília, resolvida em uma mensagem.` + botão WhatsApp.
- EN: `Your next Brasília schedule, sorted in one message.`

**Checklist Fase 3:**
- [ ] Home PT e EN completas, copy exata deste guia
- [ ] Zero travessões em todo o texto renderizado
- [ ] Todos os CTAs abrindo WhatsApp com mensagem pré-preenchida correta (Fase 5)

---

## 4. FASE 4: PÁGINAS DE SERVIÇO

Estrutura padrão de cada página interna: hero curta (H1 + parágrafo) → o que está incluso (lista) → tabela de valores → como reservar (3 passos resumidos) → FAQ específica (3 perguntas) → CTA WhatsApp com mensagem contextual.

### 4.1 /transfer-aeroporto-brasilia

- Title SEO: `Transfer Aeroporto Brasília (BSB) | Preço Fechado | Brasília Executive`
- H1: `Transfer executivo no Aeroporto de Brasília`
- Abertura: `Recepção no desembarque com placa de identificação, monitoramento do voo em tempo real e sedã executivo preto aguardando. Valor confirmado antes do embarque, sem tarifa dinâmica.`
- Incluso: monitoramento de voo, 60 min de espera cortesia no desembarque, água, motorista de terno, ajuda com bagagem.
- Tabela de valores (tabular-nums, PT):

| Trajeto | Valor |
|---|---|
| Aeroporto ↔ Plano Piloto (hotéis e Esplanada) | a partir de R$ 220 |
| Aeroporto ↔ Lago Sul / Lago Norte | a partir de R$ 250 |
| Recepção com placa + espera estendida | a partir de R$ 320 |

- Nota sob a tabela: `Valores de referência. O preço fechado é confirmado na reserva, conforme horário e trajeto.`
- EN (/en/brasilia-airport-transfer): Title `Brasília Airport Transfer (BSB) | Fixed Price | Brasília Executive`; converter a tabela com `from R$ 220` (manter valores em reais).

### 4.2 /motorista-executivo-diaria

- Title: `Motorista Executivo em Brasília | Diária e Meia Diária | Brasília Executive`
- H1: `Motorista executivo à disposição, por período ou dia completo`
- Abertura: `Um único carro e um único contato para toda a sua agenda em Brasília: reuniões na Esplanada, almoços, embaixadas e retorno ao aeroporto. O motorista aguarda entre os compromissos.`
- Tabela:

| Período | Valor |
|---|---|
| Meia diária (até 6 horas) | a partir de R$ 600 |
| Diária executiva (até 10 horas) | a partir de R$ 950 |
| Hora adicional | R$ 100 |

- Incluir bloco `Para empresas e embaixadas`: faturamento mensal, motoristas fixos, tabela corporativa sob acordo.

### 4.3 /transporte-casamentos

- Title: `Carro Executivo para Casamento em Brasília | Brasília Executive`
- H1: `Transporte executivo para o seu casamento`
- Abertura: `Carro do casal, transfers de padrinhos e convidados, e chegada coordenada com o cerimonial. Motoristas de terno, carro preparado e horários cumpridos no minuto.`
- Valores: `sob consulta` com faixa de referência (`projetos a partir de R$ 900`), porque cada casamento tem logística própria.
- FAQ específica: decoração do carro, ensaio incluído, quantos carros para cortejo.

### 4.4 /transporte-com-escolta

- Title: `Transporte com Escolta Armada em Brasília | Brasília Executive`
- H1: `Transporte executivo com escolta armada`
- Abertura: `Para agendas e perfis que exigem segurança reforçada. A escolta armada é executada por empresa de segurança privada parceira, credenciada pela Polícia Federal, com coordenação de logística integrada ao seu deslocamento.`
- IMPORTANTE (compliance): deixar explícito em toda a página que a escolta é executada por empresa de segurança credenciada. Nunca descrever a Brasília Executive como executora da escolta. Valores: exclusivamente `sob consulta`. Sem tabela.
- Tom desta página: ainda mais sóbrio. Sem depoimentos, sem fotos de armamento. Foco em processo: avaliação da agenda, planejamento de rota, execução integrada.

**Checklist Fase 4:**
- [ ] 4 páginas PT + 4 páginas EN com copy completa
- [ ] Tabelas com tabular-nums e nota de "valores de referência"
- [ ] Página de escolta com linguagem de parceria credenciada em todos os parágrafos que citam execução

---

## 5. FASE 5: SISTEMA DE CONVERSÃO WHATSAPP

Formato do link: `https://wa.me/{{WHATSAPP}}?text=` + mensagem URL-encoded.

**Mensagens pré-preenchidas por contexto:**

| Contexto | PT | EN |
|---|---|---|
| Global (botão flutuante) | `Olá! Gostaria de informações sobre transporte executivo em Brasília.` | `Hello! I'd like information about executive transportation in Brasília.` |
| Transfer aeroporto | `Olá! Gostaria de reservar um transfer no Aeroporto de Brasília. Data: ___ Horário: ___ Destino: ___` | `Hello! I'd like to book a Brasília airport transfer. Date: ___ Time: ___ Destination: ___` |
| Diária | `Olá! Gostaria de um orçamento de diária com motorista executivo. Data: ___ Roteiro previsto: ___` | `Hello! I'd like a quote for daily chauffeur hire. Date: ___ Planned schedule: ___` |
| Casamento | `Olá! Gostaria de um orçamento de transporte para casamento. Data: ___ Local: ___` | `Hello! I'd like a quote for wedding transportation. Date: ___ Venue: ___` |
| Escolta | `Olá! Gostaria de informações sobre transporte com escolta.` | `Hello! I'd like information about secure transportation with escort.` |

**Botão flutuante (WhatsAppButton.astro):** canto inferior direito, círculo `--ink` com borda 1px `--brass` e ícone do WhatsApp em traço. Discreto: sem pulsar, sem balão de "fale conosco". Visível em todas as páginas.

**Tracking:** todos os links WhatsApp com `data-analytics` do contexto e evento de clique enviado ao analytics (Fase 7). O clique no WhatsApp é a métrica de conversão nº 1 do site.

**Checklist Fase 5:**
- [ ] Todos os CTAs testados em mobile abrindo o app do WhatsApp
- [ ] Mensagens corretas por página e por idioma
- [ ] Eventos de clique registrando

---

## 6. FASE 6: SEO TÉCNICO

### Meta e head (Base.astro)

- Title e description únicos por página (usar os definidos na Fase 4; para a home PT: Title `Transporte Executivo em Brasília | Transfer Aeroporto e Diárias | Brasília Executive`, description de até 155 caracteres com "preço fechado" e "atendimento em inglês").
- Canonical absoluto por página.
- `hreflang`: cada página PT aponta para a equivalente EN e vice-versa, mais `x-default` apontando para a PT.
- Open Graph + Twitter card com imagem 1200x630 (foto do carro com skyline, ver Fase 8).

### Schema.org (JSON-LD no Base.astro + por página)

1. **LocalBusiness** (todas as páginas):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Brasília Executive",
  "description": "Transporte executivo em Brasília: transfer aeroporto, diárias com motorista e atendimento bilíngue.",
  "url": "https://brasiliaexecutive.com.br",
  "telephone": "+55{{WHATSAPP}}",
  "areaServed": { "@type": "City", "name": "Brasília" },
  "address": { "@type": "PostalAddress", "addressLocality": "Brasília", "addressRegion": "DF", "addressCountry": "BR" },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "$$$",
  "knowsLanguage": ["pt-BR", "en"]
}
```
2. **Service** em cada página de serviço (com `provider` referenciando o LocalBusiness, `serviceType` e `areaServed`).
3. **FAQPage** na home e nas FAQs internas, com as perguntas exatas da Fase 3.7.
4. **BreadcrumbList** nas páginas internas.

### Conteúdo SEO adicional

- H1 único por página, já definido nas fases anteriores.
- Alt text descritivo em toda imagem, com contexto local ("sedã executivo preto em frente ao Congresso Nacional em Brasília").
- Sitemap.xml via integração (já instalada) e robots.txt liberando tudo.
- Interlinking: cada página de serviço linka para as outras 3 no rodapé de conteúdo ("Outros serviços").

**Checklist Fase 6:**
- [ ] Rich Results Test do Google validando LocalBusiness, FAQPage e Service sem erros
- [ ] hreflang validado (PT ↔ EN em todas as páginas)
- [ ] Titles e descriptions únicos, dentro dos limites de caracteres

---

## 7. FASE 7: PERFORMANCE, ACESSIBILIDADE E ANALYTICS

- Imagens: componente `<Image>` do Astro, AVIF/WebP, lazy exceto hero, `fetchpriority="high"` na imagem da hero.
- Fontes: self-host via Fontsource ou `preload` dos WOFF2; apenas os pesos usados (Marcellus 400; Instrument Sans 400/500).
- Meta Lighthouse: Performance ≥ 95 mobile, LCP < 2s, CLS < 0.05.
- Acessibilidade: foco visível em todos os interativos, contraste AA, `prefers-reduced-motion` respeitado na animação da skyline, nav utilizável por teclado, atributo `lang` correto por página (pt-BR / en).
- Analytics: Plausible ou Umami (leve, sem banner de cookie) com evento customizado `whatsapp_click` segmentado por página e idioma. Instalar Google Search Console e enviar o sitemap no dia do deploy.

**Checklist Fase 7:**
- [ ] Lighthouse mobile ≥ 95 nas 4 categorias
- [ ] Navegação completa por teclado
- [ ] Evento whatsapp_click visível no analytics

---

## 8. FASE 8: DEPLOY E PÓS-LANÇAMENTO

**Deploy:** Vercel ou Cloudflare Pages, build estático do Astro. Domínio `brasiliaexecutive.com.br` com HTTPS e redirect de www para raiz (ou o inverso, mas um só canonical).

**Checklist pós-lançamento (fora do código, mas parte da entrega):**
- [ ] Google Business Profile criado: categoria de serviço de transporte executivo, área de atendimento Brasília DF, fotos da sessão, link do site, WhatsApp
- [ ] Search Console verificado + sitemap enviado
- [ ] Perfil Instagram com o mesmo padrão visual (skyline + tipografia)
- [ ] Rotina de avaliações: pedir avaliação no Google após cada serviço concluído

### Direção da sessão de fotos (bloco de referência para o fotógrafo)

Fotografar a experiência, não pessoas identificáveis nem modelos de carro:
1. Mão de terno abrindo a porta traseira do sedã preto (foto principal da hero)
2. Sedã preto de três quartos ao entardecer com o Congresso Nacional ao fundo, placa fora do enquadramento, sem close de emblema
3. Motorista de costas ou perfil desfocado ao lado do carro
4. Banco traseiro impecável com garrafa de água
5. Placa de recepção com nome fictício ("Sr. Ribeiro") no saguão do aeroporto
6. Mãos no volante, relógio discreto
7. Ponte JK e Catedral como cenários alternativos

Tratamento: tons sóbrios, pretos profundos, luz de fim de tarde. Nada de saturação alta.

---

## APÊNDICE A: TABELA COMERCIAL INTERNA (não publicar integralmente; referência para atendimento)

| Serviço | Faixa |
|---|---|
| Transfer aeroporto ↔ Plano Piloto | R$ 220 a 280 |
| Transfer aeroporto ↔ Lagos | R$ 250 a 320 |
| Transfer com placa + espera estendida | R$ 320 a 400 |
| Meia diária (6h) | R$ 600 a 750 |
| Diária (10h) | R$ 950 a 1.200 |
| Hora extra | R$ 100 a 120 |
| Casamentos | R$ 900 a 1.500 (projeto) |
| Escolta (via parceiro credenciado) | sob consulta, margem de intermediação 15 a 20% |
| Corporativo/embaixada mensal | tabela própria, desconto por volume |

Regras: cancelamento com menos de 12h cobra 50%; pedágio e estacionamento por conta do cliente; espera cortesia de 60 min em desembarque de voo e 15 min nos demais pontos.

## APÊNDICE B: BACKLOG PÓS-MVP (não executar agora)

- Página /frota com categorias (Sedã Executivo / Sedã Premium / Blindado sob consulta)
- Blog SEO: "Quanto custa transporte executivo em Brasília", "Transfer BSB: guia completo", versões EN para embaixadas
- Página /empresas com proposta de faturamento mensal
- Terceiro idioma (espanhol) se surgir demanda de delegações
- Depoimentos reais com autorização, substituindo os iniciais
