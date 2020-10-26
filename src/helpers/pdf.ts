export default class PDF {
  constructor(public css = " ", public html = " ") {}

  setCSS() {
    // this.css = `<link rel="stylesheet" href="${path}" />`;
    this.css += `
    <style>
    table {
      border:1px solid black;
    }
    <style>`;
  }

  build(str: string): void {
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
