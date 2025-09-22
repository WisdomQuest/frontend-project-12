import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

export const useSocket = (action, refetch) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
    const newSocket = io('http://localhost:5002', {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }
  }, [socket]);

  // Слушатель сообщений
  useEffect(() => {
    if (!socket) return;

    const handlenewChannel = () => {
      refetch();
    };

    socket.on(action, handlenewChannel);

    // Очистка слушателей
    return () => {
      socket.off(action, handlenewChannel);
    };
  }, [socket, refetch, action]);

  return socket;
};
