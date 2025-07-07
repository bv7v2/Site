import React from 'react';
import { Div } from '@vkontakte/vkui';

const FormIframe = ({ userData }) => {
  // Ваши ID полей из Google Forms
  const FORM_ID = "YOUR_GOOGLE_FORM_ID";
  const USER_ID_FIELD = "entry.XXXXXXX";
  const USER_NAME_FIELD = "entry.YYYYYYY";
  
  // Генерация URL с предзаполненными данными
  const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?` +
    `usp=pp_url&` +
    `${USER_ID_FIELD}=${userData.id}&` +
    `${USER_NAME_FIELD}=${encodeURIComponent(userData.name)}` +
    `&embedded=true`;

  return (
    <Div style={{ height: '100vh', padding: 0 }}>
      <iframe 
        src={formUrl}
        title="Google Form"
        width="100%" 
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
      >
        Загрузка...
      </iframe>
    </Div>
  );
};

export default FormIframe;