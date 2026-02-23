import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// in-memory "dataset"
let tasks = [
    { 
        id : 1,
        title : "Learn REST API's",
        done : false
    },
    {
        id : 2,
        title : "Connect React With API ",
        done : false
    }
];
let nextId = 3;

// read all the tasks
app.get("/" , (req , res) => {
    res.json(tasks);
})

// reading only one task
app.get("/api/tasks/:id" , (req , res) => {
      const id = Number(req.params.id);
      const task = tasks.find((t) => t.id === id);

      if(!task){
        return res.status(404).json({
            message : "Not Found"
        });
      }
      res.json(task)
})

// creating the task
app.post("/api/tasks" , (req , res) => {
   const { title } = req.body;

   if(!title || !title.trim()){
    return res.status(400).json({
        message : "Title is required"
    });
   }
   const newTask = { 
    id : nextId++,
    title : title.trim(),
    done : false
   }

   tasks.unshift(newTask);
   res.status(201).json(newTask);
});

// update the tasks

app.put("/api/tasks/:id" , (res , req) => {
     const id = Number(req.params.id);
     const task = tasks.some((t) => {
        t.id === id
     });
     
     if(!task){
        return res.status(404).json({
            message : "Not Found"
        })
     }

     const { title , done } = req.body;

     if(typeof title === "string"){
        task.title = title.trim();
     }
     if(typeof done === "boolean"){
        task.done = done
     }

     res.json(task)
})

// delete the tasks

app.delete("/api/tasks/:id" , (res , req) => {
   
    const id = Number(req.params.id);
    const exists = tasks.some((t) => {
        t.id === id
    });

    if(!exists){
        return res.status(404).json({
            message : "Not Found"
        })
    }

    tasks = tasks.filter((t) => t.id != id);
    res.status(204).send();
})

const PORT = 8080;
app.listen(PORT , () => {
     console.log(`API running on http://localhost:${PORT}`);
})
