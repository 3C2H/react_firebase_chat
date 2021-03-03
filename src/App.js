import React, {useState, useRef} from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCZKoQxiCBYKq9Acb-bjGUgr_2pl-yFFz8",
  authDomain: "react-firebase-chat-cc.firebaseapp.com",
  projectId: "react-firebase-chat-cc",
  storageBucket: "react-firebase-chat-cc.appspot.com",
  messagingSenderId: "718532505639",
  appId: "1:718532505639:web:8d4871ef6b0048c06f1e02",
  measurementId: "G-SSXC28KD9N"
})

const auth = firebase.auth()
const firestore = firebase.firestore()


function App() {
  const [user] = useAuthState(auth)
  
  return (
    <div className="App">
      <header className="App-header">
       
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onClick={signInWithGoogle}> Sign in with Google </button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField: 'id'})
  const [formValue, setFormValue] = useState('')
  const dummy = useRef()

  const sendMessage = async(e) => {
    e.preventDefault()

    const {uid, photoURL} = auth.currentUser
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy} />
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type='submit' disabled={!formValue}>Send 🕊️</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt='' />
      <p>{text}</p>
    </div>
  )
} 

export default App;
