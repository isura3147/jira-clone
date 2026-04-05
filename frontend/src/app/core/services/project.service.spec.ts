import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService, Project, Issue } from './project.service';
import { environment } from '../../../environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch projects', () => {
    const dummyProjects: Project[] = [
      { id: 1, name: 'Project 1', description: 'Desc 1' },
      { id: 2, name: 'Project 2', description: 'Desc 2' }
    ];

    service.getProjects().subscribe(projects => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(dummyProjects);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/projects`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProjects);
  });

  it('should fetch project issues', () => {
    const dummyIssues: Issue[] = [
      { id: 1, projectId: 1, title: 'Bug', type: 'Bug', status: 'Backlog', priority: 'High' }
    ];

    service.getIssues(1).subscribe(issues => {
      expect(issues.length).toBe(1);
      expect(issues[0].title).toBe('Bug');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/issues/project/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyIssues);
  });
});
