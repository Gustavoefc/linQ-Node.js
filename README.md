<h1> Sobre o Projeto </h1>

Este projeto foi desenvolvido usando:
<ul>
<li>Node.js</li>
<li>Express.js</li>
<li>Puppeteer</li>
<li>Body-Parser</li>
<li>ORM Sequelize com SQLite</li>
</ul>

Também foi utilizado algumas libs como:
<ul>
<li>Flash-connect </li>
<li>Express-session</li>
<li>Cookie-parser</li>
</ul>

<h1> MVC </h1>
Este projeto segue o padrão MVC e tentei manter um padrão de código limpo e de facil manutenção.
Segui um padrão que já sou familiarizado porque acho mais facil de trabalhar e de dar manutenção no futuro.

<h1> Funcionalidades </h1>
Toda a API gira em torno de um CRUD, toda a parte de criar, editar, excluir e a listagem estão disponiveis e de facil acesso no projeto.
Ao executar qualquer ação no CRUD é retornada uma mensagem de acordo com a utilização dos serviços assim como mostra um exemplo a seguir:
https://user-images.githubusercontent.com/96697223/219488800-c7613136-2dbc-442c-a388-f247c194c9ec.png


<h1> Importação de Links / Web Crawler </h1>
Atualmente a importação de links só de fato funcional no site da <a href="https://devgo.com.br" target="_blank"> DevGo </a>!
Feito com a API do Puppeteer facilmente pode-se possivel extrair informações do site pegando o título da materia e a URL do site <a href="https://devgo.com.br" target="_blank"> DevGo </a>, como ainda estou aprendendo sobre Web Crawler e Web Scrapping o sistema de importar links ainda não funciona em todos os blogs, fiz um sistema mais simples para fixar o aprendizado, porém o que foi feito funciona muito bem.

<h1> Como Acessar? </h1>
Utilizei a <a href="https://dashboard.render.com" target="_blank"> Render </a> para hospedar o projeto, onde pode se facilmente acessada pelo link: https://linq-4cqz.onrender.com

<h2> Observações </h2>
Por conta da hospedagem gratuita e outros fatores, talvez o tempo de importação do link demore mais que o esperado. Recomendo baixar o projeto e rodar localmente.

O projeto pode ser facilmente executado localmente apenas dando os seguintes comandos:

<ol>
<li>npm install</li>
<li>node index.js</li>
</ol>

