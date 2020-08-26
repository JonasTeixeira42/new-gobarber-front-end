import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../context/toast';

import getValidationErrors from '../../utils/getValidationErros';
import logoImg from '../../assets/logo.svg';
import * as S from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar senha, tente novamente',
          type: 'error',
        });
      }
    },
    [addToast, history]
  );

  return (
    <>
      <S.Container>
        <S.Content>
          <S.AnimationContainer>
            <img src={logoImg} alt="logo" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar senha</h1>

              <Input
                name="password"
                icon={FiLock}
                placeholder="Nova senha"
                type="password"
              />

              <Input
                name="password_confirmation"
                icon={FiLock}
                placeholder="Confirmação de senha"
                type="password"
              />

              <Button type="submit">Alterar senha</Button>
            </Form>
          </S.AnimationContainer>
        </S.Content>
        <S.Background />
      </S.Container>
    </>
  );
};

export default ResetPassword;
