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
- `src/stories/Sakai*.stories.tsx`: stories granulares dos componentes do Sakai UI Kit, separadas por exemplo interno como `Button/Default`, `Button/Severities`, `Panel/TabView`, `Data/TreeTable`.
- `src/stories/sakaiStoryHelpers.tsx`: helper que renderiza o demo original do upstream e isola apenas a secao selecionada.
- `src/sakai/`: componentes adaptados ou inspirados no Sakai.
- `scripts/`: automacoes do projeto.

## Componentes cobertos

O modelo novo, alinhado ao Storybook de referencia, fica em `Components/*`: uma pagina `Resumo` por componente, stories interativas com Controls e `Show code` no Canvas.

Atualmente o `Components/Button` ja segue esse formato completo:

- `Components/Button/Resumo`
- `Components/Button/Default`
- `Components/Button/Disabled`
- `Components/Button/Link`
- `Components/Button/Severities`
- `Components/Button/Text`
- `Components/Button/Outlined`
- `Components/Button/Icons`
- `Components/Button/Rounded`
- `Components/Button/Loading`
- `Components/Button/SplitButton`

Os grupos `Sakai React/*` cobrem todos os demos de componentes encontrados em `vendor/sakai-react/app/(main)/uikit`, separados por exemplo interno:

- Button
- Charts
- File
- Float Label
- Form Layout
- Input
- Invalid State
- List
- Media
- Menu
- Message
- Misc
- Overlay
- Panel, Tabs e Containers
- Table
- Tree

Cada story renderiza apenas a secao do componente correspondente e inclui o trecho de codigo do `page.tsx` original no painel Docs/Source para consulta de uso.

## Fluxo recomendado

1. Rode `npm run sync:sakai` para trazer o codigo upstream.
2. Rode `npm run storybook`.
3. Mapeie um componente ou tela em `vendor/sakai-react`.
4. Crie uma versao documentavel em `src/sakai` e uma story em `src/stories`.
