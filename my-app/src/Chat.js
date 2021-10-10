import React,{useState,useEffect} from 'react';
function Chat({socket,username,room}){
    const [currentMessage,setCurrentMessage] = useState("")
    const [messageList,setMessageList] = useState([])
    const sendMessage = async ()=>{
        if(currentMessage!==""){
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message",messageData)
            setMessageList((list)=>[...list,messageData])
            setCurrentMessage("")
        }

    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
        //...list represent previous message list and data 
        console.log(data)
        });
      }, [socket]);
    

    return (
        <div>
            <div className="Chat-header">
                this is header
            </div>
            <div className="Chat-body">
                {messageList.map((messageContent)=>{
                    return <h1> {messageContent.message}</h1>    
                })}

            </div>
            <div className="Chat-footer">
                <input type="text" 
                value={currentMessage}
                onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                  }} 
                />
                <input type="button" onClick={sendMessage} value="This is value" />
            </div>
        </div>
    )
}
export default Chat