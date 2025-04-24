import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import mongoose from "mongoose";
import fs from "fs";
import { z } from "zod";
import googleService from "../services/google.service.js"


mongoose.connect("mongodb://localhost:27017/kodr-email-agent").then(() => {
    console.log("Connected to MongoDB")
})


const server = new McpServer({
    name: "example-server",
    version: "1.0.0"
});

server.tool("sendmail", "send a mail to a emailaddress", {
    userid: z.string(),
    to: z.string(),
    subject: z.string(),
    message: z.string()
}, async ({ userid, to, subject, message }) => {
    try {
        await googleService.sendEmail(userid, to, subject, message)

        return {
            content: [
                {
                    type: "text",
                    text: "Mail sent successfully"
                }
            ]
        }
    } catch (err) {
        console.log(err)

        fs.writeFileSync("./error.txt", `${err}`)

        return {
            content: [
                {
                    type: "text",
                    text: `Error sending mail: ${err}`
                }
            ]
        }

    }
});

server.tool('fetchmails', "fetch latest emails", {
    userid: z.string(),
    maxCount: z.number().default(10)
}, async ({ userid, maxCount }) => {
    try {
        const emails = await googleService.fetchEmails(userid, maxCount)
        return emails
    } catch (err) {
        console.log(err)
        return "Error fetching emails"
    }
});

server.tool('createevent', "create a calendar event", {
    userid: z.string(),
    start: z.string(),
    end: z.string(),
    summary: z.string(),
    description: z.string().optional()
}, async ({ userid, start, end, summary, description }) => {
    try {
        const event = await googleService.createEvent(userid, start, end, summary, description)
        return event
    } catch (err) {
        console.log(err)
        return "Error creating event"
    }
})

const transport = new StdioServerTransport();
await server.connect(transport);