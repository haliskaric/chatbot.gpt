import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"

// Load the .env file
config()

// Instantiate the OpenAI API with your API key
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))

// Define a function to start the chat
async function startChat() {
    // Set up a prompt for the chatbot
    let prompt = "Hello, I'm a chatbot. How can I assist you today?"

    // Send a message to the chatbot and receive a response
    const response = await openai.createChatCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5
    })

    // Print the bot's response
    console.log(response.messages[0].text)

    // Start a chat session with the user
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readline.prompt()

    readline.on('line', async (input) => {
        prompt += `\nUser: ${input}`
        const response = await openai.createChatCompletion({
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5
        })
        prompt += `\nBot: ${response.messages[0].text}`
        console.log(`Bot: ${response.messages[0].text}`)
        readline.prompt()
    })
}

// Call the startChat function
startChat()

console.log(process.env.API_KEY)