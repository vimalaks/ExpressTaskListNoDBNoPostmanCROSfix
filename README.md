Copy of ExpressTaskListNoDBNoPostman but with FIX for CROS - cross origin fix
Explaination : we develop the code for express node in http://localhost:1500 and host the server in the render.com which inturn gives us the url 
render URL will be something like https://expresstasklistnodbnopostmancrosfix.onrender.com now  there is a mismatch in the origin because 
index.html uses "http://localhost:1500" thats called by render URL https://expresstasklistnodbnopostmancrosfix.onrender.com from browser
Hence CROS - cross origin ERROR occurs.
*************************************************************************************************************************************************
ERROR details:
Failed to load resource: the server responded with a status of 404 ()
expresstasklistnodbnopostmancrosfix.onrender.com/:1 Access to fetch at 'http://localhost:1000/tasks' from origin 'https://expresstasklistnodbnopostmancrosfix.onrender.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
localhost:1000/tasks:1          Failed to load resource: net::ERR_FAILED
(index):23                  Uncaught (in promise) TypeError: Failed to fetch
    at show_GET ((index):23:36)
    at (index):55:9
expresstasklistnodbnopostmancrosfix.onrender.com/:1 Access to fetch at 'http://localhost:1000/task' from origin 'https://expresstasklistnodbnopostmancrosfix.onrender.com' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
(index):66          POST http://localhost:1000/task net::ERR_FAILED
add_POST @ (index):66
onclick @ (index):9
(index):66                  Uncaught (in promise) TypeError: Failed to fetch
    at add_POST ((index):66:36)
    at HTMLButtonElement.onclick ((index):9:40)
*************************************************************************************************************************************************
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
