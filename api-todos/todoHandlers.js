const Todo = require('./todoLib');

const getAllTodos = (req, res) => {
    const todo = Todo.getAll();
    res.json(todo);
};

const createTodo = (req, res) => {
    const { task, completed, dueDate } = req.body;

    const newTask = Todo.addOne(task, completed, dueDate);
    
    if (newTask) {
        res.json(newTask);
    } else {
        res
        .status(500)
        .json({ message: 'Failed to set a goal'});
    }
};

const getTodoById = (req, res) => {
    const taskId = req.params.todoId;
    const task = Todo.findById(taskId);
    if (task) {
        res.json(task);
    } else {
        res
        .status(404)
        .json({ message: 'Task not found'});
    }
};

const updateTodo = (req, res) => {
    const taskId = req.params.todoId;

    const {task, completed, dueDate} = req.body;

    const updatedTask = Todo.updateOneById(taskId, {task, completed, dueDate });

    if(updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ msg: 'Task not found'});
    }
};

const accodo = (req, res) => {
    const taskId = req.params.todoId

    const completed =  true
    const updatedTask = Todo.updateOneById(taskId, {completed});

    if(updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).json({ msg: 'Task not found'});
    }    
}

const deleteTodo = (req, res) => {
    const taskId = req.params.todoId;

    const isDeleted = Todo.deleteOneById(taskId);

    if (isDeleted) {
        res.json({ msg: `Task #${taskId} is deleted`});
    } else {
        res.status(404).json({ msg: `Task #${taskId} - not found`});
    }
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    accodo
};