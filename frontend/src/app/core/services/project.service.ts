import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Issue {
  id?: number;
  projectId: number;
  title: string;
  description?: string;
  type: string;
  status: string;
  priority: string;
  assigneeId?: number | null;
  assignee?: any;
  createdAt?: string;
}

export interface Project {
  id?: number;
  name: string;
  description?: string;
  issues?: Issue[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.apiUrl}/projects/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${environment.apiUrl}/projects`, project);
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${environment.apiUrl}/projects/${id}`, project);
  }

  getIssues(projectId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${environment.apiUrl}/issues/project/${projectId}`);
  }

  createIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${environment.apiUrl}/issues`, issue);
  }

  updateIssue(id: number, issue: Issue): Observable<any> {
    return this.http.put(`${environment.apiUrl}/issues/${id}`, issue);
  }

  deleteIssue(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/issues/${id}`);
  }
}
