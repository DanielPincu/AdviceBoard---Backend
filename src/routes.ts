import { Router } from "express";
import { getAllAdvices, postAdvice } from './controllers/advice.controller'

const routes: Router = Router();



routes.get('/advices', getAllAdvices);
routes.post('/advice', postAdvice);

















export default routes;
