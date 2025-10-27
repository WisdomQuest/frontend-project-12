import {
  useRemoveChannelMutation,
  useEditChannelMutation,
} from './channelsApi.js'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState, useCallback } from 'react'
import { DeleteChannelModal } from './modal/deleteChannelModal.jsx'
import { EditChannelModal } from './modal/editChannelModal.jsx'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import filter from 'leo-profanity'
import { notifySuccess, notifyError } from '../../../common/notify/notify.js'
import { setCurrentChannel } from './channelsSlice.js'

const ChannelItem = ({ channel, isActive, onSelect, channelsNames }) => {
  const [modal, setModal] = useState({ delete: false, edit: false })
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [removeChannel] = useRemoveChannelMutation()
  const [editChannel] = useEditChannelMutation()

  const openModal = (type) => {
    setModal((s) => ({ ...s, [type]: true }))
  }

  const closeModal = (type) => {
    setModal((s) => ({ ...s, [type]: false }))
  }

  const handleSelect = () => {
    onSelect({ id: channel.id, name: channel.name })
  }

  const handleEdit = useCallback(
    async (values) => {
      try {
        const cleanedChatName = filter.clean(values.chatName.trim())
        await editChannel({
          name: cleanedChatName,
          id: channel.id,
        }).unwrap()

        if (isActive) {
          dispatch(
            setCurrentChannel({ id: channel.id, name: cleanedChatName }),
          )
        }

        notifySuccess(t('channels.toast.rename'))
        closeModal('edit')
      }
      catch (error) {
        console.error(error)
        notifyError(t('channels.errors.connectionError'))
      }
    },
    [editChannel, channel.id, isActive, dispatch, t, closeModal],
  )

  const handleRemove = useCallback(async () => {
    try {
      await removeChannel(channel.id).unwrap()
      notifySuccess(t('channels.toast.delete'))
      closeModal('delete')
    }
    catch (error) {
      console.error(error)
      notifyError(t('channels.errors.connectionError'))
    }
  }, [removeChannel, channel.id, t, closeModal])

  return (
    <>
      <ListGroup.Item className="p-0 border-0">
        <Dropdown as={ButtonGroup} className="w-100">
          <Button
            variant={isActive ? 'secondary' : 'light'}
            className="w-100 text-start rounded-0 text-truncate"
            onClick={handleSelect}
          >
            <span className="me-1"># </span>
            {channel.name}
          </Button>

          {channel.removable && (
            <>
              <Dropdown.Toggle
                split
                variant={isActive ? 'secondary' : 'outline-light'}
                id={`dropdown-channel-${channel.id}`}
                className="rounded-0"
              >
                <span className="visually-hidden">
                  {t('channels.ChannelManagement')}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button" onClick={() => openModal('delete')}>
                  {t('channels.actions.delete')}
                </Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => openModal('edit')}>
                  {t('channels.actions.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </ListGroup.Item>

      <DeleteChannelModal
        isOpen={modal.delete}
        onClose={() => closeModal('delete')}
        onSubmit={handleRemove}
        t={t}
      />

      <EditChannelModal
        isOpen={modal.edit}
        onClose={() => closeModal('edit')}
        onSubmit={handleEdit}
        channelName={channel.name}
        channelsNames={channelsNames}
        textHeaderModal={t('channels.modal.renameTitle')}
        t={t}
        textErorr={t('channels.errors.unsuccessfulRename')}
      />
    </>
  )
}

export default ChannelItem
