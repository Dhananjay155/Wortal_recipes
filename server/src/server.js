const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/user.routes')
const recipeRoutes = require('./routes/recipe.routes');

const app= express();


app.use(cors());
app.use(express.json())

app.use('/register',userRoutes);
app.use('/login',userRoutes)
app.use('/api/auth', userRoutes);
app.use('/api', recipeRoutes);

const PORT = 5000 || process.env.PORT
app.listen(PORT, async ()=>{
    try {
        console.log(`[server]: running on the 5000`);
    connectDB();
    } catch (error) {
        console.log("error" ,error)
        
    }
    
})
