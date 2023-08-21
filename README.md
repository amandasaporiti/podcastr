<h1 align="center">
  <img width="450px" src="https://github.com/amandasaporiti/podcastr/blob/master/src/assets/cover-readme.png?raw=true"/> 
</h1>

<h2 align="center">Podcastr</h2>

<h3 align="center">
  Escute seus podcasts de programação preferidos.
</h3>

<br>

<p align="center">
  <a href="#house-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#art-layout">Layout</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction_worker-instalação">Instalação</a>
   &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#runner-deploy">Deploy</a>
</p>

<br>

<img alt="Podcastr Home Empty Player" src="https://github.com/amandasaporiti/podcastr/blob/master/src/assets/home-empty.PNG?raw=true">
<img alt="Podcastr Home" src="https://github.com/amandasaporiti/podcastr/blob/master/src/assets/home-playing.PNG?raw=true">
<img alt="Poscastr" src="https://github.com/amandasaporiti/podcastr/blob/master/src/assets/podcastr-slug.PNG?raw=true">

<br>

## :house: Sobre o projeto

O Podcastr é um app para ouvir podcasts sobre programação. Foi abordado conceitos do Next JS como o SSG (Static Side Generation), SSR (Side Server Rendering), para trazer uma boa performance em páginas estáticas, e visando melhorar indexação.
<br>

### :art: Layout

Você pode acessar o Layout pelo <a href="https://www.figma.com/file/5KchzYko8NeeV0suqrSi6x/Podcastr-(Copy)?node-id=199601%3A1126&mode=dev">Figma

<br>

### :clipboard: Funcionalidades

- [x] Tocar podcast.
- [x] Controle de audio contendo botões para:
  - [x] Opção de repeat.
  - [x] Opção de shuffle.
  - [x] Opção de passar para o próximo podcast.
  - [x] Opção de voltar ao podcast anterior.
- [x] Quando um podcast acaba, outro começa em seguida.
- [x] Selecionar apenas um podcast para ouvir.
- [x] Opção de ir para a página específica daquele podcast selecionado.

<br>

## :computer: Tecnologias

- [ReactJS](https://nextjs.org/)
- [NextJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [Axios](https://axios-http.com/ptbr/)
- [Json Server](https://github.com/typicode/json-server)
- [Date-fns](https://date-fns.org/)
- [rc-slider](https://www.npmjs.com/package/rc-slider)

<br>

## :construction_worker: Instalação

**É necessário instalar o [Node.js](https://nodejs.org/en/download/) primeiro, e para clonar o projeto via HTTPS basta utilizar o seguinte comando:**

```bash
# Clone este repositório.
$ git clone https://github.com/amandasaporiti/podcastr.git

# Instale as dependências
$ npm install
$ yarn

# Execute aplicação
$ npm run dev
$ yarn dev

# O app vai está rodando na porta 3000 - acesse <http://localhost:3000>

# API BASE URL
$ https://podcastr-json-server-api.vercel.app

#endpoint

$ /episodes
```

<br>
<br>

## :runner: Deploy

[We are ONLINE, try Now](https://podcastr-online.vercel.app/) :tada:<br>

<br>

<br>

<br>

Made with ♥ by Amanda Saporiti :wave:
