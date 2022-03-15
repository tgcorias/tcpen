import './style.css'
import Split from './node_modules/split-grid'
import * as monaco from 'monaco-editor';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'


// native query selector.
const $ = el => document.querySelector(el)


window.MonacoEnvironment = {
  getWorker(_, label){
    if  (label === 'html') {
      return new HtmlWorker();
    }
    if (label === 'css') {
      return new CssWorker();
    }
    if (label === 'js'){
      return new JsWorker();
    }
    return null;
  }
}

Split({
    columnGutters: [{
        track: 1,
        element: $('.gutter-col-1'),
    }],
    rowGutters: [{
        track: 1,
        element: $('.gutter-row-1'),
    }]
})

// getting the divs to work with
const $js = $('#js');
const $css = $('#css');
const $html = $('#html');


// creating and config editors
const htmlEditor = monaco.editor.create($html, {
  value: '',
  language: 'html',
  theme: 'vs-dark',
  fontSize: 16,
})
const cssEditor = monaco.editor.create($css, {
  value: '',
  language: 'css',
  theme: 'vs-dark',
  fontSize: 16,
})
const jsEditor = monaco.editor.create($js, {
  value: '',
  language: 'typescript',
  theme: 'vs-dark',
  fontSize: 16,
})


// Event Listeners to update the preview
htmlEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)


// getting the url to decode and load the code
function initialize () {
  const { pathname } = window.location;
  const [encodedHtml, encondedCss, encodedJs] = pathname.slice(1).split('%7C')

  const html= window.atob(encodedHtml);
  const css = window.atob(encondedCss);
  const js = window.atob(encodedJs);

  // $html.value = html;
  $css.value = css;
  $js.value = js;

  const htmlPreview = createHtml({html, css, js});
  $('iframe').setAttribute('srcdoc', htmlPreview)
}


// getting values and updating url
function update(){
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue(); 

  const hashedCode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlPreview = createHtml({html, css, js});
  $('iframe').setAttribute('srcdoc', htmlPreview)
}


// creating the html preview
function createHtml({html, css, js}){
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <style>
        ${css}
        </style>
    </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
  </html>
  `
}

initialize()