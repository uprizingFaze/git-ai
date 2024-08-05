"use client";

import { useChat } from "ai/react";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BotIcon, SendIcon, UserIcon } from "@/components/icons";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });

  return (
    <section className="m-6">
      <div className="flex rounded-xl p-2 border flex-col h-[95vh] bg-white dark:bg-black">
        <div className="flex-1 overflow-auto p-6 grid gap-4">
          <p className="text-center pt-16 text-9xl md:text-[10rem] lg:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-300 dark:to-neutral-700 inset-x-0">
            Chat
          </p>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "user" ? (
                <>
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-[70%]">
                    <p>{message.content}</p>
                  </div>
                  <Avatar className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center rounded-full">
                    <UserIcon className="w-6 h-6" />
                  </Avatar>
                </>
              ) : (
                <>
                  <Avatar className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center rounded-full">
                    <BotIcon className="w-6 h-6" />
                  </Avatar>
                  <div className="bg-background border p-4 rounded-lg max-w-[70%]">
                    <p className="text-card-foreground">{message.content}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 flex items-center gap-4">
          <Textarea
            placeholder="Type your message..."
            className="flex-1 bg-background text-foreground border focus:ring-0 resize-none"
            name="prompt"
            value={input}
            onChange={handleInputChange}
          />
          <Button variant="ghost" size="icon" onClick={handleSubmit}>
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
