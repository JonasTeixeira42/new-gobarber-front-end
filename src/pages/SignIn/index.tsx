import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import getValidationErrors from '../../utils/getValidationErros';
import logoImg from '../../assets/logo.svg';
import * as S from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro no Login',
          description: 'Ocorreu um erro ao logar, cheque as credenciais',
          type: 'success',
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <>
      <S.Container>
        <S.Content>
          <S.AnimationContainer>
            <img src={logoImg} alt="logo" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>

              <Input
                name="email"
                icon={FiMail}
                placeholder="Email"
                type="text"
              />
              <Input
                name="password"
                icon={FiLock}
                placeholder="Senha"
                type="password"
              />

              <Button type="submit">Entrar</Button>

              <Link to="forgot-password">Esqueci minha senha</Link>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Criar conta
            </Link>
          </S.AnimationContainer>
        </S.Content>
        <S.Background />
      </S.Container>
    </>
  );
};

export default SignIn;
