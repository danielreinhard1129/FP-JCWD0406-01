export interface IStoreBranch {
    id: number
    name: string
    latitude: string
    longitude: string
    address: string
    cityId: number
}

export interface IStock {
    id: number
    amount: number
    createdAt: Date
    updatedAt: Date
    productId: number
    branchId: number
    storeBranch: IStoreBranch
}

export interface ICategory {
    id: number
    name: string
}

export interface IProduct {
    id: number
    name: string
    image: string
    price: number
    description: string
    createdAt: Date
    updatedAt: Date
    categoryId: number
    stocks: IStock[]
    category: ICategory
}

