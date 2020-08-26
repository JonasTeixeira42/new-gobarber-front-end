import React, { useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../context/auth';

import logoImg from '../../assets/logo.svg';
import * as S from './styles';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

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

      <S.Content>
        <S.Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-Feira</span>
          </p>

          <S.NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />

              <strong>{user.name}</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </S.NextAppointment>

          <S.Section>
            <strong>Manhã</strong>

            <S.Appointment>
              <span>
                <FiClock /> 08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </S.Appointment>

            <S.Appointment>
              <span>
                <FiClock /> 08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </S.Appointment>
          </S.Section>

          <S.Section>
            <strong>Tarde</strong>

            <S.Appointment>
              <span>
                <FiClock /> 08:00
              </span>

              <div>
                <img src={user.avatar_url} alt={user.name} />

                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </S.Appointment>
          </S.Section>
        </S.Schedule>
        <S.Calendar />
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;
