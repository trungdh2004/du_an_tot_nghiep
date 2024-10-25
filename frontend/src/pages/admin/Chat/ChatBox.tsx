import React from 'react'
import { useParams } from 'react-router-dom'

const ChatBox = () => {
    const {id} = useParams()
  return (
    <div>ChatBox {id}</div>
  )
}

export default ChatBox