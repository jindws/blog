module.exports =  ({ body='', script=[],title }) => {
    return `<!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>${title}</title>
            <script type="text/javascript" src="/dist/css.js" charset="utf-8"></script>
        </head>

        <body>
          <div id="root">${body}</div>
        </body>
        <script type="text/javascript" src="/dist/app.js" charset="utf-8"></script>
        <link href="https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css" rel="stylesheet">
      </html>`
};
