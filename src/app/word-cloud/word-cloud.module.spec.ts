import { WordCloudModule } from './word-cloud.module';

describe('WordCloudModule', () => {
  let wordCloudModule: WordCloudModule;

  beforeEach(() => {
    wordCloudModule = new WordCloudModule();
  });

  it('should create an instance', () => {
    expect(wordCloudModule).toBeTruthy();
  });
});
