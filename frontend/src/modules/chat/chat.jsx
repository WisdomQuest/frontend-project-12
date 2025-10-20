import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch } from 'react-redux';
import { ChannelList } from './channels/channelsList.jsx';
import { MessagePanel } from './messages/messagePanel.jsx';
import { useSocket } from '../../hooks/useSocket.js';
import { useGetMessagesQuery } from './messages/messagesApi';
import { useGetChannelsQuery } from './channels/channelsApi';
import { handleChannelRemoval } from './channels/channelsSlice.js';

export const Chat = () => {
  const dispatch = useDispatch();

  const { refetch: refetchMessages } = useGetMessagesQuery();
  const { refetch: refetchChannels } = useGetChannelsQuery();


  const handleRemoveChannel = (data) => {
    refetchChannels();
    dispatch(handleChannelRemoval(data.id));
  };

  const socketUrl =
    import.meta.env.VITE_SOCKET_URL ||
    (import.meta.env.ENV === 'test' ? 'http://localhost:5002' : undefined);

  useSocket('newMessage', refetchMessages, socketUrl);
  useSocket('newChannel', refetchChannels, socketUrl);
  useSocket('renameChannel', refetchChannels, socketUrl);
  useSocket('removeChannel', handleRemoveChannel, socketUrl);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelList />
        </Col>
        <Col className="col p-0 h-100">
          <MessagePanel />
        </Col>
      </Row>
    </Container>
  );
};
