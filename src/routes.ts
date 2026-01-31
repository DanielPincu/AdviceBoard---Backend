import { Router } from "express";
import { getAdviceById, getAllAdvices, postAdvice, deleteAdviceById } from './controllers/advice.controller'

const routes: Router = Router();



routes.post('/advice', postAdvice);
routes.get('/advices', getAllAdvices);
routes.get('/advice/:id', getAdviceById);
routes.delete('/advice/:id', deleteAdviceById);












export default routes;
