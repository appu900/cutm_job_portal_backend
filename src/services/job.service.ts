import { InputJobRequestDTO } from "../dto/job.dto";
import { IJobRepository } from "../interface/adminRepository.interface";

class JobService {
  _repository: IJobRepository;
  constructor(repository: IJobRepository) {
    this._repository = repository;
  }

  async createJob(data: InputJobRequestDTO) {
    const result = await this._repository.create(data);
    return result;
  }

  async fetchAllJobs() {
    const result = await this._repository.get();
    return result;
  }
}

export default JobService;
