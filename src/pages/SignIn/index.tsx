import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const SignIn: React.FC = () => (
  <>
    <S.Container>
      <S.Content>
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Faça seu logon</h1>

          <input placeholder="Email" type="text" />

          <input placeholder="Senha" type="text" />

          <button type="submit">Entrar</button>

          <a href="ç">Esqueci minha senha</a>
        </form>

        <a href="e">
          <FiLogIn />
          Criar conta
        </a>
      </S.Content>
      <S.Background />
    </S.Container>
  </>
);

export default SignIn;
