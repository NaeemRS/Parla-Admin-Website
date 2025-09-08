"use client"
import React, { useState, useContext } from "react";
import { Phone, Video, MoreVertical, Plus, Send, Smile } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";

export default function page() {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState(1);

  const { theme } = useContext(ThemeContext);

  const conversations = [
    {
      id: 1,
      name: "kevin.eth",
      time: "11:26",
      typing: true,
      avatar: "/images/softthrive.svg",
      unread: false,
    },
  ];

  const allChats = {
    1: [
      { id: 1, text: "Nah, it's crazy 😂", time: "15:19 PM", isSent: false },
      { id: 2, text: "Cheating?", time: "15:20 PM", isSent: false },
      { id: 3, text: "Actually yes, lemme see..", time: "", isSent: true },
      { id: 4, text: "Done, I just finished it!", time: "", isSent: true },
      { id: 5, text: "👍👍", time: "", isSent: true },
      { id: 6, text: "No way, lol", time: "", isSent: true },
      { id: 7, text: "I'm a pro, that's why 😎", time: "15:20 PM", isSent: true },
      { id: 8, text: "Still, can't believe 😅", time: "15:21 PM", isSent: false },
    ],
  };

  const currentChat = allChats[activeChat] || [];
  const currentUser = conversations.find((conv) => conv.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  return (
    <>
         <Header
         className="hidden"
        title={t('sidebar.message')}
        buttonLabel={' '}
        // onButtonClick={""}
        // onSearch={handleSearch} // Pass search handler to Header
      />

    <div
      className={`flex h-screen ${
        theme === "dark" ? "text-white bg-[#202020]" : "text-[#6B6B6B] bg-[#EEEEEE]"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-88 border-r ${
          theme === "dark" ? "bg-[#202020] border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex space-x-4">
            <div className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
              In-house
            </div>
            <button
              className={`${
                theme === "dark" ? "text-white" : "text-[#6B6B6B]"
              } hover:text-orange-500`}
            >
              User
            </button>
            <button
              className={`${
                theme === "dark" ? "text-white" : "text-[#6B6B6B]"
              } hover:text-orange-500`}
            >
              Partner
            </button>
          </div>
        </div>

        {/* New messages indicator */}
        <div
          className={`flex items-center justify-center p-3 ${
            theme === "dark" ? "bg-[#2A2A2A]" : "bg-gray-50"
          }`}
        >
          <span
            className={`text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            6 new messages
          </span>
        </div>

        {/* Conversations */}
        <div className="overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveChat(conv.id)}
              className={`flex items-center p-3 cursor-pointer ${
                activeChat === conv.id
                  ? theme === "dark"
                    ? "bg-[#202020] border-r-2 border-orange-500"
                    : "bg-orange-50 border-r-2 border-orange-500"
                  : theme === "dark"
                  ? "hover:bg-[#2A2A2A]"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="w-10 h-10 mr-3">
                <img src={conv.avatar} className="w-12 h-12 rounded-full" alt="" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-medium truncate ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {conv.name}
                  </h3>
                  <span
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {conv.time}
                  </span>
                </div>
                <p
                  className={`text-xs truncate ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {conv.typing
                    ? `${conv.name} is typing...`
                    : conv.status || "Last message preview..."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center">
            <img
              src={currentUser.avatar}
              className="w-12 h-12 rounded-full mr-3"
              alt=""
            />
            <div>
              <h3 className={theme === "dark" ? "text-white" : "text-gray-900"}>
                {currentUser?.name}
              </h3>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {currentUser?.typing
                  ? `${currentUser.name} is typing...`
                  : currentUser?.status || "Online"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"
              }`}
            >
              <Phone
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"
              }`}
            >
              <Video
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"
              }`}
            >
              <MoreVertical
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat.length > 0 ? (
            currentChat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isSent
                      ? "bg-[#00000060] text-white"
                      : theme === "dark"
                      ? "bg-[#2A2A2A] text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.time && (
                    <p
                      className={`text-xs mt-1 ${
                        msg.isSent
                          ? "text-orange-100"
                          : theme === "dark"
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p
                className={`text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Start a conversation with {currentUser?.name}
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        <div
          className={`border-t p-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"
              }`}
            >
              <Plus
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-[#2A2A2A]" : "hover:bg-gray-100"
              }`}
            >
              <Smile
                className={`w-5 h-5 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type here..."
                className={`w-full py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  theme === "dark"
                    ? "bg-[#2A2A2A] text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
            <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-full text-white">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
