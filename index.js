const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let tasks = [
  { id: 1, title: '30 mins jog', priority: 'medium', timeEstimate: 30, completed: false },
  { id: 2, title: 'Study for 2 hours', priority: 'high', timeEstimate: 120, completed: false },
  { id: 3, title: '5 mins meditation', priority: 'low', timeEstimate: 5, completed: false },
  { id: 4, title: 'Eat healthy', priority: 'medium', timeEstimate: 30, completed: false },
  { id: 5, title: 'Revision check', priority: 'high', timeEstimate: 60, completed: false },
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0; // Calculate progress

  const quote = "Code like it's your last day on earth!";
  
  res.render('index', {
    tasks: tasks,
    progress: isNaN(progress) ? 0 : progress, // Ensure progress is a valid number
    quote: quote
  });
});

app.post('/addtask', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.newtask,
    priority: req.body.priority,
    timeEstimate: parseInt(req.body.timeEstimate, 10),
    completed: false
  };
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/removetask', (req, res) => {
  const completedTaskIds = req.body.check;
  if (Array.isArray(completedTaskIds)) {
    completedTaskIds.forEach(id => {
      tasks = tasks.filter(task => task.id != id);
    });
  } else if (completedTaskIds) {
    tasks = tasks.filter(task => task.id != completedTaskIds);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`To-Do List app listening on port ${port}`);
});
