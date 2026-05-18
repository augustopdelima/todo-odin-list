export class DeleteProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(projectId) {
    await this.projectRepository.deleteProject(projectId);
  }
}