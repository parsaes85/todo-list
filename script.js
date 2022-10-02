let switchModeBtn = document.querySelector('.switch-mode-btn')
let addTodoBtn =  document.querySelector('.add-todo')
let addTodoInput = document.querySelector('.add-input')
let todos = document.querySelector('.todos')
let deleteTodoBtn = document.querySelectorAll('.delete-todo')
let allCheckBtn = document.querySelectorAll('.check-todo')
let clearCompletedBtn = document.querySelector('.clear-completed')
let leftItems = document.querySelector('.left-items')
let allCategory = document.querySelector('.all-category')
let activeCategory = document.querySelector('.active-category')
let completedCategory = document.querySelector('.completed-category')

checkedTodos = []

switchModeBtn.addEventListener('click',e=>{
    if(document.body.className == ''){
        document.body.classList.add('light-mode')
        switchModeBtn.src = 'images/icon-moon.png'
    }else{
        document.body.classList.remove('light-mode')
        switchModeBtn.src = 'images/icon-sun.png'
    }
})

addTodoBtn.addEventListener('click',e=>{
    e.preventDefault()
    if(!addTodoInput.value) return

    todoInfo = {
        text : addTodoInput.value,
    } 

    addTodo()

    addTodoInput.value = ''
    document.querySelector('.empty-text').style.display = 'none'

    leftItems.innerText = todos.children.length - 1
})



function addTodo() {
    let todo = document.createElement('div')
    todo.className = 'todo'

    let childDiv = document.createElement('div')

    let deleteImg = document.createElement('img')
    deleteImg.className = 'delete-todo'
    deleteImg.src = 'images/icon-cross.png'

    let checkBtn = document.createElement('button')
    checkBtn.className = 'check-todo'
    let buttonImg = document.createElement('img')
    buttonImg.src = 'images/icon-check.png'
    checkBtn.appendChild(buttonImg)

    let todoText = document.createElement('p')
    todoText.className = 'todo-text'
    todoText.innerText = todoInfo.text

    childDiv.appendChild(checkBtn)
    childDiv.appendChild(todoText)
    todo.appendChild(childDiv)
    todo.appendChild(deleteImg)

    todos.insertAdjacentElement('afterbegin',todo)
    
    
    

    deleteImg.addEventListener('click',e=>{
        if((todos.children.length - 2) == 0){
            document.querySelector('.empty-text').style.display = 'block'
        }

        e.target.parentElement.remove()
   
        checkedTodos = []
        leftItems.innerText = (todos.children.length - 1) - (checkedTodos.length)
    })


    childDiv.addEventListener('click',e=>{
        checkBtn.id = !checkBtn.id ? checkBtn.id = 'check' : checkBtn.id = ''
         
        if(checkBtn.id){
            checkedTodos.push(checkBtn)
        }else{
            checkedTodos.pop()
        }
        leftItems.innerText = (todos.children.length - 1) - (checkedTodos.length)
    })


    clearCompletedBtn.addEventListener('click',e=>{
        if(checkBtn.id){
            checkBtn.parentElement.parentElement.remove()
        }

        if((todos.children.length - 1) == 0){
            document.querySelector('.empty-text').style.display = 'block'
        }

        checkedTodos = []
        leftItems.innerText = (todos.children.length - 1) - (checkedTodos.length)
    })
}

allCategory.addEventListener('click',e=>{
    Array.from(todos.querySelectorAll('button')).forEach(element => {
        if(element){
            element.parentElement.parentElement.style.display = 'flex'
        }
    });
})

activeCategory.addEventListener('click',e=>{
    checkedTodos.forEach(element => {
        if(element){
            element.parentElement.parentElement.style.display = 'none'
        }
    });



    let activeItems = Array.from(todos.querySelectorAll('button')).filter(val => !checkedTodos.includes(val))

    activeItems.forEach(element => {
        if(element){
            element.parentElement.parentElement.style.display = 'flex'
        }
    });
})

completedCategory.addEventListener('click',e=>{
   let activeItems = Array.from(todos.querySelectorAll('button')).filter(val => !checkedTodos.includes(val))

   activeItems.forEach(element => {
        if(element){
            element.parentElement.parentElement.style.display = 'none'
        }
    });



    checkedTodos.forEach(element => {
        if(element){
            element.parentElement.parentElement.style.display = 'flex'
        }
    });
})
