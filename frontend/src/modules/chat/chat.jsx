import { Header } from '../../components/header/header.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken } from '../../modules/login/auth/authSlice.js';
import { ChannelList } from './channels/channelsList.jsx';
import { MessageList } from './messages/messagesList.jsx';
import { useSocket } from './hooks/useSocket.js';
import { useGetMessagesQuery } from './messages/messagesApi';
import { useGetChannelsQuery } from './channels/channelsApi';
import { handleChannelRemoval } from './channels/channelsSlice.js';

export const Chat = () => {
  const isAuthenticated = !!useSelector(selectCurrentToken);
  const navigate = useNavigate();
    const dispatch = useDispatch(); 

  const { refetch: refetchMessages } = useGetMessagesQuery();
  const { refetch: refetchChannels } = useGetChannelsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleRemoveChannel = (data) => {
    refetchChannels();
    dispatch(handleChannelRemoval(data.id));
  };

  useSocket('newMessage', refetchMessages);
  useSocket('newChannel', refetchChannels);
  useSocket('renameChannel', refetchChannels);
  useSocket('removeChannel', handleRemoveChannel);

  if (!isAuthenticated) return null;

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
