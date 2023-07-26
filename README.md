# slidespeak-webapp

![slidespeak-banner-github](https://github.com/SlideSpeak/slidespeak-webapp/assets/5519740/90b8fb74-2f0d-40bc-8ecd-1e4d3a40847a)

SlideSpeak allows you to chat with your PowerPoint slides. Upload any PPTX file and ask questions about the content.

SlideSpeak was built with:

Frontend:

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Chat Stream](https://github.com/XD2Sketch/react-chat-stream)

The backend for this project is available here: [https://github.com/SlideSpeak/slidespeak-backend](https://github.com/SlideSpeak/slidespeak-backend)

## Requirments

_NOTE:_ This project requires the SlideSpeak backend to be up and running!

See [here](https://github.com/SlideSpeak/slidespeak-backend) on how to setup the backend.

## Getting Started

Make sure to have the environment variables set up correctly, you can copy the values from .env.local.example with the following command:

```bash
cp .env.local.example .env.local
```

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## License
See LICENSE file.
