# Discord TTS Bot 🎙️

A simple Text-To-Speech (TTS) bot for Discord. It allows members to use commands or type in a specific channel to make the bot speak the given text in a voice channel.

## Features 🌟

- **Join Voice Channel**: The bot can join a voice channel.
- **Leave Voice Channel**: The bot can leave a voice channel.
- **Speak**: The bot can convert text to speech and speak it in a voice channel.
- **Mention Replacement**: Converts user mentions in the text to actual usernames.
- **Auto-Response in TTS Channel**: If a user sends a message in a channel named "tts", the bot automatically converts the text to speech and speaks it in the user's voice channel.
- **Automatic Join**: If a user types in the "tts" channel, the bot will auto-join the user's voice channel (if it's not already in one) and begin speaking.



## Prerequisites 📝

1. [Node.js](https://nodejs.org/)
2. [discord.js](https://discord.js.org/)
3. [google-translate-tts](https://www.npmjs.com/package/google-translate-tts)

## Setup ⚙️

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashesh3/discord-tts-bot
   ```

2. Navigate to the project directory:
   ```bash
   cd discord-tts-bot
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Update the `BOT_TOKEN` in the code with your Discord bot token.

5. Run the bot:
   ```bash
   node index.js
   ```

## Commands 🛠️

1. **/join** - Makes the bot join your current voice channel.
2. **/leave** - Makes the bot leave the current voice channel.
3. **/say [text]** - Converts the provided text to speech and plays it in the voice channel.

Alternatively, you can type your message in a channel named `tts` without any command to make the bot speak that message.

## Note 📌

- The bot needs permission to join voice channels.
- Make sure to grant the bot the required permissions when inviting it to your server.
- This bot is set to use Hindi (`hi`) voice with an Indian (`co.in`) accent. You can change this by modifying the respective parameters in the `tts.synthesize` method.

## Contributing 🤝

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License 📜

[MIT](LICENSE)

## Acknowledgements 🙏

- [discord.js](https://discord.js.org/)
- [google-translate-tts](https://www.npmjs.com/package/google-translate-tts)

---

Happy Coding! 🚀
