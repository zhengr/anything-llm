const HTML = ({ scriptLoc }) => `<!doctype html>
<html lang="en">
<body>
    <script 
      data-embed-id="example-uuid" 
      data-base-api-url='/api/embed' 
      data-iframe='enabled'
      src="${scriptLoc}">
    </script>
  </body>
</html>`


function renderIFrameResponse(request, response) {
  const embed = response.locals.embedConfig;
  const settings = {
    scriptLoc:
      process.env.NODE_ENV === 'production' ?
        `/embed/anythingllm-chat-widget.min.js` :
        'http://localhost:3080/dist/anythingllm-chat-widget.js', // Running yarn dev in embed folder
    embedId: embed.id,
  }
  response.type('text/html');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
  response.send(HTML(settings)).end();
}

module.exports = {
  renderIFrameResponse
}