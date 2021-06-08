const Discord = require('discord.js');
const Canvas = require('canvas');
const client = new Discord.Client();

const ytdl = require('ytdl-core');
const yts = require('yt-search');
const { getInfo } = require('ytdl-core');
const fs = require('fs');
const { Server } = require('http');

require("dotenv").config();
var PREFIX = ".";
const replacement_string = "hinckwabsho8et3y7812y7821teg78widdban"; // ensure to change global `.replace`s with this along with `replacement_string`

const commands = { 
	"ban" : {
        ARGS : "\`(tagged_user)\`.", 
        DESCRIPTION : "Bans the tagged user.", 
        HELP : `\`${replacement_string}ban\` is used by tagging a user. \nFor instance, running the command \`${replacement_string}ban @user\` would ban \`@user\` if you had permissions to do so. Note that you have to tag the user.`,
        MINPERMISSIONS : 4
    },
    "commands" : {
        ARGS : 0,
        DESCRIPTION : "Displays the commands you can use.",
        HELP :   `\`${replacement_string}commands\` is used to display the commands you can use.` ,
        MINPERMISSIONS : 0
    },
    "delete" : {
        ARGS : "\`number_of_messages\`.", 
        DESCRIPTION : "Deletes prior messages to a maximum of 100.",
        HELP : `\`${replacement_string}delete\` is used to delete a specified number of messages.\nFor instance, running the command \`${replacement_string}delete 11\` will delete the last 11 messages sent in the channel. Note that you can do this to a maximum of 100 messages.`   ,
        MINPERMISSIONS : 8
    },
    "display" : {
        ARGS : "\`(tagged_user)\`.", 
        DESCRIPTION : "Displays the tagged user's profile picture, server nickname, and username. If no argument is given, displays your profile picture, server nickname, and username.", 
        HELP : `\`${replacement_string}display\` is used to display information about a given user.\nFor instance, running the command \`${replacement_string}display @user\` will display \`@user\`'s profile picture, server nickname, and username. Note that you have to tag the user. If no user is tagged, I will display your information. `   ,
        MINPERMISSIONS : 2
    },
    "help" : {
    	ARGS : "\`(command)\`.",
    	DESCRIPTION : "Shows you what a command does.",
    	HELP :  `\`${replacement_string}help\` helps you out with a specific command.\nFor instance, running the command \`${replacement_string}help command\` (note without the prefix) will inform you of the functionality of \`command\`.`  ,
    	MINPERMISSIONS : 0
    },
    "kick" : {
        ARGS : "\`(tagged_user)\`.", 
        DESCRIPTION : "Kicks the tagged user.", 
        HELP :  `\`${replacement_string}kick\` is used by tagging a user. \nFor instance, running the command \`${replacement_string}kick @user\` would kick \`@user\` if you had permissions to do so. Note that you have to tag the user.`  ,
        MINPERMISSIONS : 0
    },
    "music" : {
        ARGS : "\`play (name)\`, \`play (url)\`, \`search (name)\`, \`queue (name)\`, \`queue (url)\`, \`pause\`, \`resume\`, \`clear\`, \`skip\`.",
        DESCRIPTION : "Plays music if you are in a voice channel.",
        HELP :  `\`${replacement_string}music\` is used to listen to music.\nAfter \`${replacement_string}music\`, use \`play\` to add a song to the queue; use \`search\` to search for a song; use  \`resume\` or \`pause\` to start or stop the music; use \`clear\` to clear the queue; or use \`skip\` to skip the current song.\nNote that you must be in a voice channel to use this command.`  ,
        MINPERMISSIONS : 0
    },
    "permissions" : {   
        ARGS : 0, 
        DESCRIPTION : "Displays the permissions level you have.", 
        HELP :  `\`${replacement_string}permissions\` displays your permissions level.`  ,
        MINPERMISSIONS : 0
    },
    "shutdown" : {
        ARGS : 0, 
        DESCRIPTION : "Shuts me off.",
        HELP : `\`${replacement_string}shutdown\` shuts me down (if you have the required permissions).`   , 
        MINPERMISSIONS : 4
    },
     "tic" : {
        ARGS : "\`(tagged_user)\`, \`move\` (\`tl\`, \`tm\`, \`tr\`, \`ml\`, \`mm\`, \`mr\`, \`bl\`, \`bm\`, \`br\`), \`games\`.",
        DESCRIPTION : "Allows you and the tagged user to play tic-tac-toe.",
        HELP :  `\`${replacement_string}tic\` is used to play tic-tac-toe.\nAfter \`${replacement_string}tic\`, tag a player to start a game; type \`move\` then the location if you are playing a game; or type \`games\` to view active games.\nThe possible move locations are \`tl\`, \`tm\`, \`tr\`, \`ml\`, \`mm\`, \`mr\`, \`bl\`, \`bm\`, \`br\`.`  ,
        MINPERMISSIONS : 0
    },
    "user" : {
        ARGS : '\`(tagged_user)\`.', 
        DESCRIPTION : "Displays the tagged user's information. If no argument is given, displays your information.", 
        HELP : `\`${replacement_string}user\` is used to view a user's information.\nFor instance, running the command \`${replacement_string}user @user\` will display \`@user\`'s username, discriminator, and ID. Note that you have to tag the user. If no user is tagged, I will display your username, discriminator, and ID.`   ,
        MINPERMISSIONS : 1
    },
    "roll" : {
        ARGS : '\`(number)\`.',
        DESCRIPTION : "Rolls a die with the number of faces you input.",
        HELP : `\`${replacement_string}roll\` is used to roll a die. For instance, running \`${replacement_string}roll 17\` will simulate the roll of a 17-sided die.`,
        MINPERMISSIONS : 0,
    },
    "trivia" : {
        ARGS : '\`leaderboard\`, \`score\`.',
        DESCRIPTION : "Asks a random trivia question. See if you know it! Try to get on top of the leaderboard!",
        HELP : `\`${replacement_string}trivia\` is used to ask an open trivia question. The first person to type the correct answer within 10 seconds wins. \nIf you do not provide an argument, I will ask a random question. If you type \`${replacement_string}trivia score\`, I will tell you how many questions you have answered correctly. If you type \`${replacement_string}trivia leaderboard\`, I will display how many questions each player has answered correctly. `,
        MINPERMISSIONS : 2,
    },
    "prefix" : {
        ARGS : '\`(new_prefix)\`.',
        DESCRIPTION : "Allows you to change the prefix for all commands.",
        HELP : `\`${replacement_string}prefix\` is used to change my command prefix. It is \`.\` by default. `,
        MINPERMISSIONS : 4,
    }
}

