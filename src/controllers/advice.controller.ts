import { Request, Response } from 'express';
import { AdviceModel } from '../models/advice.model';
// DB connection is handled at app startup/shutdown

export async function getAllAdvices(req: Request, res: Response) {

    try {

        const result = await AdviceModel.find({});
        
        res.json(result);
    }

    catch (error) {
        res.status(500).json({ message: 'Error getting all advices', error });
    }

}

export async function postAdvice(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {

        const advice = new AdviceModel(data);
        const result = await advice.save();
        
        res.status(201).json(result);
    }

    catch (error) {
        res.status(500).json({ message: 'Error posting advice', error });
    }

}

export async function getAdviceById(req: Request, res: Response) {

    try {

        const id = req.params.id;
        const result = await AdviceModel.findById(id);

        if (!result) {
           res.status(404).json({ message: 'Advice not found' })
            return;
        }

        res.json(result);
    }

    catch (error) {
        res.status(500).json({ message: 'Error getting advice by ID', error });
    }

}

export async function deleteAdviceById(req: Request, res: Response) {

    try {

        const id = req.params.id;
        const result = await AdviceModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).json({ message: 'Advice not found' });
            return;
        }

        res.json({
            message: 'Advice deleted'
        });
        
        
    }

    catch (error) {
        res.status(500).json({ message: 'Error deleting advice by ID', error });
    }

}


export async function updateAdviceById(req: Request, res: Response) {

    try {

        const id = req.params.id;
        const result = await AdviceModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!result) {
            res.status(404).json({ message: 'Advice not found' });
            return;
        }

        res.json({
            message: 'Advice updated',
            data: result
        });
        
        
    }

    catch (error) {
        res.status(500).json({ message: 'Error updating advice by ID', error });
    }

}