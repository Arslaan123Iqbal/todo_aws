import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTodo } from '../graphql/mutations';
import { getTodo } from '../graphql/queries'

const Update = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [todo1, setTodo1] = useState({
      name:'',
      description:'',
      image:''
    });



    async function getTodos(){
    
      try {
        const oneTodo = await API.graphql(
          graphqlOperation(getTodo, { id: params.id })
        );
        const todo = oneTodo.data.getTodo;
        setTodo1({
          name:todo.name,
          description:todo.description,
          image: todo.image
        })

        console.log(todo1,"name");

      } catch (error) {

        console.log(error);
        
      }

    }

    useEffect( ()=>{
      getTodos()

      console.log(todo1,"todo1");

    },[]);


    function setInput(key, value) {
      setTodo1({ ...todo1, [key]: value })
    }
console.log(todo1);

const todoDetails = {

  id: params.id,
  description: 'My updated description!',
  image: "someimae"
};

async function updatTodo(){

  try {
    await API.graphql(graphqlOperation(updateTodo, {input: {id:params.id,name:todo1.name, description:todo1.description,image:todo1.image}}))
  } catch (error) {
    console.log(error);
  }
}
  

    return (
      <div style={styles.container}>
        <h2>Amplify Todos</h2>
        <input
          onChange={event => setInput('name', event.target.value)}
          style={styles.input}
          value={todo1.name}
          placeholder="Name"
        />
        <input
          onChange={event => setInput('description', event.target.value)}
          style={styles.input}
          value={todo1.description}
          placeholder="Description"
        />

        <button onClick={()=>{
          updatTodo();
        }}>Update</button>

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
  
export default Update