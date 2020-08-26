import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../context/auth';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  console.log(user);
  return (
    <S.Container>
      <S.Header>
        <S.HeaderContent>
          <img src={logoImg} alt="Gobarber" />

          <S.Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </S.Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </S.HeaderContent>
      </S.Header>
    </S.Container>
  );
};

export default Dashboard;
