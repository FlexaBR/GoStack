import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// createSwitchNavigator: não produz resutado visual, na navegação de uma rota para outra
// toda pilha de rotas é ressetada. Não fica com histórico de rotas.
// utilizado na rota de login para cadastro.. do cadastro não poderá voltar para o login.

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  })
);
