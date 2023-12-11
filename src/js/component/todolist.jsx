import React, {useState, useEffect} from "react";







const TodoList = () => {
    const [todos, setTodos] = useState ([]);
    const [inputValue, setInputValue] = useState ('');
    const url = "https://playground.4geeks.com/apis/fake/todos/user/Selta";
    
    const fetchTodos = async () => {

        const response = await fetch (url);
        const jsonResponse= await response.json ();
        setTodos(jsonResponse)
    };

    useEffect (() => { //do an async await "post" and after an await fetchtodos
       const postProfileAndFetchTodos = async () => {
            await fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });
         fetchTodos ();
       };
       postProfileAndFetchTodos();
    }, []);

    
    async function updateTodo (updatedList) {
        await fetch (url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedList)
        })
    }
    
    function handleChange(e){
        setInputValue(e.target.value)
      }
      
      
      function handleSubmit(e){
        e.preventDefault()
        const updatedList =[...todos, {label: inputValue, done:false}];
        setTodos(updatedList)
        setInputValue('')
        updateTodo(updatedList)
    }
    

    function handleDelete(index){
        const newTodos = todos.filter ((e, filterIndex)=> {
        return filterIndex !== index 
        })
        setTodos(newTodos)
        updateTodo(newTodos)
      }
      
     

    function handleClear () {
        //async "delete"
        const clearProfileAndSetTodos = async () => {
            await fetch (url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
               
    });
            setTodos ([]);
    };
                 
            clearProfileAndSetTodos ();
    }

    return (
        <div className="container text-center col-3">
            <form onSubmit={handleSubmit} >
                <h3 className="title pb-2" >Your Todo List</h3>
                    <input className="todoList" 
                    type="text" 
                    value={inputValue} 
                    onChange={handleChange} />
                    <button type="button" className="btn btn-dark mx-1" onClick={handleSubmit}>Add Todo </button>
                    <ul> {todos.map((todo, index) => (
                     <li key={todo.label}>{todo.label}
                                <button type="button" className="btn btn-dark" onClick={() =>handleDelete(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                                        <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                                        <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                                    </svg>
                                </button>
                            </li>
        ))}
                    </ul>
                    <div className="tasks" >{todos.length} tasks</div>
                    <button type="button" className="btn btn-dark mx-1" onClick={handleClear}>Clear Todos </button>
            </form>
        </div>
    )
}

export default TodoList;