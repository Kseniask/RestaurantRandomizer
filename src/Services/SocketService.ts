import { Socket, connect } from 'socket.io-client'

class SocketService {
  public socket: Socket | null = null
  public connect (url: string) {
    return new Promise((resolve, reject) => {
      this.socket = connect(url)

      if (!this.socket) return reject('No socket')
      this.socket.on('room-joined', () => {
        resolve(this.socket as Socket)
      })

      //handle error
      this.socket.on('connect-error', error => {
        console.log('Connection error: ' + error)
        reject(error)
      })
    })
  }
}

// Export this way to have only one instance of a class in all files
export default new SocketService()
