import React, { useState, useEffect } from "react";
import "./App.css";
import Editor from "./Editor";
import uselocalStorage from "../hooks/uselocalStorage";

function App() {
  const [html, setHtml] = uselocalStorage("html", "");
  const [css, setCss] = uselocalStorage("css", "");
  const [js, setJs] = uselocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    // Whenver the html js css changes give a timeout some milliseconds to prevent the browser to slowdown
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    
    </html>`);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="app">
      <>
        {/* Top Pane */}
        <div className="pane top-pane">
          {/* Three Custom Editors */}
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language="javascript"
            displayName="Javascript"
            value={js}
            onChange={setJs}
          />
        </div>
        {/* Bootom Pane */}
        <div className="pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts" //Helps with security
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </>
    </div>
  );
}

export default App;
