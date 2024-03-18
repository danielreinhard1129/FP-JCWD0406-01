import { IStoreBranch } from "./cart.type";

export interface IJournals {
    id: number;
    branchId: number;
    title: string;
    reason: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    storeBranch: IStoreBranch;
}