"use client";

import { useInView } from "../hooks/useInView";

export interface ChatMessage {
  role: "user" | "assistant";
  name?: string;
  content: string;
  attachment?: {
    type: "video" | "image" | "file";
    name: string;
  };
}

interface ChatProps {
  messages: ChatMessage[];
  assistantName?: string;
  assistantIcon?: React.ReactNode;
  /** Tailwind gradient classes for assistant avatar, e.g. "from-blue-500 to-purple-600" */
  assistantGradient?: string;
}

function VideoIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function DefaultAssistantIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function AttachmentBadge({ attachment }: { attachment: ChatMessage["attachment"] }) {
  if (!attachment) return null;

  const Icon = attachment.type === "video"
    ? VideoIcon
    : attachment.type === "image"
    ? ImageIcon
    : FileIcon;

  return (
    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-primary-foreground/20">
      <Icon />
      <span className="text-xs opacity-80">{attachment.name}</span>
    </div>
  );
}

function formatContent(content: string) {
  return content.split("\n").map((line, i, arr) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

export function Chat({
  messages,
  assistantName = "Assistant",
  assistantIcon,
  assistantGradient = "from-blue-500 to-purple-600",
}: ChatProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className="my-8">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 bg-secondary/50 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm font-medium text-muted-foreground">
            Chat with {assistantName}
          </span>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
          {messages.map((message, index) => {
            const delay = index * 150;
            const isUser = message.role === "user";

            return (
              <div
                key={index}
                className={`flex gap-3 transition-all duration-300 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } ${isUser ? "justify-end" : "justify-start"}`}
                style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
              >
                {/* Assistant avatar */}
                {!isUser && (
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${assistantGradient} flex items-center justify-center text-white`}
                  >
                    {assistantIcon || <DefaultAssistantIcon />}
                  </div>
                )}

                {/* Message bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    isUser
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {message.attachment && (
                    <AttachmentBadge attachment={message.attachment} />
                  )}

                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {formatContent(message.content)}
                  </div>
                </div>

                {/* User avatar */}
                {isUser && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                    {message.name || "Me"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
