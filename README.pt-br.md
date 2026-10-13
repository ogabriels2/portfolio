[Read in English](README.md)

# Gabriel Moreira — portfólio

Código-fonte de [ogabriels.com](https://ogabriels.com/), meu portfólio pessoal e profissional. Reúne projetos de software, infraestrutura, design e audiovisual, com contexto e descrição da minha contribuição em cada trabalho.

## Comece pelos projetos

- [Miguel Downloader](https://ogabriels.com/miguel-downloader): aplicativo Windows em C#/.NET e WPF, com código, testes e documentação públicos.
- [Força Aliada](https://ogabriels.com/forca-aliada): Manager, Community e operação de servidores; contexto do produto, interfaces reais e minha atuação como fundador.
- [HyroChat](https://ogabriels.com/hyrochat) e [Busca Preço](https://ogabriels.com/busca-preco): projetos coletivos da UNIVESP, com as apresentações e minha participação identificada.
- [Sobre mim](https://ogabriels.com/sobre): formação, credenciais e trajetória profissional.

## Implementação e minha participação

O site usa HTML, CSS e JavaScript, com páginas em português e inglês. Inclui navegação responsiva, estilos e interações próprios para cada projeto, galerias audiovisuais, metadados, dados estruturados e sitemap. A publicação em produção usa Cloudflare Pages.

Conduzo a organização do conteúdo e a direção visual e reviso as interfaces e interações. A implementação recebe apoio de IA, incluindo Codex e Claude Code, com revisão humana e validação do resultado publicado.

O [registro de revisão](design-qa.md) documenta verificações visuais, responsividade, links e interações, incluindo o escopo de cada revisão.

## Mapa do repositório

```text
assets/css/       estilos compartilhados e apresentação dos projetos
assets/js/        navegação, interações e players de mídia
assets/img/       capas, capturas reais e trabalhos visuais
assets/docs/      currículo e credenciais
en/              páginas em inglês
*.html           páginas em português
sitemap.xml      endereços das páginas publicadas
design-qa.md     registro de revisão e verificação
```

## Visualizar localmente

Não há instalação de pacotes ou compilação. Sirva a pasta com um servidor HTTP estático. Por exemplo, com Python instalado:

```bash
git clone https://github.com/ogabriels2/portfolio.git
cd portfolio
python -m http.server 4173
```

Abra `http://localhost:4173/`. Nas páginas internas, use localmente o nome do arquivo com `.html`; as URLs sem extensão em produção dependem da hospedagem.

## Contato

[Site](https://ogabriels.com/) · [LinkedIn](https://www.linkedin.com/in/ogabriels/) · [E-mail](mailto:contato@ogabriels.com)

## Licença

O código-fonte está licenciado sob a **MIT License**.
Os **conteúdos autorais**, incluindo textos, imagens, vídeos e identidade visual, **não devem ser reutilizados** sem autorização prévia.
