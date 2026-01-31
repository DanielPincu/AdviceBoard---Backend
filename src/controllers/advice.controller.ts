import { Request, Response } from 'express';
import { AdviceModel } from '../models/advice.model';
import { connect, disconnect } from '../driver/mongo.driver'

export async function getAllAdvices(req: Request, res: Response) {

    try {

        await connect();

        const result = await AdviceModel.find({});
        
        res.json(result);
    }

    catch (error) {
        res.status(500).json({ message: 'Error getting all advices', error });
    }

    finally {
        await disconnect();
    }

}

export async function postAdvice(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {

        await connect();

        const advice = new AdviceModel(data);
        const result = await advice.save();
        
        res.status(201).json({ message: 'Advice posted successfully', advice: result });
    }

    catch (error) {
        res.status(500).json({ message: 'Error posting advice', error });
    }

    finally {
        await disconnect();
    }

}