import { prisma } from "../config/database.config";
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

  async fetchJobById(id: number) {
    const result = await this._repository.findById(id);
    return result;
  }

  async fetchJobDetailsIncludeApplicants(id: number) {
    const result = await prisma.job.findUnique({
      where: {
        id: id,
      },
      include: {
        JobApplication: {
          include: {
            user: true,
            job: true,
          },
        },
      },
    });
    return result;
  }

  async fetchAllJobs() {
    const result = await this._repository.get();
    return result;
  }
}

export default JobService;
