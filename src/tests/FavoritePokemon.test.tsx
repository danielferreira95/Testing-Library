import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemon', () => {
  test('Testa se não há pokemons favoritos', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    expect(screen.getByText(/Pokémon found/i)).toBeInTheDocument();
  });

  test('Testa se há pokemons favoritos', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const favorite = screen.getByRole('checkbox', { name: /favoritado/i }) as HTMLInputElement;
    expect(favorite.checked).toBe(false);
    await user.click(favorite);
    expect(favorite.checked).toBe(true);

    await user.click(screen.getByRole('link', { name: /favorite pokémon/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
