const express = require('express');
const mongoose = require('mongoose');
//const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const path = require('path');
const e = require('express');
const app = express();
const PORT = 3200;

//Mongoose connection
const uri = "mongodb+srv://kyurikim017:Y7CaQMnN2zEgOsjw@forest.dgnmbsm.mongodb.net/?retryWrites=true&w=majority&appName=forest";

//cors setup
app.use(cors({
    origin: function (origin, callback) {
      // When no origin is provided (like for mobile apps or curl), allow it:
      if (!origin) return callback(null, true);
      const allowedOrigins = ['http://localhost:4200', 'http://127.0.0.1:4200'];
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type']
  }));

app.use(express.json());
app.use(express.static(path.join(__dirname , 'pages')));





mongoose.connect(uri)

.then(() => console.log("connected"))
.catch(err => console.error(err));

//schemas

const TaskSchema = new mongoose.Schema({
    email: String,
    task: String,
    date: Date,
    time: Number,
    priority: String,
    subtasks: [{
      title: {type: String, required: true},
      completed: {type: Boolean, default: false}
    }],
    completed: Boolean
});


const HabitSchema = new mongoose.Schema({
    email: String,
    habit: String,
    repeat: Boolean,
    time: Date,
    order: Number,
    completed: Boolean,
    streak: Number,
});

const RewardSchema = new mongoose.Schema({
    email: String,
    task: String,
    date: Date,
    priority: Number,
    completed: Boolean
});

const TreeSchema = new mongoose.Schema({
    email: String,
    treeType: String,
    color: Number,
    burnt: Boolean, //if life is below a certaib threshold, we can turn burnt to true
});

const UserSchema = new mongoose.Schema({
    email: String,
    streak: Number,
    completedTasks: Number,
    priority: Number,
    completed: Boolean,
    trees: Number,
    burned: Number,
});

const DaySchema = new mongoose.Schema({
    email: String,
    day: Date,
    numOfTasks: Number,
    quote: String,
    panasIndex: Number
});



const tasks = mongoose.model('tasks', TaskSchema);
const habits = mongoose.model('habits', HabitSchema);
const rewards = mongoose.model('rewards', RewardSchema);
const trees = mongoose.model('trees', TreeSchema);
const users = mongoose.model('users', UserSchema);
const days = mongoose.model('days', DaySchema);

module.exports = {users, tasks, habits, rewards, trees, days};

//clear database
/*
async function clearDatabase() {
await habits.deleteMany({});
await tasks.deleteMany({});
}


clearDatabase();
*/



app.listen(PORT, () => {
    console.log('listening!', PORT); 
});

//GET: handling requests for the front-end
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    
});

app.get('/days', async (req, res) => {
    const result = await days.find();
    res.send(result);
});



//POST: handling creation of schemas for db users

app.post('/user-id', async (req,res) => {
    const {email}  = req.body;
    
    try {
        const user = await users.findOne({ email });
        if (user) {
            res.status(200).json({ userId: user._id }); //finds the id of the document that stores that user's data
        } else {
            //await newUser.save();
            //res.status(201).send(user);
            res.status(200).json({ message: 'User not found' });
        }
    } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
}

});

app.post('/user-id-tasks', async (req,res) => {
  const {email}  = req.body;
  const {order} = req.body;
  
  try {
      const task_user = await habits.findOne({ email , order});
      if (task_user) {
          res.status(200).json({ habitId: task_user._id }); //finds the id of the document that stores that user's data
      } else {
          //await newUser.save();
          //res.status(201).send(user);
          res.status(200).json({ message: 'User not found' });
      }
  } catch (error) {
  console.error('Error fetching user:', error);
  res.status(500).json({ message: 'Internal server error' });
}

});


