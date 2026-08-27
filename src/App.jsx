import { useEffect } from 'react';
import './App.css';
import userCrud from './api/usersAPI';
 function App() {
  useEffect(() => {
    async function testCRUD() {
      try {
        // 1. GET all users
        console.log('--- GET ALL USERS ---');
        const users = await userCrud.fetchUsers();
        console.log(users);

        // 2. GET one user
        console.log('--- GET USER ---');
        const user = await userCrud.fetchUser(1);
        console.log(user);

        // 3. POST - create a new user
        console.log('--- CREATE USER ---');
        const newUser = await userCrud.createUser({
          name: 'David',
          age: 28
        });
        console.log(newUser);
        
        // 4. PATCH - update part of a user
        console.log('--- PATCH USER ---');
        const updatedUser = await userCrud.updateUser(newUser.id, {
          age: 29
        });
        console.log(updatedUser);

        // 5. PUT - replace the user
        console.log('--- PUT USER ---');
        const replacedUser = await userCrud.replaceUser(newUser.id, {
          name: 'David Updated',
          age: 35
        });
        console.log(replacedUser);

        // 6. DELETE - delete the user
        console.log('--- DELETE USER ---');
        const deletedUser = await userCrud.deleteUser(newUser.id);
        console.log(deletedUser);

        // 7. Verify deletion
        console.log('--- GET ALL USERS AFTER DELETE ---');
        const finalUsers = await userCrud.fetchUsers();
        console.log(finalUsers);

      } catch (error) {
        console.error('CRUD TEST FAILED:', error);
      }
    }

    testCRUD();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
