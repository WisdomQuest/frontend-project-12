import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentToken } from "../../modules/login/auth/authSlice.js"
import { ChannelList } from "./channels/channelsList.jsx"
import { MessageList } from "./messages/messagesList.jsx"
import { useSocket } from "../../hooks/useSocket.js"
import { useGetMessagesQuery } from "./messages/messagesApi"
import { useGetChannelsQuery } from "./channels/channelsApi"
import { handleChannelRemoval } from "./channels/channelsSlice.js"

export const Chat = () => {
  const isAuthenticated = !!useSelector(selectCurrentToken)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { refetch: refetchMessages } = useGetMessagesQuery()
  const { refetch: refetchChannels } = useGetChannelsQuery()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const handleRemoveChannel = (data) => {
    refetchChannels()
    dispatch(handleChannelRemoval(data.id))
  }

  useSocket("newMessage", refetchMessages)
  useSocket("newChannel", refetchChannels)
  useSocket("renameChannel", refetchChannels)
  useSocket("removeChannel", handleRemoveChannel)

  if (!isAuthenticated) return null

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelList />
        </Col>
        <Col className="col p-0 h-100">
          <MessageList />
        </Col>
      </Row>
    </Container>
  )
}
