import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokemon', () => {
  test('Testa se o nome correto do pokémon é mostrado na tela', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('button', { name: /dragon/i }));

    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
  });

  test('Testa se o tipo correto do pokémon é mostrado na tela', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('button', { name: /dragon/i }));

    expect(screen.getByTestId('pokemon-type').textContent).toBe('Dragon');
  });

  test('Testa se o peso médio do pokémon é exibido corretamente na tela', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('button', { name: /normal/i }));

    expect(screen.getByText(/average weight: 460\.0 kg/i)).toBeInTheDocument();
  });

  test('Testa se o src e o alt da imagem do Pokémon estão corretas', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name').textContent;
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const pokemonPic = screen.getByRole('img', { name: `${pokemon} sprite` });
    expect(pokemonPic).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonPic).toHaveAttribute('alt', `${pokemon} sprite`);
  });

  test('Testa se o src da imagem de favorito está correto', async () => {
    const { user } = renderWithRouter(<App />);

    const pokemon = screen.getByTestId('pokemon-name').textContent;
    expect(screen.getByText(`${pokemon}`)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i }) as HTMLInputElement;
    expect(favorite.checked).toBe(false);
    await user.click(favorite);
    expect(favorite.checked).toBe(true);

    const favoriteImg = screen.getByRole('img', { name: `${pokemon} is marked as favorite` });
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.png');
    expect(favoriteImg).toHaveAttribute('alt', `${pokemon} is marked as favorite`);
  });

  test('Testa se é exibido um texto com o tipo do Pokémon', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
  });

  test('Testa se há um link com um href = /pokemon/<id>', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /more details/i })).toHaveAttribute('href', '/pokemon/25');
  });
});
