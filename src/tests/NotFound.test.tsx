import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/notfound' });
    expect(screen.getByRole('heading', { name: /Page requested not found/i, level: 2 })).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what Im doing', async () => {
    renderWithRouter(<App />, { route: '/notfound' });
    const pic = screen.getByRole('img', { name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i });
    expect(pic).toHaveAttribute('src', '/404.gif');
  });
});
