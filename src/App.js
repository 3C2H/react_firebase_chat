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

  return (
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>
  )
}

function ChatMessage(props) {
  const {text, uid} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
} 

export default App;
