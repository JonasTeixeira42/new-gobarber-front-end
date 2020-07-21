import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const SignIn: React.FC = () => (
  <>
    <S.Container>
      <S.Content>
        <img src={logoImg} alt="logo" />

        <form>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="Email" type="text" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>

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
