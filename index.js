require("dotenv").config();
const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");
const {
  joinVoiceChannel,
  createAudioResource,
  createAudioPlayer,
  getVoiceConnection,
} = require("@discordjs/voice");
const tts = require("google-translate-tts");
const { Readable } = require("stream");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_TOKEN = process.env.BOT_TOKEN;

client.once("ready", async () => {
  console.log("Ready!");

  const commandsData = [
    {
      name: "leave",
      description: "Leave the voice channel",
    },
    {
      name: "say",
      description: "Make the bot speak a message",
      options: [
        {
          name: "text",
          type: 3,
          description: "Text to be spoken",
          required: true,
        },
      ],
    },
  ];

  await new REST({ version: "10" })
    .setToken(BOT_TOKEN)
    .put(Routes.applicationCommands(client.user.id), { body: commandsData });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand() || interaction.channel.name !== "tts") return;

  const { commandName } = interaction;

  if (commandName === "leave") {
    if (interaction?.guild?.members?.me?.voice?.channel) {
      const connection = getVoiceConnection(
        interaction?.guild?.members?.me?.voice?.channel?.guild?.id
      );
      connection.destroy();
      await interaction.reply("Left the voice channel!");
    } else {
      await interaction.reply("I am not in a voice channel!");
    }
  } else if (commandName === "say") {
    let text = interaction.options.getString("text");
    const mentionRegex = /<@!?(\d+)>/g;

    text = text.replace(mentionRegex, (match, userId) => {
      const user = client.users.cache.get(userId);
      return user ? (user.globalName ? user.globalName : user.username) : match;
    });

    if (!interaction?.member?.voice?.channel?.joinable)
      return interaction.channel.send(
        "I need permission to join your voice channel!"
      );
    const connection = joinVoiceChannel({
      channelId: interaction?.member?.voice?.channel?.id,
      guildId: interaction?.member?.voice?.guild?.id,
      adapterCreator: interaction?.member?.voice?.guild?.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);
    const buffer = await tts.synthesize({
      text: text,
      voice: "hi",
      accent: "co.in",
    });
    const stream = Readable.from(buffer);
    const resource = createAudioResource(stream);
    player.play(resource);
    return interaction.reply(
      `${
        interaction?.member?.user?.globalName ||
        interaction?.member?.user?.username
      } said "${text}"`
    );
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || message.channel.name !== "tts") return;

  if (!message.content.startsWith("!")) {
    if (!message.member?.voice?.channel?.joinable)
      return message.channel.send(
        "I need permission to join your voice channel!"
      );
    const connection = joinVoiceChannel({
      channelId: message?.member?.voice?.channel?.id,
      guildId: message?.member?.voice?.guild?.id,
      adapterCreator: message?.member?.voice?.guild?.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);
    let text = message.content;
    const mentionRegex = /<@!?(\d+)>/g;

    text = text.replace(mentionRegex, (match, userId) => {
      const user = client.users.cache.get(userId);
      return user ? (user.globalName ? user.globalName : user.username) : match;
    });

    const buffer = await tts.synthesize({
      text: text,
      voice: "hi",
      accent: "co.in",
    });
    const stream = Readable.from(buffer);
    const resource = createAudioResource(stream);
    player.play(resource);
  }
});

client.login(BOT_TOKEN);
