const express = require('express');
const app = express();
//const PORT = 1000;//Error: listen EADDRINUSE: address already in use :::1000
const PORT = 1500;
//const tasks[];//Missing initializer in const declaration
const tasks = [];
app.use(express.static('public'));
app.use(express.json());//IMPORTANT else it says "TypeError: Cannot read property 'taskItem' of undefined"
//setting the headers @Middleware code to resolve CROS error
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
    
app.post('/task',(req,res,next)=>
{
    if(!req.body.taskItem)
    {
        res.status(404).json({message:"Please add task in taskItems"});
        return;//if we dont add return here we get "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    }
    tasks.push(req.body.taskItem);
    /*when body =
    {
        "taskItem":"one",
        "taskItem":"two",
        "taskItem":"three"
    } //No ERROR "taskItem":"three" it is picked
    when body =
    {
        "taskItem":"one",
        "taskItem":"two",
        "taskItems":"three"
    } //No ERROR "taskItem":"two" it is picked
    checks from bottom to top*/
    res.status(200).json({"message":"1 Task added succesfully"});
});
app.delete('/task/:arrayIdx',(req,res,next)=>
{
    const deleteIndex = parseInt(req.params.arrayIdx);
    //tasks.splice(deleteIndex,1);
    tasks.splice(req.params.arrayIdx,1);
    res.status(200).json({"message":"1 Task deleted succesfully"});
});
app.put('/task/:arrayIdx',(req,res,next)=>
{
    if(!req.body.taskItem)
    {
        res.status(404).json({message:"Please add task in taskItems"});
        return;//if we dont add return here we get "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    }
    tasks.splice(req.params.arrayIdx,1,req.body.taskItem);
    res.status(200).json({"message":"1 Task replaced successfully"});
});
app.get('/tasks',(req,res,next)=>
{
    res.status(200).json({"TaskList":tasks});
}
);
app.listen(PORT,()=>
{
    console.log(`Server is up and running,listening at port = ${PORT}`);
});