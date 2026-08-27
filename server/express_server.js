import express from 'express';
import cors from 'cors';
import { verifyEmailToken } from './auth/verification-token.js';
const app = express();
app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 }
]

function logger(req,res,next){
    console.log(`${new Date().toISOString()}-${req.method}-${req.url}`);
    next();
}
app.use(logger);
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.get('/users', (req, res) => {
    if(!users){
       return res.status(404).json({
          message: "users not found"
      }); 
    }
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);    // Express automatically extracts ":id" from the URL
    const user = users.find(user => user.id === userId);
    if(!user){
      return res.status(404).json({
          message: "user not found"
      });
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    // const newUser = req.body;         // available because of express.json() middleware above
    // console.log("Creating user:", newUser);
    const newUser = {
        id: users.length? Math.max(...users.map(user => user.id)) + 1
        : 1,
        name: req.body.name,
        age: req.body.age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);    // Express automatically extracts ":id" from the URL
    const user = users.find(user => user.id === userId);
    if(!user){
      return res.status(404).json({
          message: "user not found"
      });
    }
    user.name = req.body.name;
    user.age = req.body.age;
    res.json(user)
});
app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    const user = users.find(user => user.id === userId);

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    if (req.body.name !== undefined) {
        user.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        user.age = req.body.age;
    }

    res.json(user);
});
app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);    // Express automatically extracts ":id" from the URL
    const userIndex = users.findIndex(user => user.id === userId);
    if(userIndex == -1){
      return res.status(404).json({
          message: "user not found"
      });
    }
    const deletedUser = users.splice(userIndex,1);
    res.json({
        message:`deleted user `,
        user: deletedUser[0]
    });
});
app.get('/verify-email',async(req,res)=>{
    try{
        const {token} = req.query;
        if(!token|| typeof token !== 'string'){
            return res.status(400).json({
                error:'verification token is required'
            });
        }
        const userId = await verifyEmailToken(token);
        res.json({
            message:'Email verified successfully',
            userId
        });

    }catch(err){
        return res.status(400).json({
            error: err.message
        });
    }

});
app.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token || typeof token !== 'string') {
            return res.status(400).json({
                error: 'Verification token is required'
            });
        }

        const userId = await verifyEmailToken(token);

        return res.json({
            message: 'Email verified successfully',
            userId
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
});
app.get('/risky', async(req, res,next) => {
    try{
        throw new Error('Something went wrong! inside risky route');
    }catch(err){
        next(err);
    }
});
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        error:'something went wrong',
    });
});


app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});