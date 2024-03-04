import { addStoreAdminAction } from '@/actions/storeAdmin/addStoreAdmin.action';
import { deleteStoreAdminAction } from '@/actions/storeAdmin/deleteStoreAdmin.action';
import { getStoreAdminAction } from '@/actions/storeAdmin/getStoreAdmins.action';
import { updateStoreAdminAction } from '@/actions/storeAdmin/updateStoreAdmin.action';
import { NextFunction, Request, Response } from 'express';

export class StoreAdminController {
  async addStoreAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await addStoreAdminAction(req.body);
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async getStoreAdmins(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getStoreAdminAction();
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateStoreAdmin(req: Request, res: Response, next: NextFunction){
    try {
        const {id} = req.params
        const result = await updateStoreAdminAction(parseInt(id,0),req.body)
        res.status(result.status).send(result)
    } catch (error) {
        next(error)
    }
  }
  async deleteStoreAdmin(req: Request, res: Response, next: NextFunction){
    try {
        const {id} = req.params
        const result = await deleteStoreAdminAction(parseInt(id,0))
        res.status(result.status).send(result)
    } catch (error) {
        next(error)
    }
  }
  
}
