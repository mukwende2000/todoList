import { useEffect, useRef, useState} from 'react'
import { useImmer } from 'use-immer'
import { nanoid } from 'nanoid'
import moon from './assets/images/icon-moon.svg'
import sun from './assets/images/icon-sun.svg'
import Todo from './Todo'


function App() {
  const [todos, setTodos] = useImmer([])
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [value, setValue] = useState("")
  const [filter, setFilter] = useState('all')

  const inputRef = useRef()

  function handleAddTodo() {
    if(!value) return
    setTodos(draft => {
      draft.unshift({id: nanoid(), title: value, complete: false})
    })
    inputRef.current.value = ""
  }

  function handleDelete(id) {
    setTodos(draft => draft.filter(todo => todo.id !== id))
  }
  
  function clearCompletedTodos() {
    setTodos(draft => draft.filter(todo => !todo.complete))
  }

  function handleChange(id) {
    setTodos(draft => {
      return draft.map(todo => {
        if(todo.id === id) {
          return {...todo, complete: !todo.complete}
        } else {
          return todo
        }  
      })
    })
  }

 let beingDragged
 function handleDragStart(id) {
    beingDragged = id
  }

  function handleDrop(id) {
    const dropZoneIndex = todos.findIndex(todo => todo.id === id)
    const beingDraggedIndex = todos.findIndex(todo => todo.id === beingDragged)
  
    const nextTodos = [...todos];
    [nextTodos[dropZoneIndex], nextTodos[beingDraggedIndex]] = [nextTodos[beingDraggedIndex], nextTodos[dropZoneIndex]]
  
    setTodos(nextTodos)
  }

  function todosLeft() {
    let leftTodos = todos.reduce((acc, todo) => {
      return !todo.complete ? acc + 1 : acc
    }, 0)
    return leftTodos
  }
  useEffect(() => {
    function handleKeyDown(e) {
      if(e.key === 'Enter') {
        handleAddTodo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
   
    return () => {
    window.removeEventListener('keydown', handleKeyDown)
    }
  },[todos, []])
 
  return (
    <div className={`${isDarkTheme ? 'bg-black' : 'bg-white'} h-screen flex flex-col items-center`}>
      <div className={`w-full h-80 ${isDarkTheme ? 'bg-black bg-desktop-dark' : 'bg-white bg-desktop-light'} bg-no-repeat bg-cover`}></div>
      <div className='max-w-3xl w-11/12 m-auto pt-16 fixed'>
          <header className='flex justify-between items-center mb-5 mt-5 px-2'>
            <h1 className="uppercase text-white text-3xl font-bold tracking-widest">todo</h1>
            <img src={isDarkTheme ? moon : sun} alt="" onClick={() => setIsDarkTheme(!isDarkTheme)} className='cursor-pointer' />
          </header>    
          <input ref={inputRef} type="text" onChange={(e) => setValue(e.target.value)} className={`${isDarkTheme ? 'bg-todo text-lightGray' : 'bg-lightGray text-todo'} rounded w-full pl-12 mb-1 h-12 focus:outline-none`} placeholder='Create task' />
          <main>
            <ul>
                {todos.map((todo) => {
                  if(filter === 'active' && !todo.complete) {
                    return <Todo
                    onChange={() => handleChange(todo.id)} 
                    complete={todo.complete}
                    onDeleteTodo={() => handleDelete(todo.id)} 
                    key={todo.id} title={todo.title}
                    isDarkTheme={isDarkTheme}
                    id={todo.id}
                    onDragstart={handleDragStart}
                    onDrop={handleDrop}
                    />
                  } else if(filter === 'completed' && todo.complete) {
                    return <Todo
                  onChange={() => handleChange(todo.id)} 
                  complete={todo.complete}
                  onDeleteTodo={() => handleDelete(todo.id)} 
                  key={todo.id} title={todo.title}
                  isDarkTheme={isDarkTheme}
                  id={todo.id} 
                  onDragstart={handleDragStart}
                  onDrop={handleDrop}
                  />
                  } else if(filter === 'all') {
                    return <Todo
                    onChange={() => handleChange(todo.id)} 
                    complete={todo.complete}
                    onDeleteTodo={() => handleDelete(todo.id)} 
                    key={todo.id} title={todo.title}
                    isDarkTheme={isDarkTheme}
                    id={todo.id} 
                    onDragstart={handleDragStart}
                    onDrop={handleDrop}
                    />
                  }
                })}
              <li className={`${isDarkTheme ? 'bg-todo text-darkGrayBlue' : 'bg-lightGray text-todo'} flex justify-between border-b border-cyan-900 p-4 font-bold`}>
                <p className='text-sm'>{ todosLeft() } items left</p>
                <div className='text-sm flex gap-4' >
                  <button className={`${filter === 'all' ? 'text-cyan-500' : 'text-inherit'}`} onClick={() => setFilter('all')}>All</button>
                  <button className={`${filter === 'active' ? 'text-cyan-500' : 'text-inherit'}`} onClick={() => setFilter('active')}>Active</button>
                  <button className={`${filter === 'completed' ? 'text-cyan-500' : 'text-inherit'}`} onClick={() => setFilter('completed')}>Completed</button>
                </div>
                <button className='text-sm' onClick={clearCompletedTodos}>Clear Completed</button>
              </li>
            </ul>
          </main>
            <p className='text-cyan-500 text-center'>
              Input a task and hit Enter to add <br/>
              Drag and Drop tasks to reorder
            </p>
      </div>
    </div>
  )
}

export default App
