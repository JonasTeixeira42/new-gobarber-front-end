import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('E-mail é obrigatório'),
        password: Yup.string().min(6, 'Minímo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <S.Container>
        <S.Background />
        <S.Content>
          <img src={logoImg} alt="logo" />

          <Form onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
              type="text"
            />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="text"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <a href="e">
            <FiArrowLeft />
            Voltar para logon
          </a>
        </S.Content>
      </S.Container>
    </>
  );
};

export default SignUp;
