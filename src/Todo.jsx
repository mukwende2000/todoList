import del from './assets/images/icon-cross.svg'

function Todo({ title, onDeleteTodo, complete, onChange, isDarkTheme, id, onDragstart, onDrop }) {
  return (
    <li className={`${isDarkTheme ? 'bg-todo text-lightGray' : 'bg-lightGray text-todo'} pl-5 relative group flex justify-between border-b border-cyan-900 h-10`} draggable="true" onDragOver={(e) => e.preventDefault()} onDragStart={() => onDragstart(id)} onDrop={() => onDrop(id)}>
        <div  className={` cursor-pointer w-full h-full flex items-center gap-5`} >
          <input className='absolute opacity-0 peer' type="checkbox" id={id} checked={complete} onChange={onChange} />
          <label className={`cursor-pointer flex items-center ml-8 peer-checked:text-gray-500 peer-checked:line-through before:absolute before:flex before:items-center before:justify-center before:text-3xl before:text-cyan-900 before:left-4 before:w-6 before:h-6 before:outline peer-checked:before:bg-gradient before:rounded-full`} htmlFor={ id }>{ title }</label>
        </div>
      <img className='absolute right-1 top-2 opacity-0 group-hover:opacity-100 cursor-no-drop' src={del} alt="cross icon used as a delete button" onClick={onDeleteTodo} />
    </li>
  )
}

export default Todo
