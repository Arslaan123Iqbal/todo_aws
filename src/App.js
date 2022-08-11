import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';
import Update from './components/Update';

function App({ signOut, user }) {
  // Todo logic here

  return (
    <>
      {/* Add Todo JSX here  */}
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
<Routes>
  <Route path='/' element={<Todo/>} />
  <Route path='/update/:id' element={<Update/>} />
</Routes>
      
    </>
  );
}

export default withAuthenticator(App);