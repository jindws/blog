module.exports =  ({ body='',title}) => {
    return `<!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" href="./image/favicon.png" />
            <title>${title}</title>
            <script type="text/javascript" src="/dist/css.js" charset="utf-8"></script>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.10.0/antd.min.css" rel="stylesheet">
        </head>

        <body>
          <div id="root">${body}</div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.4.0/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.4.0/umd/react-dom.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/4.2.2/react-router-dom.min.js"></script>
        <script type="text/javascript" src="/dist/app.js" charset="utf-8"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
      </html>`
};
