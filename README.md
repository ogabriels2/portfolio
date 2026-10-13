[Leia em português](README.pt-br.md)

# Gabriel Moreira — portfolio

Source code for [ogabriels.com](https://ogabriels.com/), my personal and professional portfolio. It brings together software projects, infrastructure, design and audiovisual work, with context and an account of my contribution to each project.

## Start with the projects

- [Miguel Downloader](https://ogabriels.com/miguel-downloader): a Windows application in C#/.NET and WPF, with public code, tests and documentation.
- [Força Aliada](https://ogabriels.com/forca-aliada): Manager, Community and server operations; product context, real interfaces and my role as founder.
- [HyroChat](https://ogabriels.com/hyrochat) and [Busca Preço](https://ogabriels.com/busca-preco): UNIVESP team projects, with our presentations and my contribution identified.
- [About me](https://ogabriels.com/sobre): education, credentials and professional background.

## Implementation and my role

The site uses HTML, CSS and JavaScript, with Portuguese and English pages. It includes responsive navigation, project-specific styles and interactions, audiovisual galleries, metadata, structured data and a sitemap. Production hosting uses Cloudflare Pages.

I lead the content organization and visual direction, and review interfaces and interactions. Implementation is assisted by AI, including Codex and Claude Code, with human review and validation of the published result.

The [review log](design-qa.md) records visual checks, responsiveness, links and interactions, including the scope of each review.

## Repository map

```text
assets/css/       shared styles and project-specific presentation
assets/js/        navigation, interactions and media players
assets/img/       covers, real screenshots and visual work
assets/docs/      resume and credentials
en/              English pages
*.html           Portuguese pages
sitemap.xml      published page URLs
design-qa.md     review and verification record
```

## View locally

No package installation or compilation is needed. Serve the repository with a static HTTP server. For example, with Python installed:

```bash
git clone https://github.com/ogabriels2/portfolio.git
cd portfolio
python -m http.server 4173
```

Open `http://localhost:4173/`. Locally, use the `.html` filename for inner pages; extensionless production URLs depend on the hosting platform.

## Contact

[Website](https://ogabriels.com/) · [LinkedIn](https://www.linkedin.com/in/ogabriels/) · [Email](mailto:contato@ogabriels.com)

## License

The source code is licensed under the **MIT License**.
The **proprietary content**, including texts, images, videos, and visual identity, **must not be reused** without prior authorization.
