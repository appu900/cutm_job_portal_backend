import { ApplyJobInput } from "../dto/user.dto";
import { IApplicationRepository } from "../interface/applicationRepository.interface";

class ApplicationService {
  private _applicationRepository: IApplicationRepository;
  constructor(repository: IApplicationRepository) {
    this._applicationRepository = repository;
  }

  async createApllication(data: ApplyJobInput) {
    const result = await this._applicationRepository.create(data);
    return result;
  }

  async getAllApplications(){
    return await this._applicationRepository.getAll();
  }
}

export default ApplicationService;
