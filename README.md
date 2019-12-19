# Template React

## Metodologia do fluxo de dados

Este template boilerplate Reactjs, contempla a metodologia de fluxo de dados unidirecional(one-way data flow) do React mantendo tudo rápido e fluído. Fazendo uma analogia, é como se a arquitetura da aplicação fosse uma fonte de água, onde o fluxo de água escorre de cima para baixo(elevate state). Tudo aqui é dividido, componentes e folhas de estilos e suas respectivas responsabilidades, ou seja, cada parte da aplicacão, por menor que seja, é componentizada/modularizada, tanto os arquivos .jsx quanto os .scss.

## Instalação

**NOTA:** Para executar qualquer um dos comandos abaixo, é imprescindível ter o gerenciador de dependência NPM instalado globalmente em seu computador, e nagevar para dentro do diretório root da aplicação para que todos os comandos possam ser executados com sucesso.

### Instalação das dependências do projeto

Para fazer a instalação de todas as dependências da aplicação, execute a seguinte linha de comando no terminal.

    npm i

**Nota**: Se após a intalação você receber informações de vulnerabilidades nas dependências instaladas, execute o seguinte comando para corrigir eventuais vulnerabilidades.

    npm audit fix && npm audit fix --force

### Modo desenvolvimento

Os arquivos do código fonte da aplicação estão contidos dentro do diretório `./src`.
Após concluir a instalação de todas as dependências da aplicação, é possível executar o comando de desenvolvimento no terminal.

    npm run dev

Depois de executar o comando acima, abra [http://localhost:3000](http://localhost:3000) para renderizar a aplicação no seu browser preferido.
A página será recarregada sempre que fizer edições no seu código fonte, você também verá quaisquer eventuais erros no código no seu console e no próprio browser.

### Modo produção

Este comando cria os arquivos de produção dentro do diretório ./build e inicia um servidor Express gerenciado pelo PM2 para servir a aplicação em questão. Os arquivos de produção são transpilados e minificados para obter uma melhor performance e otimização de trafego de dados ao acessar a aplicação. Para construir a aplicação em modo producão, execute o seguinte comando

    npm run start

**Nota:** Por motivos de segurança, os browsers não suportam a metodologia push state do React. Se você possui um servidor local capaz de executar aplicações node, e quiser executar o projeto em modo produção, rode no terminal o comando `npm run start` no seu servidor local. Não esqueça de ajustar a propriedade **homepage** no arquivo ./package.json localizado na raiz do projeto para setar a URL/Host do seu servidor.

### Construção do projeto

Este comando cria os arquivos de produção dentro do diretório `./build`. Os arquivos de produção são compilados para a versão ES5 do JS.
Para construir a aplicação em modo producão, execute o seguinte comando:

    npm run build

## Tecnologias integradas

- [x] ESlint
- [x] Express
- [x] Git
- [x] JavaScript - ES6
- [x] JSX
- [x] NPM
- [x] PM2
- [x] Prop-types
- [x] React
- [x] SCSS
