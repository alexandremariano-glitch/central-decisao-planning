# Central de Decisão da Cadeia de Planning

Plataforma interativa de onboarding (HTML + React via CDN) para quem precisa entender a cadeia de Supply Planning de ponta a ponta.

## Como abrir

Dê dois cliques em `index.html` (precisa de internet para carregar React e as fontes). Para SharePoint/Teams, publique a pasta mantendo a estrutura `index.html`, `css/`, `js/`, `assets/`.

## Estrutura

- Mapa com seis células, todas abertas desde o início: Demand Planning, Supply Planning, DRP, Inventário, Cotas e Digital.
- Cada célula tem nove módulos, acessíveis em qualquer ordem pelo menu lateral:
  1. A dor que resolvemos
  2. Missão
  3. Inputs
  4. O que fazemos
  5. Valor gerado
  6. Outputs
  7. Como sua área se conecta
  8. Conexões com a cadeia
  9. Quiz
- O quiz dá feedback a cada resposta e concede o selo da célula.
- Com os seis selos, a conclusão mostra o selo "Visão Integrada da Cadeia de Planning" e o resumo dos quizzes.

O conteúdo fica em `js/data.js`. Progresso salvo em `localStorage`; sons via Web Audio (mute no HUD).

## Atualizar conteúdo

Edite `js/data.js` e incremente o parâmetro `?v=` dos arquivos em `index.html` para evitar cache do navegador.

A interface é escrita em `js/app.js` (JSX) e a página carrega `js/app.compiled.js`. Depois de alterar `app.js`, gere novamente o arquivo compilado com Babel (`@babel/core` + `@babel/preset-react`).
