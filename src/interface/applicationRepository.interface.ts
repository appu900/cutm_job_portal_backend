export interface IApplicationRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
  getAll(): Promise<any>;
}
   