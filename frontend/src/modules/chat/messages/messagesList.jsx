import { useEffect, useRef, useMemo } from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useGetMessagesQuery, useAddMessageMutation } from './messagesApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../login/auth/authSlice';
import { selectCurrentChannel } from '../channels/channelsSlice';
import { ArrowIcon } from '../../../assets/icons/arrowIcon.jsx';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { notifyError } from '../channels/notify/notify.js';

const MessageItem = ({ message: { username, body } }) => (
  <div className="text-break mb-2">
    <b>{username}</b>: {body}
  </div>
);

export const MessageList = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const { t } = useTranslation();

  const { id: currentChannelId, name: currentChannelName } =
    useSelector(selectCurrentChannel);

  const currentUser = useSelector(selectCurrentUser);
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const messageRef = useRef(null);
  const messagesEndRef = useRef(null);

  const currentChannelMessages = useMemo(
    () => messages.filter((message) => message.channelId === currentChannelId),
    [messages, currentChannelId]
  );

  useEffect(() => {
    messageRef.current?.focus();
  }, [currentChannelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [currentChannelMessages]);

  const handleAddMessage = async (values, { resetForm }) => {
    try {
      const cleanedMessage = filter.clean(values.message.trim());
      await addMessage({
        body: cleanedMessage,
        channelId: currentChannelId,
        username: currentUser,
      }).unwrap();
      resetForm();
    } catch (error) {
      console.error(t('auth.errors.connectionError'), error);
      notifyError(t('messages.errors.connectionError'));
    }
  };

  return (
    <div className=" d-flex flex-column h-100">
      <div className="mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {currentChannelName}</b>
        </p>
        <span className="text-muted">
          {t('messages.messageCount', { count: currentChannelMessages.length })}
        </span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {currentChannelMessages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-auto px-5 py-3">
        <Formik initialValues={{ message: '' }} onSubmit={handleAddMessage}>
          {({ handleSubmit, handleChange, values }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="py-1 border rounded-2"
            >
              <InputGroup>
                <Form.Control
                  className="border-0 p-0 ps-2 form-control"
                  name="message"
                  placeholder={t('messages.placeholder')}
                  aria-label={t('messages.newMessage')}
                  aria-describedby="basic-message"
                  onChange={handleChange}
                  value={values.message}
                  ref={messageRef}
                  autoComplete="off"
                  type="text"
                />
                <Button
                  variant="outline"
                  type="submit"
                  id="button-message"
                  disabled={isLoading || !values.message.trim()}
                >
                  <ArrowIcon />
                  <span className="visually-hidden">{t('messages.send')}</span>
                </Button>
              </InputGroup>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
