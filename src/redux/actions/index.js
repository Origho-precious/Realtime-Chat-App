import { firestore } from '../../firebase';


export const setCurrentUser = (userData) => {
    return {
        type: `SIGN_IN`,
        payload: userData
    }
}

export const sendMessage = (message, user) => async (dispatch) => {
    
    try {
        const chatsRef = firestore.collection('chats')
        chatsRef.add({
            user,
            message,
            date: new Date()
        })
    
        let messages = []

        await chatsRef.orderBy("date", "desc").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let message = {
                        user: doc.data().user,
                        message: doc.data().message,
                        date: doc.data().date,
                        id: doc.id
                    }

                    messages.push(message);
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

export const deleteMessage = (messageId) => async (dispatch) => {
    try {
        await firestore.doc(`chats/${messageId}`).delete()
        const chatsRef = firestore.collection('chats')
        let messages = []

        await chatsRef.orderBy("date", "desc").get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let message = {
                        user: doc.data().user,
                        message: doc.data().message,
                        date: doc.data().date,
                        id: doc.id
                    }

                    messages.push(message);
                });
            });

        dispatch({
            type: 'DELETE_MESSAGE',
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
                    let message = {
                        user: doc.data().user,
                        message: doc.data().message,
                        date: doc.data().date,
                        id: doc.id
                    }

                    messages.push(message);
                });
            });

        dispatch({
            type: 'FETCH_MESSAGES',
            payload: messages
        })
    } catch (error) {
        console.log(error);
    }
}