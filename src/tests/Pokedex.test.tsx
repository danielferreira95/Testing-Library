import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Pokedex', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 })).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Próximo Pokémon/i }));
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  test('Testa se a Pokédex tem os botões de filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const btnKindElements = screen.getAllByTestId('pokemon-type-button');
    await Promise.all(btnKindElements.map(async (btnKindElement) => {
      user.click(btnKindElement);

      await waitFor(() => {
        const btn = btnKindElement.textContent;
        const pokemonTypeElement = screen.getByTestId('pokemon-type');
        const pokemonType = pokemonTypeElement.textContent;
        expect(btn).toEqual(pokemonType);
      });
    }));
  });

  test('Testa se o botão All é renderizado', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Próximo Pokémon/i }));
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
