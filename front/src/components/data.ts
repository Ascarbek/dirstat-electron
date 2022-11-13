export interface IFieldMap {
  [keys: string]: {
    title: string;
    type: 'string' | 'number';
    value?: string | number;
  };
}
