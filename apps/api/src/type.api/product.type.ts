export interface IProduct {
  id?: number;
  name: string;
  description: string;
  weight: number;
  unitWeight: UnitWeight;
  image: string;
  price: number;
  categoryId: number;
}

enum UnitWeight {
  GRAM = 'GRAM',
  KG = 'KG',
}
