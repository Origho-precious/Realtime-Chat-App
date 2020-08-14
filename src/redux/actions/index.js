import { firestore } from '../../firebase';


export const setCurrentUser = (userData) => {
    return {
        type: `SIGN_IN`,
        payload: userData
    }
}

export const sendMessage = (message, user) => async (dispatch) => {
    const chatsRef = firestore.collection('chats')
    
    try {
        chatsRef.add({
            user,
            message,
            date: new Date()
        })
    
        let messages = []

        await chatsRef.orderBy("date", "desc").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    messages.push(doc.data());
                });
            });

        dispatch({
            type: 'SEND_MESSAGE',
            payload: messages
        })
    } catch (error) {
        console.log(error);
    }
}

export const fetchMessages = () => async (dispatch) => {
    let messages = []

    try {
        await firestore.collection("chats")
            .orderBy("date", "desc").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    messages.push(doc.data());
                });
            });

        dispatch({
            type: 'SEND_MESSAGE',
            payload: messages
        })
    } catch (error) {
        console.log(error);
    }
}