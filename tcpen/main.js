import './style.css'
import Split from './node_modules/split-grid'

const $ = el => document.querySelector(el)

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

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

function initialize () {
  const { pathname } = window.location;
  const [encodedHtml, encondedCss, encodedJs] = pathname.slice(1).split('%7C')

  const html= window.atob(encodedHtml);
  const css = window.atob(encondedCss);
  const js = window.atob(encodedJs);

  $html.value = html;
  $css.value = css;
  $js.value = js;

  const htmlPreview = createHtml({html, css, js});
  $('iframe').setAttribute('srcdoc', htmlPreview)
}

function update(){
  const html = $html.value;
  const css = $css.value;
  const js = $js.value; 

  const hashedCode = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`
  window.history.replaceState(null, null, `/${hashedCode}`)

  const htmlPreview = createHtml({html, css, js});
  $('iframe').setAttribute('srcdoc', htmlPreview)
}

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