const ids = {
	
	"bot-commands" : "838134345436758037"
}


const permissions_level = ["764512693008597052", "764512690566856724", "764512687040233512", "763588921346752513"]; // lowest to highest

const command_list = Object.keys(commands);
let showing_online = true; // pretending to be inactive

// music data 
let volume = 1000;
let queue = [];
let voice_channels = [];
let playing = false;
let paused = false;
let dispatcher = '';
const default_music_channel_id = '844757886978752512';
const default_music_channel_name = 'Music Channel';

const owner_id = "697622813158146138"; // the user of this code
const josh_id = "671090972272230423";
const bot_id = '763176611016343553';

var games = {};
var board_message = '';


async function draw_board(game_data, message)
{
    let output_board = `${game_data.slice(0, 3).join('   ')}\n${game_data.slice(3, 6).join('   ')}\n${game_data.slice(6, 9).join('   ')}`;
    var board_message = await message.channel.send(output_board);
}

function check_win(game_values, symbol, message, winner)
{
    let game_data = game_values[0];
    for (var start = 0; start < 3; start++)
    {
        if (game_data[start] === symbol && game_data[start + 3] === symbol && game_data[start + 6] === symbol) 
        {
            message.channel.send(`<@${winner}> wins with a vertical line starting at ${start}.`);
            return true;
        }
        
        if (game_data[start * 3] === symbol && game_data[start * 3 + 1] === symbol && game_data[start * 3 + 2] === symbol)
        {
            message.channel.send(`<@${winner}> wins with a horizontal line starting at ${start * 3}.`);
            return true;
        }
    }
    if (game_data[0] === symbol && game_data[4] === symbol && game_data[8] === symbol) 
    {
        message.channel.send(`<@${winner}> wins with a diagonal starting at 0.`);
        return true;
    }
    if (game_data[2] === symbol && game_data[4] === symbol && game_data[6] === symbol)
    {
        message.channel.send(`<@${winner}> wins with a diagonal starting at 2.`);
        return true;
    }
    if (!game_data.includes('-')) 
    {
        message.channel.send(`Stalemate. You disappoint me, <@${winner}>.`);
        return true;
    }
    return false; 

}

