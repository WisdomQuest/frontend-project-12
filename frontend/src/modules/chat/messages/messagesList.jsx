import { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useGetMessagesQuery, useAddMessageMutation } from './messagesApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../login/auth/authSlice';
import { SelectCurrentChannel } from '../channels/channelsSlice';
import {ArrowIcon} from '../../../assets/ArrowIcon';
import { useTranslation } from 'react-i18next';
import * as filter from 'leo-profanity';

export const MessageList = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const { t } = useTranslation();

  const { id: currentChannelId, name: currentChannelName } =
    useSelector(SelectCurrentChannel);

  const currentUser = useSelector(selectCurrentUser);
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const messageRef = useRef(null);

  useEffect(() => {
    filter.loadDictionary('ru');
  }, []);

  useEffect(() => {
    messageRef.current?.focus();
  }, [currentChannelId]);

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
          {t('messages.messageCount', { count: currentChanellMessages.length })}
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
                placeholder={t('messages.placeholder')}
                autoComplete="off"
                type="text"
              />
              <button
                type="submit"
                disabled={isLoading || !values.message.trim()}
                className="btn btn-outline-secondary"
                title={t('messages.send')}
              >
                <ArrowIcon />
                <span className="visually-hidden">{t('messages.send')}</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
