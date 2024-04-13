import { useParams } from 'react-router-dom';
import { activateAccount } from '../api/Auth';
import React from 'react';

const ActivateAccount = () => {
  const { id_user, token } = useParams();
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    const data = {
      uid: id_user,
      token: token,
    };

    const sendData = async () => {
      try {
        const response = await activateAccount(data);
        if (response.status === 200) {
          setResult('Tu cuenta ha sido activada exitosamente.');
        } else {
          setResult(
            '(' + response.status + ')' +
            'Ha ocurrido un error. Intente nuevamente.'
          );
        }
      } catch (error) {
        setResult('Ha ocurrido un error. Intente nuevamente.');
      }
    };

    sendData();
  }, [id_user, token]);

  return (
    <div>
      <h2>ID encriptado: {id_user}</h2>
      <h2>Código encriptado: {token}</h2>
      <h2>{result}</h2>
    </div>
  );
};

export default ActivateAccount;
