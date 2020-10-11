export default class PDF {
  constructor(public css = " ", public html = " ") {}

  setCSS(path: string) {
    // Absolute URL
    this.css = '<link rel="stylesheet" href="' + path + '" />';
  }

  build(str: string) {
    this.html +=
      "<html><head>" + this.css + '</head><body><div id="pageContent">';
    this.html += str;
    this.html += "</div></body></html>";
  }
}
