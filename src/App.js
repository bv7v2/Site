import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { AppRoot, View, Panel, ScreenSpinner } from '@vkontakte/vkui';
import FormIframe from './components/FormIframe';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Инициализация VK Bridge с указанием app_id
        await bridge.send('VKWebAppInit', {
          app_id: 53869270,  // Ваш ID приложения
          api_version: "5.199"
        });
        
        // Получение данных пользователя
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUserData({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`
        });
        
      } catch (error) {
        console.error('Ошибка:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <AppRoot>
      <View activePanel="main">
        <Panel id="main">
          {isLoading ? (
            <ScreenSpinner size="large" />
          ) : (
            <FormIframe userData={userData} />
          )}
        </Panel>
      </View>
    </AppRoot>
  );
};

export default App;