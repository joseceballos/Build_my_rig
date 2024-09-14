export type ProductTypeProp = {
  id: number;
  name: string;
  description: string;
  order: number;
};

export type SpecificationTypeProp = {
  id: number;
  name: string;
  description?: string;
  valueType: string;
  filterType: string;
  productType?: ProductTypeProp;
};

export type SpecificationProp = {
  id: number;
  value: string;
  description?: string;
  specificationType: SpecificationTypeProp;
};

export type PropertyProp = {
  id: number;
  name: string;
  description?: string;
}

export type ProductRangeProp = {
  id: number;
  name: string;
  description?: string;
  productType: ProductTypeProp;
}

export type FamilyProp = {
  id: number;
  name: string;
  year: number;
  description?: string;
  productRange: ProductRangeProp;
}

export type ProductProp = {
  id: number;
  productId: string;
  model: string;
  family: FamilyProp;
};