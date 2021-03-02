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

const [user] = useAuthState(auth)

function App() {
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
    const provider = new firebase.auth.googleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button onclick={signInWithGoogle}> Sign in with Google </button>
  )
}

export default App;
