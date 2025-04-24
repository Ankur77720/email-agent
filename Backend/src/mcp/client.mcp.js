import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js"

const ai = new GoogleGenAI({ apiKey: config.GOOGLE_GEMINI_KEY });


const transport = new StdioClientTransport({
    command: "node",
    args: [ "./src/mcp/server.mcp.js" ]
});

const client = new Client(
    {
        name: "example-client",
        version: "1.0.0"
    }
);

await client.connect(transport).then(() => {
    console.log("Connected to MCP server")
})

export const getResponse = async ({ input, messages }) => {

    const tools = (await client.listTools()).tools;


    const prompt = `
        this is the current state of the conversation
        <chathistory>
        ${messages.map(message => {
        return `${message.role}: ${message.content}`
    }).join('\n')}
        </chathistory>
        
        <userinput>
        ${input}
        </userinput>
        `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            tools: [
                {
                    functionDeclarations: tools.map(tool => {
                        return {
                            name: tool.name,
                            description: tool.description,
                            parameters: {
                                type: tool.inputSchema.type,
                                properties: tool.inputSchema.properties
                            }
                        }
                    })
                }
            ],
            systemInstruction: `You are a helpful assistant. You can call tools to get information or perform actions. You can also ask the user for more information if needed.you are currently serving a user name Ankur prajapati with userid:- 680887623a729b61cb8295ab,
            
<important>

you are acting on behalf of Ankur prajapati 

so that when sending an email write the email as Ankur prajapati 

</important>
            
            `,
        },
    })



    const functionCall = response.candidates[ 0 ].content.parts[ 0 ].functionCall || response.candidates[ 0 ].content.parts[ 1 ]?.functionCall

    if (functionCall) {
        const toolResponse = await client.callTool({ name: functionCall.name, arguments: functionCall.args })

        console.log(toolResponse)

        return toolResponse.content[ 0 ].text
    } else {
        return response.candidates[ 0 ].content.parts[ 0 ].text
    }


    // const toolResponse = await client.callTool({ name: functionCall.name, arguments: functionCall.args })

    // console.log(toolResponse)
}


export default client;