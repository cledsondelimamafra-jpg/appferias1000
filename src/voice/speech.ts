declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export function startSpeech(
  callback: (text: string) => void
) {

  const SpeechRecognition =
    window.webkitSpeechRecognition

  const recognition = new SpeechRecognition()

  recognition.lang = 'pt-BR'

  recognition.continuous = false

  recognition.interimResults = false

  recognition.onresult = (event: any) => {

    const text =
      event.results[0][0].transcript

    callback(text)
  }

  recognition.start()
}
