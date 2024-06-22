import { message } from 'antd'

export class ShowMessage {
  static success(options: string, ss = 2) {
    this.message('success', options, ss)
  }

  static warning(options: string, ss = 2) {
    this.message('warning', options, ss)
  }

  static info(options: string, ss = 2) {
    this.message('info', options, ss)
  }

  static error(options: any, ss = 2) {
    this.message('error', options, ss)
  }

  static message(type: any, options: any, ss = 2) {
    const messageDom = document.getElementsByClassName('ant-message')[0]
    // console.log(messageDom,'a');
    if (messageDom === undefined) {
      ;(message as any)[type](options, ss)
    } else {
      // message.closeAll()
      ;(message as any).destroy()
      ;(message as any)[type](options, ss)
    }
  }
}
