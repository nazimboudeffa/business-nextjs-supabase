'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { toast } from 'sonner';

type Message = {
    id: number;
    receiver: string;
    sender: string;
    content: string;
    createdAt: string;
    senderUsername: string;
  }

type Conversations = {
    id: number;
    participants: string[];
    createdAt: string;
  }

type Profile = {
    id: string;
    username: string;
    avatar: string;
  }

function Messages() {

    const [conversations, setConversations] = useState<Conversations[] | null>([])
    const [messages, setMessages] = useState<Message[] | null>([])
    const [profile, setProfile] = useState<Profile | null>(null)
    const [content, setContent] = useState<string>("")
    const [conversationId, setConversationId] = useState<number>(0)
    const [loadingConversations, setLoadingConversations] = useState<boolean>(false)

    const supabase = createClientComponentClient();

    const fetchProfile = async (participant : string) => {
      const { data, error } = await supabase.from('profiles').select().eq('id', participant);
      if (error) {
        console.error(error);
      }
      console.log(data);
      if (data?.length === 0) {
        return "Anonymous";
      } else {
        return data?.[0].username;
      }
    };
    
    const fetchMessages = async (conversationId : number) => {
      const { data, error } = await supabase.from('messages').select().match({ conversation_id: conversationId });
      if (error) {
          console.error(error);
      }
      data?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      for (const message of data!) {
        message.senderUsername = await fetchProfile(message.sender);
      }
      setMessages(data);
      console.log(data);
    }

    const handleClick = (id : number) => {
      fetchMessages(id);
      setConversationId(id);
    }

    const sendMessage = async () => {
      if (profile?.username === "Anonymous") {
        toast('Please update your profile to send messages')
        return;
      }
      const message = {
        conversation_id: conversationId,
        sender: profile?.id,
        content: content
      };
      const { error: messageError } = await supabase.from('messages').insert(message);
      if (messageError) {
        console.error(messageError);
      } else {
        toast('Message have been sent, please reload')
      }    
    };

    useEffect(() => {

        const fetchUserProfile = async () => {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error(userError);
          }
          console.log(userData);
          const { data, error } = await supabase.from('profiles').select().eq('id', userData?.user?.id);
          if (error) {
            console.error(error);
          }
          console.log(data);
          if (data?.length !== 0) {
            setProfile(data?.[0]);
          } else {
            setProfile({
              id: userData?.user?.id!,
              username: "Anonymous",
              avatar: "",
            });
          }       
        };

        const fetchParticipantProfile = async (participant : string[]) => {
          const { data, error } = await supabase.from('profiles').select().eq('id', participant[0]);
          if (error) {
            console.error(error);
          }
          console.log(data);
          if (data?.length === 0) {
            return "Anonymous";
          } else {
            return data?.[0].username;
          }
        };

        const fetchConversations = async () => {
          setLoadingConversations(true);
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error(userError);
          }
          console.log(userData);
          const { data, error } = await supabase.from('conversations').select().contains('participants', [userData?.user?.id]);
          if (error) {
            console.error(error);
          }
          console.log(data);
          data?.forEach((conversation) => {
            conversation.participants = conversation.participants.filter((participant: string) => participant !== userData?.user?.id);
          });
          console.log(data);
          for (const conversation of data!) {
            conversation.participants[0] = await fetchParticipantProfile(conversation.participants);
          }
          console.log(data);
          setConversations(data);
          setLoadingConversations(false);
        };

        fetchConversations();
        fetchUserProfile();
       
    }, [supabase, setConversations, setProfile])

    return (
        <>
        <main className="flex flex-1 flex-col md:flex-row gap-4 p-4 md:gap-8 md:p-6">
        <div className="bg-zinc-100/40 dark:bg-zinc-800/40">
          {
          loadingConversations && 
          <div className="h-20 w-60 flex justify-center items-center">
            <div className="h-12 w-12 rounded-full animate-spin border-2 border-solid border-blue-500 border-t-transparent"></div>
          </div>
          }
          {!loadingConversations && conversations?.map((conversation) => (
            <div key={conversation.id} className="md:h-20 md:w-60 rounded-lg border border-zinc-200 border-dashed dark:border-zinc-800 cursor-pointer" onClick={() => handleClick(conversation.id)}>
              <div className="p-4 flex items-center gap-4">
                <Image alt="Conversation" height="40" src="/conversation.svg" width="40" />
                <div>
                  <div className="font-semibold text-zinc-800 dark:text-zinc-50">{conversation.participants[0] == 'Anonymous' ? 'Anonymous' : conversation.participants[0]?.substring(0, 9).trimEnd() + "..."}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex-1 rounded-lg border border-zinc-200 border-dashed dark:border-zinc-800">
          
          {messages?.map((message) => (
            (message.sender === profile?.id) ?         
            <div key={message.id} className="p-4 flex items-start gap-4 justify-start">
              <Image alt="User avatar" className="rounded-full" height="40" src="/avatar.svg" width="40" />
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-zinc-800 dark:text-zinc-50">Me</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {message.content}
                </div>
              </div>
            </div>
            :
            <div key={message.id} className="p-4 flex items-start gap-4 justify-end cursor-pointer">
              <Image alt="User avatar" className="rounded-full" height="40" src="/avatar.svg" width="40" />
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-zinc-800 dark:text-zinc-50">{message.senderUsername}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        
          </div>
          <div className="flex gap-2 items-center mt-4">
            <textarea
              className="flex-1 h-10 p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 overflow-hidden resize-none"
              placeholder="Type your message here"
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              className="py-2 px-4 rounded-lg text-white bg-zinc-600 dark:bg-zinc-400 hover:bg-zinc-700 dark:hover:bg-zinc-500"
              type="submit"
              variant="default"
              onClick={()=>sendMessage()}
            >
              Send
            </Button>
          </div>
        </div>
        </main>
        </>
    )
}

export { Messages }