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
  type: ComponentTypeProp;
};
