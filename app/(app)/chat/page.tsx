"use client";
import { useState } from "react";
import { ClientMessage } from "./actions"; // Asegúrate de que esta referencia sea correcta
import { useActions, useUIState } from "ai/rsc"; // Agrego useChat aquí porque también lo estamos usando
import { useChat } from "ai/react";
import { generateId } from "ai";
import Icon from "@/components/icon";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BotIcon, SendIcon, UserIcon } from "@/components/icons";

export const maxDuration = 30;

function PageChat() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  const { messages, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      keepLastMessageOnError: true,
    });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: ClientMessage = {
      id: generateId(),
      role: "user",
      display: input,
    };

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      userMessage,
    ]);

    setInput(""); // Limpiar el input después de enviar el mensaje

    const message = await continueConversation(input);
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);

    handleSubmit(); // Llamada a handleSubmit de useChat
  };

  return (
    <section className="m-6">
      <div className="flex rounded-xl p-2 border flex-col h-[95vh] bg-white dark:bg-black">
        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-6 grid gap-4">
            <p className="text-center pt-16 text-9xl md:text-[10rem] lg:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-300 dark:to-neutral-700 inset-x-0">
              Chat
            </p>
            {conversation.map((message: ClientMessage) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "user" ? (
                  <>
                    <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-[70%]">
                      <p>{message.display}</p>
                    </div>
                    <Avatar className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center rounded-full">
                      <UserIcon className="w-6 h-6" />
                    </Avatar>
                  </>
                ) : (
                  <>
                    <Avatar className="w-10 h-10 bg-secondary text-secondary-foreground flex items-center justify-center rounded-full">
                      <Icon />
                    </Avatar>
                    <div className="bg-background border p-4 rounded-lg max-w-[70%]">
                      <p className="text-card-foreground">{message.display}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 bg-black/95 flex justify-center items-center gap-4">
          <Textarea
            placeholder="Escribe tu mensaje..."
            className="max-w-4xl bg-background text-foreground border focus:ring-0 resize-none"
            name="prompt"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              handleInputChange(event);
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          {!isLoading && (
            <Button size="chat" onClick={sendMessage} disabled={isLoading}>
              <SendIcon className="w-6 h-6" />
              <span className="sr-only">Send</span>
            </Button>
          )}
          {isLoading && (
            <div className="flex items-center gap-2">
              <Button size="chat" onClick={stop}>
                Stop
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageChat;
