const url = require('url');
var request = require('request');
var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();



gulp.task('watch', function() {



  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    },
    middleware: [
    {
        route: "/",
        handle: function (req, res, next) {
            // handle any requests at /
            console.log("middleware handler is actief");
            //console.log(req.get("/"));
            //next();
            console.log('Request URL:', req.originalUrl);
            //console.log('Params:', req.get.);
            let request_url = req.url;
            //let data = JSON.stringify(request_url);
            //console.log(data);
            if (req.method === 'POST') {
                          // Handle post info...
                          console.log("inside post........!");
                          let body = '';
                      req.on('data', chunk => {
                          body += chunk.toString(); // convert Buffer to string
                      });
                      req.on('end', () => {
                          console.log(body);
                          res.writeHead(301,{Location: 'http://192.168.1.170:3002'});
                          res.end('ok');
                      });
                }






            next();
         }
    }
]
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  })

});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
