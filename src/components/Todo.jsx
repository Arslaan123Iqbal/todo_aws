import React, { useEffect, useState } from 'react'
import { Amplify, API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { createTodo, deleteTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import {v4 as uuid} from "uuid";
import { useNavigate } from 'react-router-dom';




const Todo = () => {
  const initialState = { name: '', description: '', image: '' }  
  const [formState, setFormState] = useState(initialState)
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()
  


 
  const uploadFile = async () => {
    const result = await Storage.put(uuid(), fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    setFileData('');
    return result.key
  };

  const handleUpdate = (index) =>{

 navigate(`/update/${index}`)
  }


  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const user = await Auth.currentUserInfo()
      const todoData = await API.graphql(graphqlOperation(listTodos, {filter:{user:{eq:user.id}}}))
      const todos = await Promise.all(todoData.data.listTodos.items.map(async i =>({
        id : i.id,
        user: user.id,
        name: i.name,
        description: i.description,
        image : await Storage.get(i.image) 
      })))
      setTodos(todos)
      console.log(todos,"todos");
      
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const user = await Auth.currentUserInfo()
      const key = await uploadFile();
      const todo = { ...formState }
      todo.image= key;
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input:{user: user.id, ...todo}}))

    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function deleteTodos(id){
    try {
        await API.graphql(
          graphqlOperation(deleteTodo, { input: {id} })
        );


       const newTodos= todos.filter((todo)=>(
        todo.id != id
       ))
       
       setTodos(newTodos);
       
      } catch (error) {
        console.log("Error on Delete", error);
      }
  }

  useEffect(() => {
    fetchTodos()

  }, [])
  

  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
  <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
      {fileStatus ? "File uploaded successfully" : ""}
      {
        todos.map((todo, index) => (
          <div key={todo.id ? todo.id : index} style={styles.todo}>
            <p style={styles.todoName}>{todo.name}</p>
            <p style={styles.todoDescription}>{todo.description}</p>
            <img src={todo.image} height="60px" width="60px" alt="" />
            <button onClick={()=>{
                deleteTodos(todo.id)
            }}>delete</button>
           <button onClick={()=>{
            handleUpdate(todo.id);
           }}>Update</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default Todo