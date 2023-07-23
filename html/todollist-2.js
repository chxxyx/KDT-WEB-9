let nowMonth = new Date();
let today = new Date();

// 달력 생성 메서드.
function buildCalendar() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[nowMonth.getMonth()];
    console.log(month);

    // 이번 달의 1일
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    // console.log(`firstDate : ${firstDate}`);
    // console.log(nowMonth.getMonth());
    // -> 오늘 날짜 기준 년도, 월의 1일 !

    // 이번 달의 마지막일 (0)
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 0);
    // console.log(`LastDate : ${lastDate}`);

    let tbody = document.querySelector("tbody");
    document.getElementById("cal-year").innerText = nowMonth.getFullYear();
    // document.getElementById("cal-month").innerText = month;
    document.getElementById("cal-month").textContent = month;
    console.log(month)
    
    // nowMonth.getMonth()+1;
    // ex) 다음 달로 넘어갔을 경우, 이전 출력 결과가 남아있을 수 있으니 초기화 한다.
    while (tbody.rows.length > 0) {  
        tbody.deleteRow(tbody.rows.length - 1);
    }

    // 첫번 째 행 추가
    let nowRow = tbody.insertRow();

    // 1일 시작 전까지 빈 열 추가
    for(let j = 0; j < firstDate.getDay(); j++) {
        let nowColumn = nowRow.insertCell();
    }

    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복 
    // Ex) .setDate(13) : 객체를 13일로 변경 
    // nowDay.setDate(nowDay.getDate()+1) : ex) nowDay가 1일일 경우 1일의 다음날인 2일로 
    for(let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate()+1)) {
        let nowColumn = nowRow.insertCell(); // 새로운 열 추가
        nowColumn.innerHTML = nowDay.getDate();
        nowColumn.innerHTML = "<div class='date'>"+nowDay.getDate()+"</div><div class='contents'><div>";

       // 일요일 : 빨간색, 토요일 : 파란색
       if(nowDay.getDay() == 0){
        nowColumn.style.color = "tomato";
       } else if(nowDay.getDay() == 6) {
        nowColumn.style.color = "royalblue";
        nowRow = tbody.insertRow(); // 토요일일 경우 다음으로 넘어가야 하므로 다시 열 추가
       }
    
    }

}


// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    buildCalendar();    // 달력 다시 생성
}
// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    buildCalendar();    // 달력 다시 생성
    console.log(nowMonth);
}

buildCalendar();

const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn');
const leftItemsElem = document.querySelector('.left_items'); //
const showAllBtnElem = document.querySelector('.show-all-btn');
const showActiveBtnElem = document.querySelector('.show-active-btn');
const showCompletedBtnElem = document.querySelector('.show-completed-btn');
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn');


let id = 0;
const setId = (newId) => {id = newId};

let isAllCompleted = false; // 전체 todos 체크 여부
const setIsAllCompleted = (bool) => { isAllCompleted = bool};

let currentShowType = 'all'; // all  | active | complete
const setCurrentShowType = (newShowType) => currentShowType = newShowType

let todos = [];
// const setTodos = (newTodos) => {
//     todos.push(newTodos);
// }

const getAllTodos = () => {
    return todos;
}
const getCompletedTodos = () => {
    return todos.filter(todo => todo.isCompleted === true );
}
const getActiveTodos = () => {
    return todos.filter(todo => todo.isCompleted === false);
}

const setLeftItems = () => {
    const leftTodos = getActiveTodos()
    leftItemsElem.innerHTML = `${leftTodos.length} items left` //남은 아이템 갯수를 가져옴   
    console.log (leftItemsElem.innerHTML );
}
//



const completeAll = () => {
    completeAllBtnElem.classList.add('checked');
    const newTodos = getAllTodos().map(todo => ({...todo, isCompleted: true }) )
    // setTodos(newTodos)
}

const incompleteAll = () => {
    completeAllBtnElem.classList.remove('checked');
    const newTodos =  getAllTodos().map(todo => ({...todo, isCompleted: false }) );
    // setTodos(newTodos)
}

// 전체 todos의 check 여부 (isCompleted)
const checkIsAllCompleted = () => {
    if(getAllTodos().length === getCompletedTodos().length ){
        setIsAllCompleted(true);
        completeAllBtnElem.classList.add('checked');
    }else {
        setIsAllCompleted(false);
        completeAllBtnElem.classList.remove('checked');
    }
}

