import { ListItem, Avatar } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { db } from "../Firebase"
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const CustomListItems = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
        const ref = query(collection(db, "chats", id, 'messages'), orderBy('timestamp', "desc"))
        onSnapshot(ref, (categories) =>
            setChatMessages(categories.docs.map((category) => category.data()
            ))
        )
    })

    return (
        <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
            <Avatar rounded source={{
                uri: chatMessages?.[0]?.photoURL || "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png",
            }} />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItems

// lets test in mobile  // cool ...lets deploy in next vdeo