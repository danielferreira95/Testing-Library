import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokemons Details', () => {
  test('Testa se a página contém um texto com o nome do Pokémon', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const pokemon = screen.getByTestId('pokemon-name').textContent;
    const pokemonDetails = screen.getByRole('heading', { name: `${pokemon} Details`, level: 2 });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Testa se o link more details não consta na página depois de clicado', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByRole('link', { name: /more details/i })).not.toBeInTheDocument();
  });

  test('Testa se há um h2 com o nome de Summary na página de detalhes', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
  });

  test('Testa se há um parágrafo com o resumo do pokémon na página de detalhes', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const resumeParagraph = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(resumeParagraph).toBeInTheDocument();
  });

  test('Testa se há um h2 com os dados do mapa do pokemon', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const pokemon = screen.getByTestId('pokemon-name').textContent;
    const mapItens = screen.getByRole('heading', { name: `Game Locations of ${pokemon}`, level: 2 });
    expect(mapItens).toBeInTheDocument();
  });

  test('Testa se todos os mapas do pokémon escolhido são renderizados na tela', async () => {
    const { container } = renderWithRouter(<App />, { route: '/pokemon/25' });
    await waitFor(() => {
      const expectedLocations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
      const cardMaps = container.querySelectorAll('.card-map');
      const Elements = Array.from(cardMaps).map((cardMap) => cardMap.querySelector('p'));

      Elements.forEach((Element, i) => {
        if (Element) {
          expect(Element.textContent).toBe(expectedLocations[i]);
        }
      });
    });
  });

  test('Verifica se são exibidos os nomes e imagens dos mapas dom pokémon', () => {
    const { container } = renderWithRouter(<App />, { route: '/pokemon/25' });

    const srcimgKantoViridianForest = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    const srcimgKantoPowerPlant = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';

    const altImgLocations = /pikachu location/i;
    const cardMaps = container.querySelectorAll('.card-map');
    const imgElements = Array.from(cardMaps).map((cardMap) => cardMap.querySelector('img') as HTMLImageElement);

    expect(imgElements[0].src).toBe(srcimgKantoViridianForest);
    expect(imgElements[1].src).toBe(srcimgKantoPowerPlant);

    expect(imgElements[0].alt).toMatch(altImgLocations);
    expect(imgElements[1].alt).toMatch(altImgLocations);
  });

  test('Testa se é possível favoritar pokemon por meio da página de detalhes', async () => {
    const { user } = renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /more details/i }));

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i }) as HTMLInputElement;
    expect(favorite).toBeInTheDocument();
  });
});
