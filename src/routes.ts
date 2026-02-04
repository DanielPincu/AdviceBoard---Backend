import { Router } from "express";
import { 
    getAdviceById, 
    getAllAdvices, 
    postAdvice, 
    deleteAdviceById, 
    updateAdviceById,
    addReply,
    deleteReplyById
} from './controllers/advice.controller'
import { verifyToken, registerUser, loginUser } from './controllers/auth.controller'

const routes: Router = Router();

// Auth (public)
routes.post('/user/register', registerUser);
routes.post('/user/login', loginUser);

routes.post('/advices', verifyToken, postAdvice);
routes.get('/advices', getAllAdvices);
routes.get('/advices/:id', getAdviceById);
routes.delete('/advices/:id', verifyToken, deleteAdviceById);
routes.put('/advices/:id', verifyToken, updateAdviceById);

// Replies
routes.post('/advices/:id/replies', verifyToken, addReply);
routes.delete('/advices/:adviceId/replies/:replyId', verifyToken, deleteReplyById);


export default routes;
