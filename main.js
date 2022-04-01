var discord = require("discord.js-selfbot")
var rl = require("readline-sync")
var fs = require("fs")

var client = new discord.Client()
var token = rl.question("discord token: ")
var terpilas = []
var reacts = ["🇹", "🇪", "🇷", "🇵", "🇮", "🇱", "🇦"]
var lasttime = Date.now()
var interval = 5000

fs.readFile("./terpilas.json", (error, data) =>
{
    if(!error)
    {
        try
        {
            terpilas = JSON.parse(data)
        }
        catch(e)
        {
            console.log("[TERPILAMOD]: конфиг не загружен! " + e )
        }
    }
})

client.on("ready", () =>
{
    console.clear()
    console.log("[TERPILAMOD] by amfero\nUsage: $terpilamod @user\n")
})

client.on("message", (msg) =>
{
    if(msg.author.id == client.user.id) 
    {
        if(msg.content.toLowerCase().startsWith("$terpilamod") && msg.mentions.users.first() != null)
        {
            terpilaManager(msg)
        }
    }

    if(terpilas.includes(msg.author.id) && Date.now() > lasttime + interval)
    {
        terpilaReact(msg)
        var log = `[TERPILAMOD]: guild: ${msg.guild.name}, channel: ${msg.channel.name}, user: ${msg.author.username}#${msg.author.discriminator}, message: ${msg.content}`
        console.log(log)
        lasttime = Date.now()
    }
})

client.login(token)

function terpilaReact(msg)
{
    for(var i = 0; i < reacts.length; i++)
    {
        try
        {
            msg.react(reacts[i])
        }
        catch(e)
        {
            console.log("[TERPILAMOD]: error!")
        }
    }
}

function terpilaManager(msg)
{
    var nigger = msg.mentions.users.first().id

    if(!terpilas.includes(nigger))
    {
        terpilas.push(nigger)
        msg.edit(`[TERPILAMOD]: Enabled for <@${nigger}>`)
    }
    else
    {
        terpilas.splice(terpilas.indexOf(nigger), 1)
        msg.edit(`[TERPILAMOD]: Disabled for <@${nigger}>`)
    }

    var data = JSON.stringify(terpilas, 0, 2)
    fs.writeFile( "./terpilas.json", data, (error) =>
    {
        if(error) console.log("[TERPILAMOD]: конфиг не сохранен! " + e )
    })
}