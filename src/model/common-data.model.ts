export interface DetailsDataModel {
  attributes: any;
  id: string;
  links: {
    self: any
  };
  relationships: any
  type: string;
}

export class CommonDataModel {
  data: DetailsDataModel[] = [];
  included: DetailsDataModel[] = [];
  jsonapi: {
    version: string;
    meta: any
  } = {
    version: '',
    meta: null
  };
  links: {
    self: any,
    next?: any,
    first?: any,
    prev?: any
  } = {
    self: null
  };
}

export type CommonArrayDataModel = CommonDataModel;

export type CommonObjectDataModel = Omit<CommonDataModel, 'data'> & {
  data: DetailsDataModel,
};
