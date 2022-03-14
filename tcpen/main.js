import './style.css'

const $ = el => document.querySelector(el)

const $js = $('#js');
const $css = $('#css');
const $html = $('#html');

$js.addEventListener('input', update)
$css.addEventListener('input', update)
$html.addEventListener('input', update)

function update(){
  const html = createHtml();
  $('iframe').setAttribute('srcdoc', html)
}

function createHtml(){
  const html = $html.value;
  const css = $css.value;
  const js = $js.value; 

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <style>
        ${css}
        </style>
    </head>
      <body>
        <script>${js}</script>
        ${html}
      </body>
  </html>
  `
}