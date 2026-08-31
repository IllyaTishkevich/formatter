import Editor from "@monaco-editor/react";
import SUPPORTED from "../../utils/formats";

const Sitemap = () => {
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        '   <url>\n        <loc>https://validformat.online/</loc>\n    </url>';

    SUPPORTED.forEach((valueA) => {
        SUPPORTED.forEach((valueB) => {
           const url = valueA === valueB ? `
    <url>
        <loc>https://validformat.online/${valueA}</loc>
    </url>` : `
    <url>
        <loc>https://validformat.online/${valueA}/${valueB}</loc>
    </url>`;

           sitemap += url;
        })
    })

    sitemap += `
    <url>
        <loc>https://validformat.online/policy</loc>
    </url>`;

    sitemap += '\n' +
        '</urlset>';
    return <div>
        <Editor
            height="500px"
            language={'xml'}
            value={sitemap}

            options={{
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on'
            }}
        />
    </div>
}

export default Sitemap;