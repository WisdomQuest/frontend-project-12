import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useGetMessagesQuery, useAddMessageMutation } from './messagesApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../login/auth/authSlice';
import { SelectCurrentChannel } from '../channels/channelsSlice';
import { io } from 'socket.io-client';
export const MessageList = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const socket = io('http://localhost:5002');

  const { id: currentChannelId, name: currentChannelName } =
    useSelector(SelectCurrentChannel);

  const currentUser = useSelector(selectCurrentUser);
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.focus();
  }, [currentChannelId]);

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
  });

  const handleAddMessage = async (values, { resetForm }) => {
    try {
      await addMessage({
        body: values.message,
        channelId: currentChannelId,
        username: currentUser,
      }).unwrap();
      resetForm();
    } catch (error) {
      console.error('Ошибка при создании сообщения:', error);
    }
  };

  const currentChanellMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );

  return (
    <div className=" bg-warning-subtle col-10 d-flex flex-column">
      <div className="mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{currentChannelName}</b>
        </p>
        <span className="text-muted">
          {' '}
          {currentChanellMessages.length} сообщений
        </span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {currentChanellMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.body}
          </div>
        ))}
      </div>

      <div className="mt-auto px-5 py-3">
        <Formik
          initialValues={{ message: '' }}
          onSubmit={handleAddMessage}
          className="py-1 border rounded-2"
        >
          {({ values }) => (
            <Form className=" w-100 text-center m-5 input-group">
              <Field
                name="message"
                innerRef={messageRef}
                className="border-0 p-0 ps-2 form-control"
                placeholder="Введите сообщение..."
                type="text"
              />
              <button
                type="submit"
                disabled={isLoading || !values.message.trim()}
                className="btn btn-outline-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-right-square"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
