// Cloudflare Worker: Inject JSON-LD structured data into codemuseum.wiki
// Deploy via Cloudflare Dashboard > Workers & Pages > Create Worker
// Then add a route: codemuseum.wiki/* with this worker

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const response = await fetch(request);

    // Only inject into HTML pages
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "Museum",
      "name": "代码考古博物馆 / Code Archaeology Museum",
      "alternateName": "Code Archaeology Museum",
      "description": "An AI archaeologist guides you through the history of programming languages, from 1940s ENIAC to the 2020s AI revolution. 覆盖FORTRAN、C、Python、Java、JavaScript、Rust等18种编程语言的考古级解读。",
      "url": "https://codemuseum.wiki/",
      "inLanguage": ["zh-CN", "en"],
      "dateCreated": "2026-05-31",
      "dateModified": "2026-06-07",
      "author": {
        "@type": "Person",
        "name": "cheneydc",
        "url": "https://github.com/cheneydc/codingMuseum"
      },
      "about": [
        { "@type": "Thing", "name": "Programming Language History" },
        { "@type": "Thing", "name": "FORTRAN" },
        { "@type": "Thing", "name": "COBOL" },
        { "@type": "Thing", "name": "LISP" },
        { "@type": "Thing", "name": "ALGOL 60" },
        { "@type": "Thing", "name": "BASIC" },
        { "@type": "Thing", "name": "C Language" },
        { "@type": "Thing", "name": "SQL" },
        { "@type": "Thing", "name": "C++" },
        { "@type": "Thing", "name": "Python" },
        { "@type": "Thing", "name": "Java" },
        { "@type": "Thing", "name": "JavaScript" },
        { "@type": "Thing", "name": "C#" },
        { "@type": "Thing", "name": "Go" },
        { "@type": "Thing", "name": "Rust" },
        { "@type": "Thing", "name": "TypeScript" },
        { "@type": "Thing", "name": "AI Code Generation" }
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://codemuseum.wiki/"
      }
    };

    const schemaScript = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

    // Re-stream: read original body, inject schema before </head>
    const originalBody = await response.text();
    const modifiedBody = originalBody.replace(
      "</head>",
      `${schemaScript}\n</head>`
    );

    return new Response(modifiedBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
};
