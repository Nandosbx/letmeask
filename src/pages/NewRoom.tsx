import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

//import illustrationImg from '../assets/images/illustration.svg'
//import logoImg from '../assets/images/logo.svg'
import qlogoImg from '../assets/images/q.png'
import qIllustra from '../assets/images/qillustra.png'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom() {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoow] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if (newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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

                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            onChange={(event) => setNewRoow(event.target.value)}
                            value={newRoom}
                            type="text"
                            placeholder="Nome da sala"
                        />

                        <Button className="button" type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?{' '}
                        <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}
