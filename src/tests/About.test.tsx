import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<App />, { route: '/about' });

  expect(screen.getByRole('heading', { name: /About Pokédex/i })).toBeInTheDocument();

  expect(screen.getAllByText(/pokédex/i, { selector: 'p' })).toHaveLength(1);

  expect(screen.getByRole('img', { name: /pokédex/i })).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
