import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage for fresh start
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and store token on login', () => {
    const dummyResponse = {
      token: 'fake-jwt-token',
      user: { id: 1, username: 'testuser', email: 'test@example.com', avatarUrl: 'url' }
    };

    service.login('testuser', 'password123').subscribe(user => {
      expect(user).toEqual(dummyResponse.user);
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(dummyResponse.user));
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should clear localStorage on logout', () => {
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('currentUser', JSON.stringify({ id: 1 }));
    
    service.logout();
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(service.currentUserValue).toBeNull();
  });
});
