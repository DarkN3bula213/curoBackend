"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PDF {
    constructor(css = " ", html = " ") {
        this.css = css;
        this.html = html;
    }
    setCSS() {
        // this.css = `<link rel="stylesheet" href="${path}" />`;
        this.css += `
    <style>
    table {
      border:1px solid black;
    }
    <style>`;
    }
    build(str) {
        this.html += `<html>
       <head>${this.css} </head>
       <body>
       <div id="pageContent">
       ${str}
       </div>
       </body>
       </html>
       `;
    }
}
exports.default = PDF;
//# sourceMappingURL=pdf.js.map