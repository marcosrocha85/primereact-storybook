# Sakai Storybook

Storybook em React + Vite para documentar o template [PrimeFaces Sakai React](https://github.com/primefaces/sakai-react) como um design system.

## Scripts

- `npm run storybook`: inicia o Storybook em `http://localhost:6006`.
- `npm run build-storybook`: gera o build estatico em `storybook-static`.
- `npm run dev`: abre a landing local em Vite.
- `npm run build`: valida TypeScript e gera build Vite.
- `npm run sync:sakai`: baixa ou atualiza o upstream em `vendor/sakai-react`.

## Estrutura

- `.storybook/`: configuracao do Storybook, preview global e tema do manager.
- `src/docs/`: paginas MDX de documentacao.
- `src/stories/`: stories iniciais de fundamentos, PrimeReact e layout.
- `src/sakai/`: componentes adaptados ou inspirados no Sakai.
- `scripts/`: automacoes do projeto.

## Fluxo recomendado

1. Rode `npm run sync:sakai` para trazer o codigo upstream.
2. Rode `npm run storybook`.
3. Mapeie um componente ou tela em `vendor/sakai-react`.
4. Crie uma versao documentavel em `src/sakai` e uma story em `src/stories`.
