Copy of ExpressTaskListNoDBNoPostman but with FIX for CROS - cross origin fix
Explaination : we develop the code for express node in http://localhost:1500 and host the server in the render.com which inturn gives us the url 
render URL will be something like https://expresstasklistnodbnopostmancrosfix.onrender.com now  there is a mismatch in the origin because 
index.html uses "http://localhost:1500" thats called by render URL https://expresstasklistnodbnopostmancrosfix.onrender.com from browser
Hence CROS - cross origin ERROR occurs.
FIX for that is by setting the following header in the apps.js @ the middleware code
app.use((req,res,next) =>
{
    res.setHeaders( new Headers(
        {
            'access-control-allow-origin': '*',
            'access-control-allow-headers': '*'
        }
    )
    );//res.setHeaders(
    next();
}
);//app.use(
