import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

//import illustrationImg from '../assets/images/illustration.svg'
//import logoImg from '../assets/images/logo.svg'
import qIllustra from '../assets/images/qillustra.png'
import qlogoImg from '../assets/images/q.png'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import { database } from '../services/firebase'
import toast, { Toaster } from 'react-hot-toast'

import '../styles/auth.scss'

export function Home() {
    const [roomCode, setRoomCode] = useState('')
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
        toast.success('Sala criada com sucesso.')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if (!roomRef.exists()) {
            toast('A sala não existe')
            return
        }

        if (roomRef.val().endedAt) {
            toast('A sala já foi fechada.')
            return
        }

        history.push(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img
                    src={qIllustra}
                    alt="Ilustração simbolizando perguntas e respostas"
                />

                <strong>Crie salas de Q&amp;A ao vivo</strong>

                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={qlogoImg} alt="Que" />

                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input
                            onChange={(event) =>
                                setRoomCode(event.target.value)
                            }
                            value={roomCode}
                            type="text"
                            placeholder="Digite o código da sala"
                        />

                        <Button className="button" type="submit">
                            Entrar na sala
                        </Button>
                        <Toaster />
                    </form>
                </div>
            </main>
        </div>
    )
}
