import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../context/toast';

import getValidationErrors from '../../utils/getValidationErros';
import logoImg from '../../assets/logo.svg';
import * as S from './styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <>
      <S.Container>
        <S.Content>
          <S.AnimationContainer>
            <img src={logoImg} alt="logo" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar senha</h1>

              <Input
                name="email"
                icon={FiMail}
                placeholder="Email"
                type="text"
              />

              <Button loading={loading} type="submit">
                Recuperar
              </Button>
            </Form>

            <Link to="/">
              <FiLogIn />
              Voltar ao login
            </Link>
          </S.AnimationContainer>
        </S.Content>
        <S.Background />
      </S.Container>
    </>
  );
};

export default ForgotPassword;