const onClickCompleteAll = () => {
    if(todos.length() == 0) {
        return "test"
    
    }; // todos배열의 길이가 0이면 return;

    if(isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리 
    else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리 
    setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
    paintTodos(); // 새로운 todos를 렌더링
    setLeftItems()
}
let index = "";
const appendTodos = (text) => {
    const newId = id + 1; // 기존에 i++ 로 작성했던 부분을 setId()를 통해 id값을 갱신
    setId(newId)
    const newTodos = getAllTodos().concat({id: newId, isCompleted: false, content: text })
    // const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text }]
    todos.push(newTodos);
    console.log(todos);
    index = todos.indexOf(newTodos);
    console.log(index);
    paintTodos();
    // setTodos(newTodos)
    setLeftItems()
    checkIsAllCompleted();
}

const deleteTodo = (todoId) => {setTodos
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId );
    // setTodos(newTodos);
    setLeftItems()
    paintTodos()
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo,  isCompleted: !todo.isCompleted} : todo )
    // setTodos(newTodos);
    paintTodos();
    setLeftItems()
    checkIsAllCompleted();
}

const updateTodo = (text, todoId) => {
    const currentTodos = getAllTodos();
    const newTodos = currentTodos.map(todo => todo.id === todoId ? ({...todo, content: text}) : todo);
    // setTodos(newTodos);
    paintTodos();
}

const onDbclickTodo = (e, todoId) => {
    const todoElem = e.target;
    const inputText = e.target.innerText;
    const todoItemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('edit-input');
    inputElem.addEventListener('keypress', (e)=>{
        if(e.key === 'Enter') {
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

const clearCompletedTodos = () => {
    const newTodos = getActiveTodos()
    // setTodos(newTodos)
    paintTodos();
}

const paintTodo = (todo) => {
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
        checkboxElem.innerText = '✔';
    }

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(todoElem);
    todoItemElem.appendChild(delBtnElem);

    todoListElem.appendChild(todoItemElem);
}

const paintTodos = () => {
    todoListElem.innerHTML = '';

    switch (currentShowType) {
        case 'all':
            const allTodos = getAllTodos();
            allTodos.forEach(todo => { paintTodo(todo);});
            break;
        case 'active': 
            const activeTodos = getActiveTodos();
            activeTodos.forEach(todo => { paintTodo(todo);});
            break;
        case 'completed': 
            const completedTodos = getCompletedTodos();
            completedTodos.forEach(todo => { paintTodo(todo);});
            break;
        default:
            break;
    }
}

const onClickShowTodosType = (e) => {
    const currentBtnElem = e.target;
    const newShowType = currentBtnElem.dataset.type;

    if ( currentShowType === newShowType ) return;

    const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
    preBtnElem.classList.remove('selected');

    currentBtnElem.classList.add('selected')
    setCurrentShowType(newShowType)
    paintTodos();
}

let textDt = "";

$("td").click(function() {
    console.log($(this).children('.date').text());
    console.log(this);
    textDt = this;
    console.log(textDt);
})

$(".todo-input-box").keydown(function(e) { // 누르는 순간
    if (e.keyCode === 13) {
        appendTodos(e.target.value); 
        todoInputElem.value = '';
        $(textDt).children('.contents').text(index);
    
    }
    completeAllBtnElem.addEventListener('click',  onClickCompleteAll());
    // showAllBtnElem.addEventListener('click', onClickShowTodosType());
    // showActiveBtnElem.addEventListener('click',onClickShowTodosType());
    // showCompletedBtnElem.addEventListener('click',onClickShowTodosType());
    // clearCompletedBtnElem.addEventListener('click', clearCompletedTodos());
    setLeftItems();

    
})

// const init = () => {
//     todoInputElem.addEventListener('keypress', (e) =>{
//         if( e.keyCode === 13 ){
//             appendTodos(e.target.value); todoInputElem.value ='';
//             appendTodos(e.target.value); 
//             todoInputElem.value = '';
//             $(textDt).children('.contents').text(index);
//         }
//     })
//     completeAllBtnElem.addEventListener('click',  onClickCompleteAll());
//     showAllBtnElem.addEventListener('click', onClickShowTodosType());
//     showActiveBtnElem.addEventListener('click',onClickShowTodosType());
//     showCompletedBtnElem.addEventListener('click',onClickShowTodosType());
//     clearCompletedBtnElem.addEventListener('click', clearCompletedTodos());
//     setLeftItems();
// }


// init()