app.post('/get-task-by-priority', async (req, res) => {
    const {email, priority, date} = req.body;
    const start = new Date(date); // already midnight from frontend
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    console.log("recieved the follwing", email, priority, date, start, end);
    try {
        const tasksByPriority = await tasks.findOne({ email: email, priority: priority, date: { $gte: start, $lte: end } });
        if (tasksByPriority) {
            res.status(200).json({taskId: tasksByPriority._id});
        } else {
            res.status(404).json({ message: 'No tasks found for this user' });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/subtask-array', async (req, res) => {
    const {email, taskId} = req.body;
    console.log("recieved the follwing", email, taskId)
    try {
        const subtaskArray = await tasks.findOne({ email: email, _id: taskId });
        if (subtaskArray) {
            res.status(200).json({task: subtaskArray.task, priority: subtaskArray.priority, subtaskArray: subtaskArray.subtasks});
            console.log("subtask array", subtaskArray.subtasks);
        } else {
            res.status(404).json({ message: 'No tasks found for this user' });
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/tasks', async (req, res) => {
    try {
      const task = new tasks(req.body);   // object of tasks schema from the request sent; a task may be written from user interface and saved to the db
      await task.save();                 // Save it to MongoDB
      res.status(201).send(task);        // Respond with the saved user
    } catch (err) {
      res.status(400).send(err);         // If there's an error (e.g., missing field), return error
    }
  });
  
app.post('/habits', async (req, res) => {
  try {
    const habit = new habits(req.body);   // object of tasks schema from the request sent; a task may be written from user interface and saved to the db
    await habit.save();                 // Save it to MongoDB
    res.status(201).send(habit);        // Respond with the saved user
  } catch (err) {
    res.status(400).send(err);         // If there's an error (e.g., missing field), return error
  }
});

app.post('/trees', async (req, res) => {
  try {
    const tree = new trees(req.body);   // object of tasks schema from the request sent; a task may be written from user interface and saved to the db
    await tree.save();                 // Save it to MongoDB
    res.status(201).send(tree);        // Respond with the saved user
  } catch (err) {
    res.status(400).send(err);         // If there's an error (e.g., missing field), return error
  }
});
  
app.post('/rewards', async (req, res) => {
      try {
      const reward = new rewards(req.body);   // object of tasks schema from the request sent; a task may be written from user interface and saved to the db
      await reward.save();                 // Save it to MongoDB
      res.status(201).send(reward);        // Respond with the saved user
      } catch (err) {
      res.status(400).send(err);         // If there's an error (e.g., missing field), return error
      }
  });

app.post('/users', async (req, res) => {
    try {
      const user = new users(req.body);   // object of tasks schema from the request sent; a task may be written from user interface and saved to the db
      await user.save();                 // Save it to MongoDB
      res.status(201).send(user);        // Respond with the saved user
    } catch (err) {
      res.status(400).send(err);         // If there's an error (e.g., missing field), return error
    }
  });

  app.post('/days', async (req, res) => {
    const {email, day, quote} = req.body;
    console.log("recieved the follwing", email, day, quote)

    try {
    const existingDay = await days.findOne({ email, day });
    if (existingDay) {
      console.log("Day already exists for this user");
      res.status(201).send({exists: true, message: "Day already exists for this user"});
    } else {
      console.log("Day does not exist for this user");
      // Create a new day entry
      const newDay = new days({ email: email, day: day, quote: quote });
      await newDay.save();     
      res.status(201).send({exists: false, message: "Day does not exist for this user", newDay});
    } }catch (err) {
      console.error("Error in /days:", err);
      return res.status(500).json({ error: "Server error", details: err.message });
    }
    
  }
    );

  


      

//PATCH

app.patch('/users/:id/add-streak', async (req, res) => {
    const userId = req.params.id; //defines the userId as the actual id used in the doc
    const email = req.body.email;
    console.log("recieved the follwing", userId)
    try {
      const updatedUser = await users.findByIdAndUpdate(
        userId,
        { $set: { email: email } ,
         $inc: { streak: 1 } }, // Increment the streak by 1
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update user', details: err });
    }
  });

  app.patch('/habits/:id/complete' , async (req, res) => {
    const habitsId = req.params.id; //defines the userId as the actual id used in the doc
    const email = req.body.email;
    console.log("recieved the follwing", habitsId, email);

    try{
      const updatedHabit = await habits.findByIdAndUpdate(
        habitsId,{
          $set: { completed: true } ,
          $inc: { streak: 1 } // Increment the streak by 1      
      },  { new: true, runValidators: true }  
      );
      res.status(201).send(updatedHabit);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update user', details: err });
    }

  });

  app.patch('/tasks/:id/add-subtask', async (req,res) => {
    const taskId = req.params.id;
    const subtask = req.body.subtask;
    const email = req.body.email;
    console.log("recieved the follwing", taskId, subtask, email);

    try {
      if (!subtask || typeof subtask !== 'string') {
        return res.status(400).json({ error: 'Invalid subtask' });
      }
      const updatedTask = await tasks.findByIdAndUpdate(
        taskId,
        { $push:{
          subtasks: {
            title: subtask,
            completed: false
          }
        } } , // Add the new subtask to the array
        { new: true, runValidators: true }
      );
      res.status(201).send(updatedTask);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update task', details: err });
    }
  });

  app.patch('/users/:id/burn-tree', async (req, res) => {
    const userId = req.params.id; //defines the userId as the actual id used in the doc
    const email = req.body.email;
    const burntDegree = req.body.treeBurn;
    
    console.log("recieved the follwing", userId)
    try {
      const updatedUser = await users.findByIdAndUpdate(
        userId,
        {
          $inc: { burned: burntDegree }, // Increment the burned count by 1 and decrement the trees count by 1 0.1 burn rate. 0.2 burn rate and so on
        }, // Increment the streak by 1
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update user', details: err });
    }
  });

  /*
  app.patch('/days/:id/add-quote', async (req, res) => {
    const userId = req.params.id; //defines the userId as the actual id used in the doc
    const quote = req.body.quote; // Get the quote from the request body
    const email = req.body.email;
    console.log("recieved the follwing", userId)
    try {
      const updatedUser = await days.findByIdAndUpdate(
        userId,
        { $set: {email: email, quote:quote} },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update user', details: err });
    }
  }); 
  */