const Discord = require('discord.js'); // Ensure that discord.js is reachable
require('dotenv').config();

// Initialize discord client using basic constructor
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
});

// Print to the terminal when the bot comes online
client.on('ready', () => {
    console.log('DiscordTestBot is online!');
});

// Whenever a user send a message "Hello", the bot will reply with "Hi"
client.on('message', (msg) => {
    if (msg.content == 'Hello') msg.reply('Hi');
});

const jokes = [
    'I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k. It was a trip down Memory Lane.',
    '“Debugging” is like being the detective in a crime drama where you are also the murderer.',
    'The best thing about a Boolean is that even if you are wrong, you are only off by a bit.',
    'A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t.',
    'If you listen to a UNIX shell, can you hear the C?',
    'Why do Java programmers have to wear glasses? Because they don’t C#.',
    'What sits on your shoulder and says “Pieces of 7! Pieces of 7!”? A Parroty Error.',
    'When Apple employees die, does their life HTML5 in front of their eyes?',
    'Without requirements or design, programming is the art of adding bugs to an empty text file.',
    'Before software can be reusable it first has to be usable.',
    'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.',
    'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
    'There are two ways to write error-free programs; only the third one works.',
  ];

// Whenever a user send a message "?joke", the bot will reply with a random joke from an array of jokes
client.on('message', (msg) => {
    if (msg.content === '?joke') {
        // Obtain a random joke from an array of jokes, and send that back to the channel
        msg.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
    }
});

// NOT WORKING Add reaction-role feature
client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch(); // Is the message "partial", if so, store it in the JS map
    if (reaction.partial) await reaction.fetch(); // Is the reaction "partial", if so, store it in the JS map
    if (user.bot) return; // Is the user that reacted a bot?
    if (!reaction.message.guild) return; // If message not found on the server, drop out of the function

    // Check only the necessary channel
    if (reaction.message.channel.id == '462733941594521602') {
        // If the reaction is for the jack o lantern, get the user id, and add them to the Test #1 role
        if (reaction.emoji.name === ':jack_o_lantern:') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('850065546283843655');
        }
        // If the reaction is for the 8 ball, get the user id, and add them to the Test #2 role
        if (reaction.emoji.name === ':8ball:') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('850065582934065223');
        }
    } else return; // No valid reaction, nothing to do
});

// NOT WORKING Remove reaction-role feature
client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch(); // Is the message "partial", if so, store it in the JS map
    if (reaction.partial) await reaction.fetch(); // Is the reaction "partial", if so, store it in the JS map
    if (user.bot) return; // Is the user that reacted a bot?
    if (!reaction.message.guild) return; // If message not found on the server, drop out of the function

    // Check only the necessary channel
    if (reaction.message.channel.id == '462733941594521602') {
        // If the reaction is for the jack o lantern, get the user id, and remove them from the Test #1 role
        if (reaction.emoji.name === ':jack_o_lantern:') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('850065546283843655');
        }
        // If the reaction is for the 8 ball, get the user id, and remove them from the Test #2 role
        if (reaction.emoji.name === ':8ball:') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('850065582934065223');
        }
    } else return; // No valid reaction, nothing to do
});


// Login to the client using the Discord bot token
// This must be the last line in the file
client.login(process.env.BOT_TOKEN);