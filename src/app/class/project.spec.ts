import { Project } from './project';

describe('Project', () => {
  it('should create an instance', () => {
    expect(new Project( 'Test Project',new Date() , 78900 )).toBeTruthy();
  });
});
