const API_URL = '/api';
async function createUser(user){
    const response = await fetch(`${API_URL}/users`,{
        method: 'POST' ,
        headers:{
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(user)
    });
     if(!response.ok){
        throw new Error(`error occured: ${response.status}`);
    }
    return response.json()
}

async function fetchUser(userId){
    const response = await fetch(`${API_URL}/users/${userId}`);
    if(!response.ok){
        throw new Error(`error occured: ${response.status}`);
    }
    return  response.json();
    
}
async function fetchUsers(){
    const response = await fetch(`${API_URL}/users`);
    if(!response.ok){
       throw new Error(`error occured: ${response.status}`);
    }
    return  response.json();
}
async function updateUser(userId,userData){
    const response = await fetch(`${API_URL}/users/${userId}`,{
        method: 'PATCH' ,
        headers:{
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(userData)
    });
     if(!response.ok){
        throw new Error(`error occured: ${response.status}`);
    }
    return response.json()
    
}
async function replaceUser(userId,userData){
    const response = await fetch(`${API_URL}/users/${userId}`,{
        method: 'PUT' ,
        headers:{
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify(userData)
    });
     if(!response.ok){
        throw new Error(`error occured: ${response.status}`);
    }
    return response.json()
    
}
async function deleteUser(userId){
    const response = await fetch(`${API_URL}/users/${userId}`,{
        method: 'DELETE' ,
    });
     if(!response.ok){
        throw new Error(`error occured: ${response.status}`);
    }
    return response.json()
}
export default{
    createUser,
    fetchUser,
    fetchUsers,
    replaceUser,
    updateUser,
    deleteUser
}
