import { Header } from '../../components/header/header.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../modules/login/auth/authSlice.js';
import { ChannelList } from './channels/channelsList.jsx';
import { MessageList } from './messages/messagesList.jsx';

export const Chat = () => {
  const isAuthenticated = !!useSelector(selectCurrentToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className=" container my-4 rounded h-100 shadow overflow-hidden ">
        <div className="row h-100">
          <ChannelList />
          <MessageList />
        </div>
      </div>
    </div>
  );
};
