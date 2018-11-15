module.exports =  ({ body='',title}) => {
    return `<!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" href="/image/favicon.png" />
            <title>${title}</title>
            <script type="text/javascript" src="/dist/css.js" charset="utf-8"></script>
            <link href="https://cdn.bootcss.com/antd/3.10.4/antd.min.css" rel="stylesheet">
            <link href="/image/quill.snow.css" rel="stylesheet">
            <link href="https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css" rel="stylesheet">
            <style>
                canvas{
                    position:fixed !important;
                }
            </style>
        </head>

        <body>
          <div id="root">${body}</div>
          <script type="text/javascript" color="0,0,255" opacity='0.7' zIndex="-2" count="99" src="https://cdn.bootcss.com/canvas-nest.js/2.0.3/canvas-nest.js"></script>
        </body>
        <script src="https://cdn.bootcss.com/react/16.5.1/umd/react.production.min.js"></script>
        <script src="https://cdn.bootcss.com/react-dom/16.5.1/umd/react-dom.production.min.js"></script>
        <script src="https://cdn.bootcss.com/react-router-dom/4.3.1/react-router-dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
        <script src="https://cdn.bootcss.com/mobx/5.5.0/mobx.umd.min.js"></script>
        <script type="text/javascript" src="/dist/app.js" charset="utf-8"></script>
      </html>`
};
