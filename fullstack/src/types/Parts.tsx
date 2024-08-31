export enum PartTypes {
  cpu = "CPU",
  motherboard = "motherboard",
}

export type Parts = {
  [K in PartTypes]: number | undefined;
};

export type Part = {
  id: number;
  productName: string;
};