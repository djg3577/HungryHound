import { Request, Response } from "express";
import SalesService from "../../services/sales";
import { Container } from "typedi";
import { ISalesRecord } from "../../interfaces/ISalesRecord";

export default {
    // async getAllSalesRecords(req: Request, res: Response) {
    //     try {
    //         console.log("Controller level");
    //         const salesService = Container.get(SalesService);
    //         const records = await salesService.getSalesRecords();
    //         return res.status(200).json(records || "None Found");
    //     } catch (error) {
    //         return error;
    //     }
    // },
    async createNewSalesRecord(req: Request, res: Response) {
        try {
            const newRecord = req.body as ISalesRecord;
            const salesService = Container.get(SalesService);
            const record = await salesService.createNewSalesRecord(newRecord);
            return res.status(200).json({status: "Record created succesfully.", record});
        } catch (error) {
            return error;
        }
    },
    async getAllSalesRecord(req: Request, res: Response) {
        try {
            const salesService = Container.get(SalesService);
            const records = await salesService.getAllNewSalesRecord(); 
            return res.status(200).json({status: "Records retrieved succesfully.", records});
        } catch (error) {
           return error; 
        }
    },
    async deleteSingleSalesRecord(req: Request, res: Response) {
        try {
            console.log("in controller");
            const Id = req.body.Id;
            console.log("ID received:", req.body);
            const salesService = Container.get(SalesService);
            const record = await salesService.deleteRecordById(Id);
            return res.status(200).json({status: "Record deleted succesfully.", record});
        } catch (error) {
           return error; 
        }
    }
}