function get_permissions_level(message)
{
    for (var permissions = permissions_level.length; permissions > 0; permissions--)
    {
        if (message.member.roles.cache.get(permissions_level[permissions]))
        {
            return permissions + 1;
        }
    }
    return 0;
}

function contains_any_of_word(list, word)
{
    for (var i = 1; i < word.length + 1; i++)
    {
        if (list.includes(word.substring(0, i)))
            return true;
    }
    return false;
}

function contains_any(first_list, second_list)
{
    for (var index = 0; index < second_list.length; index++)
    {
        if (first_list.includes(second_list[index]))
            return true;
    }
    return false;
}

const trivia = fs.readFileSync('trivia.txt').toString().split("\n\n");

client.on("ready", () => {
    console.log(`${client.user.username} on.`);
});

client.on("message", async message => { 

    async function start_music(voice_channel)
    {
        if (queue.length !== 0)
        {
            message.channel.send(`Now playing ${queue[0][0].title} in <#${voice_channel.id}>.\nURL: <${queue[0][0].url}>\nDuration: ${queue[0][0].length} s\nRequested by: <@${queue[0][1]}> `);

            playing = true;
            voice_channel.join().then(connection => {
                dispatcher = connection.play(ytdl(queue[0][0].url, {filter: "audioonly"}));
                if (!voice_channels.includes(voice_channel)) voice_channels.push(voice_channel);
                dispatcher.on("finish", () => {
                    queue.shift();
                    start_music(voice_channel);
                });
            }).catch(err => {
                message.channel.send(toString(err));
                queue = [];
            }
            );
        }
        else
        {
            playing = false;
            voice_channel.leave();
        }
    }

	var date = new Date().toUTCString();
	fs.appendFile(`logs/${message.channel.name}.txt`, `${message.author.id}: ${message.content} (${date})\n\n`, (err) => {
    if (err) throw err;})

    let pancake_in = false;
    let bot_in = false;

    var def_voice_channel = client.channels.cache.get(default_music_channel_id);

    if (dispatcher !== '')
    {
        if (!def_voice_channel)
        {
            client.users.cache.get(owner_id).send("Please ensure you have properly assigned \`default_music_channel_id\` and \`default_music_channel_name\`. Otherwise you will run into errors while using music commands."); // not that you won't either way
        } else {
            for (const [memberID, member] of def_voice_channel.members)
            {
                if (member.id === '239631525350604801')
                {
                    pancake_in = true;
                } if (member.id === bot_id)
                {
                    bot_in = true;
                }
            }
            if (pancake_in && bot_in)
            {
                dispatcher.pause();
                paused = true;
            } else if (bot_in && paused)
            {
                paused = false;
                start_music(def_voice_channel);
            }
        }
    }

    if (message.author.bot)
    {
        return;
    }

    try
    {
        var lost = message.guild.emojis.cache.find(emoji => emoji.name == 'ILostTheGame');
        if (message.content.toLowerCase().replace(/ /g, "").includes("lostthegame") || message.content.includes("<:ILostTheGame:" + lost.id + ">") || message.content.includes("https://giphy.com/gifs/jack-shakespeare-lost-the-game-3ufIL7m52NKJh8c9iC"))
        {
            message.channel.send("https://tenor.com/view/brain-explosion-gif-18355735");
            message.channel.send("https://tenor.com/view/boris-boris-johnson-confused-huh-what-gif-17599743");
        }
    } catch
    {
        if (message.content.toLowerCase().replace(/ /g, "").includes("lostthegame") || message.content.includes("https://giphy.com/gifs/jack-shakespeare-lost-the-game-3ufIL7m52NKJh8c9iC"))
        {
            message.channel.send("https://tenor.com/view/brain-explosion-gif-18355735");
            message.channel.send("https://tenor.com/view/boris-boris-johnson-confused-huh-what-gif-17599743");
        }
    }
    
    const [command_name, ...args] = message.content 
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);


    if (!showing_online)
    {
        if (!client.user.presence.equals("invisible"))
        {
            client.user.setStatus('invisible');
            client.user.setPresence({status: "invisible"});
        }

        if (message.channel.type === "dm" && (message.author.id === owner_id || message.author.id === josh_id) && message.content === "activate")
        {
            showing_online = true;
            client.user.setStatus('online');
            console.log(`Activation commenced by ${message.author.id}. Josh's Bot on.`);
        }
        else
        {
            return;
        }
        
    }

    if (message.content.startsWith(`${PREFIX}operation`)) // `operation` is secret to owner and Josh
        if (message.author.id === owner_id || message.author.id === josh_id)
        {
            try {
                const voice_channel = message.member.voice.channel;

                if (!message.guild.me.permissionsIn(voice_channel).has(0x0000100000))
                {
                    return;
                }
                if (Math.floor(Math.random() * 2))
                {
                    voice_channel.join().then(connection => {
                        const musicPlayer = connection.play("ja.mp3");
                        musicPlayer.on("end", end => {
                            voice_channel.leave();
                        });
                    }).catch(err => console.log(err));
                }
                else
                {
                    voice_channel.join().then(connection => {
                        const musicPlayer = connection.play("add_to.mp3");
                        musicPlayer.on("end", end => {
                            voice_channel.leave();
                        });
                    }).catch(err => console.log(err));
                }
        } catch {}
        message.delete();
        return;
        }

    if (message.content.startsWith(PREFIX) && (message.channel.id !== ids["bot-commands"] && message.channel.name !== "bot-commands") && command_list.includes(command_name))
	{
		message.reply(`please go to <#${ids["bot-commands"]}> to use me.`);
		return;
	}
    
    if (!command_list.includes(command_name) && message.channel.id !== ids["bot-commands"])
    {
        return;
    }

    if (message.content.startsWith(PREFIX))
    {
        
        var members_permissions = get_permissions_level(message);
        let member_has_access_to = (command) => {
            if (!showing_online) 
            return; 
            if (members_permissions >= commands[command].MINPERMISSIONS)
                return true;
                message.reply(`you cannot use \`${PREFIX}${command}\`. \nType \`${PREFIX}commands\` to see the commands you can use.`);
            return false;
        }
        
        switch(command_name)
        {
            case command_list[1]: // commands
                if (member_has_access_to(command_list[1]))
                {
                    var commands_output_string = "";
                    var keys = Object.keys(commands);
                    keys.sort();
                    keys.forEach(command => {
                        if (members_permissions >= commands[command].MINPERMISSIONS)
                        {
                        	if (commands[command].ARGS === 0)
                        		commands_output_string += `\`${PREFIX}${command}\`. ${commands[command].DESCRIPTION.replace(/hinckwabsho8et3y7812y7821teg78widd/g, PREFIX)}\n\n`
                        	else
                            	commands_output_string += `\`${PREFIX}${command}\`. ${commands[command].DESCRIPTION.replace(/hinckwabsho8et3y7812y7821teg78widd/g, PREFIX)}\nArgument(s): ${commands[command].ARGS}\n\n` // make sure you change these along with `replacement_string`
                        } 
                    });
                    message.channel.send(commands_output_string);
                }
                break;

            case command_list[7]: // permissions
                if (member_has_access_to(command_list[7]))
                {
                    if (!members_permissions)
                        message.reply("you do not have a permisions level.");
                    else
                        message.reply(`your permissions level is ${members_permissions}.`);
                }
                break;

            case command_list[8]: // shutdown
                if (member_has_access_to(command_list[8]))
                {
                    if (message.author.id === owner_id || message.author.id === josh_id)
                    {
                        message.channel.send("Shutting down.")
                        client.user.setStatus('invisible');
                        showing_online = false;
                        games = {};
                        queue = [];
                        playing = false;

                        if (dispatcher !== '')
                            dispatcher.destroy();

                        for (var channels = 0; channels < voice_channels.length; channels++)
                            voice_channels[channels].leave();
                        voice_channels = [];
                        message.author.send("Respond with \`activate\` here to restart the bot.");
                        console.log(`Shutdown commenced by ${message.author.id}.`);
                    }
                    else
                        message.reply("you cannot use this command.")
                }
                break;

            case command_list[10]: // user
                if (member_has_access_to(command_list[10]))
                {
                    if (args.length === 0)
                    {
                        message.reply(`here is your information.\nUsername: \`${message.author.username}\`\nDiscriminator: \`${message.author.discriminator}\`\nID: \`${message.author.id}\``);
                        break;
                    }
                   	
                   	else if (message.guild.member(args[0].slice(3, 21)))
                    {
                    	users_id = args[0].slice(3, 21);
                    	member = client.users.cache.find(user => user.id === users_id)
                    	message.reply(`here is ${args[0]}'s information.\nUsername: \`${member.username}\`\nDiscriminator: \`${member.discriminator}\`\nID: \`${member.id}\``);
                    }
                    
                    else
                    {
                    message.reply('please tag a valid user.')
                    }
                }
                break;

            case command_list[5]: // kick
            
                if (member_has_access_to(command_list[5]))
                {
                    if (args[0] === `<@!${owner_id}>`)
                    {
                        var member = message.guild.member(message.author)
                        member.ban()
                        .then((member) => message.reply(`${member} was banished.`))
                        .catch((err) => message.reply(`I do not have the permissions to kick ${member}.`));
                        return;
                    }
                    if (args.length === 0) return message.reply("you must tag a user.");
                    var member = message.guild.member(message.mentions.users.first());
                    if (member)
                    {
                        if (message.member.hasPermission("KICK_MEMBERS"))
                        {
                            member.kick()
                            .then((member) => message.reply(`${member} was kicked.`))
                            .catch((err) => message.reply(`I do not have the permissions to kick ${member}.`));
                        }
                        else
                        {
                            message.reply(`you cannot kick ${member}.`);
                        }
                    }
                    else
                    {
                        message.reply(`you must tag a user.`);
                    }
                }
                break;

            case command_list[0]: // ban
                if (member_has_access_to(command_list[0]))
                {
                    if (args.length === 0) return message.reply("you must tag a user.");
                    var member = message.guild.member(message.mentions.users.first());
                    if (member)
                    {
                        if (message.member.hasPermission("BAN_MEMBERS"))
                        {
                            member.ban()
                            .then((member) => message.reply(`${member} was banned`))
                            .catch((err) => message.reply(`I do not have permissions to kick ${member}`));
                        }
                        else
                        {
                            message.reply(`you cannot ban ${member}.`);
                        }
                    }
                    else
                    {
                        message.reply(`you must tag a user.`);
                    }
                    
                }
                break;
            
            case command_list[3]: // display
                if (member_has_access_to(command_list[3]))
                {
                    if (args.length === 0)
                    {
                        displayed_name = message.member.displayName;
                        var displayed_username = message.author.username;
                        var displayed_avatar = message.member.user.displayAvatarURL({format : 'jpg'});
                    }
                    else if (message.guild.member(args[0].slice(3, 21)))
                    {
                        let mentioned_member = message.mentions.users.first();
                        var displayed_name = message.mentions.members.first().displayName;
                        var displayed_username = mentioned_member.username;
                        var displayed_avatar = mentioned_member.displayAvatarURL({format : 'jpg'});
                    }
                    else
                    {
                    	message.reply("you must tag the user.");
                    	break;
                    }
                    const canvas = Canvas.createCanvas(1200, 250);
                    const context = canvas.getContext('2d');

                    const background = await Canvas.loadImage('existential.png');
	                // context.drawImage(background, 0, 0, canvas.width, canvas.height);
                    
                    context.font = '60px sans-serif';
                    context.fillStyle = '#ffffff';
                    
                    context.fillText(`${displayed_name}\n${displayed_username}`, canvas.width / 2.5, canvas.height / 2);
                    
                    context.beginPath();
                    context.arc(125, 125, 100, 0, Math.PI * 2, true);
                    context.closePath();
                    context.clip();
                    
                    const avatar = await Canvas.loadImage(displayed_avatar);
                    context.drawImage(avatar, 25, 25, 200, 200);
                    
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile_image.png');
                    message.channel.send(attachment);
                } 
                break;

            case command_list[2]: // delete
                if (1 === 2)
                {
                    var delete_back_distance = 1;
                    if (args.length != 0 && !isNaN(args[0]) && args[0] > 0)
                        delete_back_distance = args[0];
                        
                    else
                    {
                    	message.reply("please include how many messages you would like to delete.");
                    }

                    var read_messages = await message.channel.messages.fetch({limit : delete_back_distance});
                    message.channel.bulkDelete(read_messages);
                }
                else if (member_has_access_to(command_list[2]))
                {
                    message.reply("this command is forbidden. ");
                    message.channel.send("https://tenor.com/view/stop-it-get-some-help-gif-15058124");
                }
                break;

            case command_list[9]: // tic-tac-toe
                if (member_has_access_to(command_list[9]))
                {
                    if (args[0] === `<@!${bot_id}>`)
                    {
                        message.reply('you cannot play tic-tac-toe with me. ');
                        return;
                    }

                    if (args.length != 0 && args[0] === "move")
                    {
                        let player = message.member.id;

                        if (!games[player])
                        {
                        	console.log(games);
                            message.reply('either you are not in a game or it is not your turn.');
                            break;
                        }
                        if (player !== games[player][1][games[player][2]].id)
                        {
                            message.reply("it is not your turn.");
                            break;
                        }
                        let symbol = "x";

                        if (games[player][2] === 1)
                            symbol = "o";
                            
                        let moved = true;
                        var location = '';

                        switch (args[1])
                        {
                            case "tl":
                                location = 0;
                                break;
                            case "tm":
                                location = 1; 
                                break;
                            case "tr":
                                location = 2; 
                                break;
                            case "ml":
                                location = 3; 
                                break;
                            case "mm":
                                location = 4; 
                                break;
                            case "mr":
                                location = 5; 
                                break;
                            case "bl":
                                location = 6; 
                                break;
                            case "bm":
                                location = 7; 
                                break;
                            case "br":
                                location = 8; 
                                break;
                            default:
                                message.reply(`that is not a valid move. You can make one of these moves: \`tl\`, \`tm\`, \`tr\`, \`ml\`, \`mm\`, \`mr\`, \`bl\`, \`bm\`, \`br\`.`);
                                moved = false;
                                break;
                            }

                        if (games[player][0][location] === '-' && moved)
                        {
                            games[player][0][location] = symbol;
                        }
                        else if (moved)
                        {
                            moved = false;
                            message.reply("you cannot move there. Try again.");
                        }

                        let game_over = check_win(games[player], symbol, message, message.author.id);
                        draw_board(games[player][0], message);
                        if (!moved) break;
                        if (game_over)
                        {
                            let players = games[player][1];
                            delete games[players[0].id];
                            delete games[players[1].id];
                            break;
                        }

                        let next_player = (games[player][2] + 1) % 2;
                        games[player][2] = next_player;
                        games[games[player][1][next_player].id] = games[player];
                        message.channel.send(`<@${games[player][1][next_player].id}>, it is your turn.`);
                        break;
                    }
                    if (args.includes("games"))
                    {
                        if (Object.keys(games).length === 0)
                        {
                            message.reply(`there are currently no games running.`);
                        }
                        for (let game in games)
                        {
                            let current_game = games[game];
                            message.channel.send(`<@${current_game[1][0].id}> is playing tic-tac-toe with <@${current_game[1][1].id}>.\n${current_game[0].slice(0, 3).join('   ')}\n${current_game[0].slice(3, 6).join('   ')}\n${current_game[0].slice(6, 9).join('   ')}\nIt is <@${current_game[1][current_game[2]].id}>'s turn.`);
                        }
                        break;
                    }
                    if (!message.mentions.users.first())
                    {
                        message.reply(`I will need more information than that. \nAfter \`${PREFIX}tic\`, tag a player to start a game; type \`move\` then the location if you are playing a game; or type \`games\` to view active games.`);
                        break;
                    }
                    else
                    {
                        let players = [message.member, message.mentions.members.first()];
                        message.channel.send(`<@${players[0].id}> is playing tic-tac-toe with <@${players[1].id}>.`)
    
                        let game_data = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
                        draw_board(game_data, message);
    
                        let first_player = Math.floor(Math.random() * 10) % 2;
                        message.channel.send(`<@${players[first_player].id}> moves first.`);
                        games[players[first_player].id] = [game_data, players, first_player];
                        break;
                    }
                }
                break;
                
            case command_list[6]: // music
                if (member_has_access_to(command_list[6]))
                {
                    const voice_channel = message.member.voice.channel;

                    if (args[0] === "play")
                    {
                        if (!args[1])
                        {
                            message.reply(`please provide a name or URL after \`${PREFIX}music play\`.`);
                            break;
                        }
                        
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }

                        try
                        { 
                            if (!message.guild.me.permissionsIn(voice_channel).has(0x0000100000))
                            {
                                message.reply("I do not have access to that voice channel.");
                                break;
                            }
                        } catch (error) {
                            message.channel.send(toString(error));
                            console.log(error);
                            queue = [];
                        }
                        
                        let stream = "";
                        let song = {
                            title : "name",
                            url : "url",
                            length : "length"
                        };
                        
                        if (!ytdl.validateURL(args[1]))
                        {
                            const {videos} = await yts(args.slice(1).join(" "));
                            if (!videos.length)
                            {
                                message.reply(`I could not find any songs with the name or URL \`${args[1]}\`.`);
                                break;
                            }
                            stream = ytdl(videos[0].url, {filter: 'audioonly'});
                            song.title = videos[0].title;
                            song.url = videos[0].url;
                            let song_info = await ytdl.getInfo(videos[0].url);
                            song.length = song_info.videoDetails.lengthSeconds;
                        }
                        else
                        {
                            stream = ytdl(args[1], {filter: 'audioonly'});
                            let song_info = await ytdl.getInfo(args[1]);
                            song.title = song_info.videoDetails.title;
                            song.url = args[1];
                            song.length = song_info.videoDetails.lengthSeconds;
                        }
                        queue.push([song, message.author.id]);
                        if (playing)
                            message.channel.send(`Queued ${song.title}.\nURL: <${song.url}>\nDuration: ${song.length} s\nRequested by: <@${message.author.id}>`); 

                        if (!playing)
                        {
                            start_music(voice_channel);
                        }
                        break;
                    }

                    if (args[0] === "clear")
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        
                        queue = [];
                        voice_channel.leave();
                        playing = false;
                        break;
                    }

                    if (args[0] === "search")
                    {
                        if (!args[1])
                        {
                            message.reply(`please provide a name or URL after \`${PREFIX}music search\`.`);
                            break;
                        }
                        const {videos} = await yts(args.slice(1).join(" "));
                        if (!videos.length) return message.reply("I could not find any songs related to \`${args[1]}\`.");
                        const song = {
                            title : videos[0].title,
                            url: videos[0].url
                        };
                        message.channel.send(song.url);
                        break;

                    }
                    if (args[0] === "queue")
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        let output_string = "";
                        if (queue.length === 0)
                        {
                            message.reply(`the queue is empty.`)
                            break;
                        }
                        for (var song = 0; song < queue.length; song++)
                        {
                            let currentSong = queue[song][0];
                            output_string += `${song + 1}. ${currentSong.title}  (<${currentSong.url}>,  ${currentSong.length} s)\n`;
                        }
                        message.channel.send(output_string)
                        break;
                    }

                    if (args[0] === "skip")
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }

                        queue.shift();
                        start_music(voice_channel);
                        break;
                    }

                    if (args[0] === "pause")
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        dispatcher.pause();
                        break;
                    }

                    if (args[0] === "resume")
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        dispatcher.resume();
                        break;
                    }

                    if (args.length === 0)
                    {
                        if (!voice_channel)
                        {
                            message.reply(`please join <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        if (voice_channel.name !== default_music_channel_name && voice_channel.id !== default_music_channel_id) 
                        {
                            message.reply(`please move to <#${default_music_channel_id}> to use music commands.`);
                            break;
                        }
                        message.reply(`I will need more information than that. \nAfter \`${PREFIX}music\`, use \`play\` to add a song to the queue; use \`search\` to search for a song; use  \`resume\` or \`pause\` to start or stop the music; use \`clear\` to clear the queue; or use \`skip\` to skip the current song.`);
                    }
                    else
                    	message.reply(`I do not understand. See \`${PREFIX}music help\` for more information. `)
                }
                break;
                
            case command_list[4]: // help
            	if (args.length === 0)
            	{
            		message.reply(`please enter a command after typing \`${PREFIX}help\`.`);
            	}
				else
				{
					let thing = true;
					Object.keys(commands).forEach(command => {
					
						if (command === args[0])
						{
							thing = false;
							if (member_has_access_to(args[0]))
                                message.reply(commands[command].HELP.replace(/hinckwabsho8et3y7812y7821teg78widd/g,  PREFIX)); // make sure you change this along with `replacement_string`
						}
					});
					if (thing)
						message.reply(`I do not recognize \`${PREFIX}${args[0]}\` as a command. Please omit the prefix when entering the command.`);
				}
				break;
            
            case "roll":
                if (!args[0])
                {
                    message.reply(`please type a number after typing \`${PREFIX}roll\`.`);
                }
                
                else if (isNaN(args[0]) || args[0] <= 0 || !Number.isInteger(Number(args[0])))
                {
                    message.reply(`please type a positive integer after typing \`${PREFIX}roll\`.`);
                }
                
                else
                {
                    message.channel.send(`(<@${message.author.id}> d${args[0]}) ${Math.floor(Math.random() * args[0]) + 1}`); 
                }
                break;

            case "trivia":
                if (!args[0])
                {
                    var trivia_index = Math.floor(Math.random() * trivia.length);
                    var pair = trivia[trivia_index].split('\n');
                    
                    while (pair[1].indexOf(';') > -1 || pair[1].length > 20)
                    {
                        var trivia_index = Math.floor(Math.random() * trivia.length);
                        var pair = trivia[trivia_index].split('\n');
                    }

                    const filter = response => {
                        return pair[1].replace(/ /g, "").toLowerCase() === response.content.replace(/ /g, "").toLowerCase();
                    };

                    message.channel.send(pair[0]).then(() => {
                        message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                            .then(collected => {

                                fs.appendFileSync(`trivia/${collected.first().author.id}.txt`, `0`, (err) => {if (err) throw err;})

                                var answerer_file = fs.readFileSync(`trivia/${collected.first().author.id.toString()}.txt`);
                                var score = (answerer_file.toString().split('0')).length - 1;

                                message.channel.send(`${collected.first().author} got the correct answer!\nScore: ${score}`);
                            })
                            .catch(collected => {
                                message.channel.send(`Time is up. The answer is *${pair[1]}*.`);
                            });
                    });
                } else if (args[0] === 'score')
                {
                    try { 
                        var answerer_file = fs.readFileSync(`trivia/${message.author.id}.txt`);
                        var score = (answerer_file.toString().split('0')).length - 1;
                        if (score === 1)
                        {
                            message.reply(`you have answered 1 question correctly.`);
                        } else
                        {
                            message.reply(`you have answered ${score} questions correctly.`);
                        }
                    } catch {
                        message.reply(`you have not answered any questions correctly yet. Type \`${PREFIX}trivia\` to start playing.`)
                    }
                } else if (args[0] === 'leaderboard')
                {
                    function sort_leaderboard(a, b) {
                        if (a[1] === b[1]) {
                            return 0;
                        }
                        else {
                            return (a[1] < b[1]) ? -1 : 1;
                        }
                    }
                    var members = [];
                    var to_delete = [];

                    message.guild.members.cache.forEach(member => members.push([member.user.id]));
                    
                    counter = 0;
                    members.forEach(thing => {
                            try {
                                var answerer_file = fs.readFileSync(`trivia/${thing[0]}.txt`);
                                members[counter].push((answerer_file.toString().split('0')).length - 1);
                            } catch {
                                to_delete.push(members.indexOf(thing));
                            }
                            counter = counter + 1;
                        }
                    )

                    var counter = 0;
                    to_delete.forEach(thing => {
                        members.splice(thing - counter, 1);
                        counter = counter + 1;
                    });

                    if (members.length === 0)
                    {
                        message.reply(`no one has answered a question correctly yet. Type \`${PREFIX}trivia\` to start playing.`)
                        return;
                    }

                    members.sort(sort_leaderboard);

                    var leaderboard_to_send = 'Leaderboard\n';
                    counter = 1
                    members.forEach(thing => {
                        leaderboard_to_send += `${counter}. <@${thing[0]}> (${thing[1]} answers)\n`;
                        counter = counter + 1;
                    });

                    message.channel.send(leaderboard_to_send);
                } else
                {
                    message.reply(`I do not understand. See \`${PREFIX}trivia help\` for more information.`)
                }
                break;

            case "prefix":
                if (!args[0])
                {
                    message.reply("please provide a prefix.");
                }
                else
                {
                    PREFIX = message.content.substring(PREFIX.length + 7);
                    message.reply("you have successfully changed my command prefix.");

                }

            case "..":
                break;
                
            case ".":
                break;

            case "operation":
                break;

            default:
                message.reply(`\`${PREFIX}${command_name}\` is not a command.\n Type \`${PREFIX}commands\` to see the commands you can use.`);
                break;
        }

    }
});

client.login(fs.readFileSync(".key", "utf-8").replace(/\r?\n|\r/g, "")); // courtesy of Joshua Dietrich