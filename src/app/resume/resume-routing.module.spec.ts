import { ResumeRoutingModule } from './resume-routing.module';

describe('ResumeRoutingModule', () => {
  let resumeRoutingModule: ResumeRoutingModule;

  beforeEach(() => {
    resumeRoutingModule = new ResumeRoutingModule();
  });

  it('should create an instance', () => {
    expect(resumeRoutingModule).toBeTruthy();
  });
});
