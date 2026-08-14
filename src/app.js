import express from 'express';
import userrouter from './routes/auth.routes.js';
import accountrouter from './routes/account.routes.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/auth',userrouter)
app.use('/api/accounts',accountrouter)
export default app;