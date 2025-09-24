import { io } from 'socket.io-client';
import { useEffect, useRef, useCallback } from 'react';

export const useSocket = (action, refetch) => {
  const socketRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Стабильная версия refetch с логированием
  const stableRefetch = useCallback((data) => {
    refetch(data);
  }, [refetch]);

  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;

      socketRef.current = io('http://localhost:5002', {
        transports: ['websocket', 'polling'],
      });
    }

    const currentSocket = socketRef.current;

    currentSocket.on(action, stableRefetch);

    return () => {
      currentSocket.off(action, stableRefetch);
    };
  }, [action, stableRefetch]);

  // Закрываем соединение при размонтировании
  useEffect(() => {
    return () => {
      if (socketRef.current && isInitializedRef.current) {
        socketRef.current.close();
        socketRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []);
};
