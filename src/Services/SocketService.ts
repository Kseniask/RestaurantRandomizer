import { Socket, connect } from 'socket.io-client'
import { getRandomRestaurantResponse } from '../Components/Result'

class SocketService {
  public socket: Socket | null = null
  public async connect (url: string) {
    this.socket = connect(url)
    if (!this.socket) throw new Error('No socket')
    this.socket.on('connect', () => {
      return this.socket as Socket
    })

    //handle error
    this.socket.on('connect-error', error => {
      console.log('Connection error: ' + error)
      throw new Error(error)
    })
  }

  public joinRoom (roomId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.socket) throw new Error('No socket')

      this.socket.emit('join-group', { roomId })

      this.socket.on('no-random-place', async roomId => {
        const randomRestaurant = await getRandomRestaurantResponse()
        if (this.socket)
          this.socket.emit('random-place-received', {
            roomId,
            randomRestaurant
          })
      })

      this.socket.on('group-joined', (roomId, selectedRestaurant) => {
        resolve(selectedRestaurant)
      })
    })
  }
}

// Export this way to have only one instance of a class in all files
export default new SocketService()
