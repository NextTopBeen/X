import { WordCloudRoutingModule } from './word-cloud-routing.module';

describe('WordCloudRoutingModule', () => {
  let wordCloudRoutingModule: WordCloudRoutingModule;

  beforeEach(() => {
    wordCloudRoutingModule = new WordCloudRoutingModule();
  });

  it('should create an instance', () => {
    expect(wordCloudRoutingModule).toBeTruthy();
  });
});
