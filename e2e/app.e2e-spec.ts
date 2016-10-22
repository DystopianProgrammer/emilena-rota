import { EmilenaRotaPage } from './app.po';

describe('emilena-rota App', function() {
  let page: EmilenaRotaPage;

  beforeEach(() => {
    page = new EmilenaRotaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
