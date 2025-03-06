export interface IAdminRepository {
  create(data: any): Promise<any>;
  findOne(data: any): Promise<any>;
}
