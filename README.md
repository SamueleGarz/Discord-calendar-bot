# Discord Calendar bot
This bot was made as per request of a friend of mine and allows for quite a few tasks based on a calendar system he created.
The bot works on a calendar that is composed of 6 sequences, cycles and a hidden cycle, which is only known by the game master
or those authorized by who is running the bot.
The bot was created by using the **[discord.js guide](https://www.discordjs.guide/legacy)**

## Adding someone to the list of people who can see secret data
To add another user to the list of users that can receive ephimeral messages to see hidden data, follow these steps:
- Turn on developer mode in discord
- Copy the user id of the one / ones you want to add
- Add the user ids to "allowed users" in jsonData/data.json as strings (same as the already present ones)

## First exeution
Regardless of platform, for this bot to function you should:
- Rename SAMPLE_config.json to config.json
- Add the token and ClientId from you bot
- Add a GuildId for any server you intent do use as test server for the bot

To obtain the token, ClientId and GuildId you can follow the guide at:
- **[Token](https://www.discordjs.guide/legacy/preparations/app-setup)**
- **[ClientId and GuildId](https://www.discordjs.guide/legacy/app-creation/deploying-commands)**

## Windows execution
To host and run your bot on windows install node.js and use the start.bat file provided

## Linux execution
To run this bot on linux make sure to have npm installed and then run 'npm start'

## Credits
**Author**: SamueleGarz
Build with **[Discord.js](https://discord.js.org/)**
Database: **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)**
Based on the code in **[Discord.js Guide](https://www.discordjs.guide/legacy)**