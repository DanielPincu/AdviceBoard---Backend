import { Router } from "express";
import { 
    getAdviceById, 
    getAllAdvices, 
    postAdvice, 
    deleteAdviceById, 
    updateAdviceById } from './controllers/advice.controller'

const routes: Router = Router();

routes.post('/advice', postAdvice);
routes.get('/advices', getAllAdvices);
routes.get('/advices/:id', getAdviceById);
routes.delete('/advices/:id', deleteAdviceById);
routes.put('/advices/:id', updateAdviceById);


export default routes;
