
const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}

let index = "";
const appendTodos = (text) => {
    const newId = id++;
    const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text })
    setTodos(newTodos);
    console.log(newTodos);

    paintTodos();
    
}


const deleteTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
    setTodos(newTodos);
    paintTodos()
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo,  isCompleted: !todo.isCompleted} : todo )
    setTodos(newTodos);
    paintTodos();
}

const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    setTodos(newTodos);
    paintTodos();
}

const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keydown', (e)=>{
        if(e.key === 13) {
            updateTodo(e.target.value, todoId);
            document.body.removeEventListener('click', onClickBody );
        }
    })

    const onClickBody = (e) => {
        if(e.target !== inputElem)  {
            todoItemElem.removeChild(inputElem);
            document.body.removeEventListener('click', onClickBody );
        }
    }
    
    document.body.addEventListener('click', onClickBody)
    todoItemElem.appendChild(inputElem);
}

const paintTodos = () => {
    todoListElem.innerHTML = ""; //todoListElem 요소 안의 HTML 초기화
   const allTodos = getAllTodos() // todos 배열 가져오기

    allTodos.forEach(todo => { 
        const todoItemElem = document.createElement('li');
        todoItemElem.classList.add('todo-item');

        todoItemElem.setAttribute('data-id', todo.id );

        const checkboxElem = document.createElement('div');
        checkboxElem.classList.add('checkbox');
        checkboxElem.addEventListener('click', () => completeTodo(todo.id))
      
        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id))
        todoElem.innerText = todo.content;
    
        const delBtnElem = document.createElement('button');
        delBtnElem.classList.add('delBtn');
        delBtnElem.addEventListener('click', () =>  deleteTodo(todo.id))
        delBtnElem.innerHTML = 'X';

        if(todo.isCompleted) {
            todoItemElem.classList.add('checked');
            checkboxElem.innerText = '✔️';
        }

        todoItemElem.appendChild(checkboxElem);
        todoItemElem.appendChild(todoElem);
        todoItemElem.appendChild(delBtnElem);
        todoListElem.appendChild(todoItemElem);
    })
}

//all active complete 나누기
//td를 누르면 class active배열length를 let count에 임티랑 넣기 
//let count를 달력에 넣기 

let textDt = "";

$("td").click(function() {
    console.log($(this).children('.date').text());
    console.log(this);
    textDt = this;
})


$(".todo-input-box").keydown(function(e) { // 누르는 순간
    if (e.keyCode === 13) {
        appendTodos(e.target.value); 
        todoInputElem.value = '';
        $(textDt).children('.contents').text(index);
        setLeftItems();

    }
})