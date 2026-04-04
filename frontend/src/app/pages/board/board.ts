import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ProjectService, Issue, Project } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './board.html',

  styleUrl: './board.css'
})
export class BoardComponent implements OnInit {
  projects: Project[] = [];
  currentProject: Project | null = null;
  issues: Issue[] = [];
  
  columns = ['Backlog', 'InProgress', 'Review', 'Done'];
  
  showIssueModal = false;
  viewingIssue: Issue | null = null;
  isEditingSidepanel = false;
  editingIssueData: Issue | null = null;
  showDeleteConfirmModal = false;
  
  issueForm: FormGroup;
  
  draggingIssue: Issue | null = null;
  
  isEditingProject = false;
  editedProjectName = '';

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.issueForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      type: ['Task', Validators.required],
      priority: ['Medium', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(projs => {
      this.projects = projs;
      if (projs.length > 0) {
        this.selectProject(projs[0]);
      } else {
        // Create demo project if none exists
        this.projectService.createProject({ name: 'Demo Project', description: 'Auto-generated demo' })
          .subscribe(p => {
             this.projects = [...this.projects, p];
             this.selectProject(p);
             this.cdr.markForCheck();
          });
      }
      this.cdr.markForCheck();
    });
  }

  selectProject(project: any) {
    this.currentProject = project;
    this.isEditingProject = false;
    this.loadIssues();
  }

  startEditProjectName() {
    if (!this.currentProject) return;
    this.isEditingProject = true;
    this.editedProjectName = this.currentProject.name;
    this.cdr.markForCheck();
  }

  saveProjectName() {
    if (!this.currentProject || !this.editedProjectName.trim()) {
      this.isEditingProject = false;
      return;
    }
    
    const newName = this.editedProjectName.trim();
    if (newName !== this.currentProject.name) {
      const updated = { ...this.currentProject, name: newName };
      this.projectService.updateProject(updated.id!, updated).subscribe(() => {
        this.currentProject!.name = newName;
        // Trigger select redraw
        this.projects = [...this.projects];
        this.isEditingProject = false;
        this.cdr.markForCheck();
      });
    } else {
      this.isEditingProject = false;
      this.cdr.markForCheck();
    }
  }

  loadIssues() {
    if (!this.currentProject || !this.currentProject.id) return;
    this.projectService.getIssues(this.currentProject.id).subscribe(issues => {
      this.issues = issues;
      this.cdr.markForCheck();
    });
  }

  getIssuesByStatus(status: string): Issue[] {
    return this.issues.filter(i => i.status === status);
  }

  openModal() {
    this.issueForm.reset({ type: 'Task', priority: 'Medium' });
    this.showIssueModal = true;
    this.cdr.markForCheck();
  }

  closeModal() {
    this.showIssueModal = false;
    this.cdr.markForCheck();
  }

  viewIssue(issue: Issue) {
    this.viewingIssue = issue;
    this.isEditingSidepanel = false;
    this.cdr.markForCheck();
  }

  closeViewPanel() {
    this.viewingIssue = null;
    this.isEditingSidepanel = false;
    this.cdr.markForCheck();
  }

  startIssueEdit() {
    this.isEditingSidepanel = true;
    this.editingIssueData = { ...this.viewingIssue! };
    this.cdr.markForCheck();
  }

  cancelIssueEdit() {
    this.isEditingSidepanel = false;
    this.editingIssueData = null;
    this.cdr.markForCheck();
  }

  saveIssueEdit() {
    if (!this.editingIssueData || !this.editingIssueData.title.trim()) return;
    
    this.projectService.updateIssue(this.editingIssueData.id!, this.editingIssueData).subscribe(() => {
      // Create new references
      const updatedData = { ...this.editingIssueData! };
      this.issues = this.issues.map(i => i.id === updatedData.id ? updatedData : i);
      this.viewingIssue = updatedData;
      this.isEditingSidepanel = false;
      this.cdr.markForCheck();
    });
  }

  deleteIssue() {
    if (!this.viewingIssue || !this.viewingIssue.id) return;
    this.showDeleteConfirmModal = true;
    this.cdr.markForCheck();
  }

  cancelDeleteIssue() {
    this.showDeleteConfirmModal = false;
    this.cdr.markForCheck();
  }

  confirmDeleteIssue() {
    if (!this.viewingIssue || !this.viewingIssue.id) return;
    this.projectService.deleteIssue(this.viewingIssue.id).subscribe(() => {
      this.issues = this.issues.filter(i => i.id !== this.viewingIssue!.id);
      this.showDeleteConfirmModal = false;
      this.closeViewPanel();
      this.cdr.markForCheck();
    });
  }

  createIssue() {
    if (this.issueForm.invalid || !this.currentProject?.id) return;
    
    const val = this.issueForm.value;
    const newIssue: Issue = {
      projectId: this.currentProject.id,
      title: val.title,
      description: val.description,
      type: val.type,
      priority: val.priority,
      status: 'Backlog',
      assigneeId: this.authService.currentUserValue?.id
    };

    this.projectService.createIssue(newIssue).subscribe(issue => {
      this.issues = [...this.issues, issue];
      this.closeModal();
      this.cdr.markForCheck();
    });
  }

  onDragStart(issue: Issue, event: DragEvent) {
    this.draggingIssue = issue;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      // Need this for Firefox
      event.dataTransfer.setData('text/plain', issue.id?.toString() || '');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDrop(status: string, event: DragEvent) {
    event.preventDefault();
    if (this.draggingIssue && this.draggingIssue.status !== status) {
      const issueId = this.draggingIssue.id!;
      const oldStatus = this.draggingIssue.status;
      
      // Immutable update to trigger CD
      this.issues = this.issues.map(i => i.id === issueId ? { ...i, status } : i);
      const updatedIssue = this.issues.find(i => i.id === issueId)!;

      this.projectService.updateIssue(issueId, updatedIssue).subscribe({
        error: () => {
          // Revert if error
          this.issues = this.issues.map(i => i.id === issueId ? { ...i, status: oldStatus } : i);
        }
      });
    }
    this.draggingIssue = null;
  }
}
