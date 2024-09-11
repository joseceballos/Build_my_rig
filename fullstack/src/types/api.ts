export type ComponentTypeProp = {
  id: number;
  name: string;
  description: string;
  order: number;
};

export type ComponentProp = {
  id: number;
  productId: string;
  model: string;
  componentType: ComponentTypeProp;
};

export type SpecificationTypeProp = {
  id: number;
  name: string;
  description?: string;
  valueType: string;
  filterType: string;
  componentType?: ComponentTypeProp;
};

export type SpecificationProp = {
  id: number;
  value: string;
  description?: string;
  specificationType: SpecificationTypeProp;
};
