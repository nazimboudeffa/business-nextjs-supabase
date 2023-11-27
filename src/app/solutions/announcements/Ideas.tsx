'use client'
import { useEffect, useState } from "react"

import { Label } from "@/components/ui/radix-label"
import { Textarea } from "@/components/ui/radix-text-area"
import { Button } from "@/components/ui/radix-button"
import { Trash2, Loader2, Mail, Flag } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/radix-alert-dialog"

import { toast } from 'sonner';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IdeasRequest, IdeasRequestSchema } from "@/lib/schema";
import { t } from "i18next"

type Idea = {
    id: number;
    description: string;
    user_id: string;
}

function Ideas( { serverIdeas } : { serverIdeas:  Idea[] }) {

const supabase = createClientComponentClient();

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<IdeasRequest>({
    resolver: zodResolver(IdeasRequestSchema),
    defaultValues: {
        description: "",
    },
})

const [processing, setProcessing] = useState<boolean>(false)

const onSubmit = async (data: IdeasRequest) => {
    console.log(data)
    setProcessing(true)

    const { data: { user } } = await supabase.auth.getUser()
    const {
        data: ideas,
    } = await supabase.from('ideas').select().match({ user_id: user?.id });

    if (ideas != null && ideas.length >= 3) {
        toast.error('You can only share 3 ideas')
        setProcessing(false)
        return
    }

    const { error } = await supabase
    .from('ideas')
    .insert({ 
        description: data.description,
    })

    setProcessing(false)

    if (error) {         
    console.error(error)
    }

    setProcessing(false)
}

const handleDelete = async (id : number) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
    .from('ideas')
    .delete()
    .match({ id: id, user_id: user?.id })

    if (error) {         
    console.error(error)
    }
}

  const [ideas, setIdeas] = useState<Idea[] | null>([])
  const [content, setContent] = useState<string>("")
  const [sender, setSender] = useState<string | undefined>("") 

  const sendMessage = async (receiver: string) => {
    const { data } = await supabase.from('conversations').select().eq('participants', [sender, receiver] || [receiver, sender]);
    console.log(data);
    if (!data || data.length === 0) {
      const conversation = {
        participants: [sender, receiver]
      };
      const { data: conversationData, error: conversationError } = await supabase.from('conversations').insert(conversation).select('id');
      if (conversationError) {
        console.error(conversationError);
      }
      console.log(conversationData);
      const message = {
        conversation_id: conversationData && conversationData[0]?.id,
        sender: sender,
        content: content
      };
      const { error: messageError } = await supabase.from('messages').insert(message);
      if (messageError) {
        console.error(messageError);
      }
    }
  };        

const [myIdeas, setMyIdeas] = useState<Idea[]>(serverIdeas ?? [])

useEffect(() => {
    const channel = supabase
        .channel('realtime ideas')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ideas' }, payload => {
            console.log('Change received!', payload)
            setMyIdeas((ideas) => [...ideas, payload.new as Idea])
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'ideas' }, payload => {
            console.log('Change received!', payload)
            setMyIdeas((ideas) => ideas.filter((idea) => idea.id !== payload.old.id))
        })
        .subscribe()  
    return () => {
        supabase.removeChannel(channel)
    }
}, [supabase, ideas, setIdeas])

useEffect(() => {
    const getIdeas = async () => {
      const {
        data: ideas,
      } = await supabase.from('ideas').select()
      setIdeas(ideas)
    }

    const setSenderId = async () => {
      const { data } = await supabase.auth.getUser();
      const senderId = data.user?.id;
      setSender(senderId)
    };

    getIdeas()
    setSenderId()
    
  }, [supabase]) 

return (
    <>
    <div className="flex flex-col md:flex-row gap-10">
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col md:flex-row gap-10"
    >
        <div className="max-w-[400px] md:max-w-[500px]">
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="website">Describe your anouncement</Label>
                <Textarea
                    id="text"
                    rows={10}
                    className="text-md w-[400px] md:w-[500px] h-[200px]"
                    placeholder="Enter your announcement here..."
                    {...register("description")}
                />
                {errors.description && errors.description?.message && (
                    <p className="text-sm text-destructive">
                        {errors.description?.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </div>
    </form>
    <div className="w-full md:w-[500px] items-center">
        <h1 className="text-2xl font-bold mb-5">Your announcements</h1>
        <div className="flex flex-col">
        {myIdeas && myIdeas.map((idea) => (
            <div key={idea?.id} className="flex justify-between p-5 border border-input shadow rounded-[12px] dark:border-slate-900 dark:shadow-slate-900 mb-3">
                <div>{idea?.description}</div>
                <span className="cursor-pointer" onClick={()=>handleDelete(idea?.id)}><Trash2 className="text-red-500 dark:text-red-700" /></span>
            </div>
        ))}
        </div>
    </div>
    </div>
    <section className="flex flex-col items-center gap-10 text-center">
        <h1 className="text-2xl font-bold">What others are announcing</h1>
        <div className="ml-5 mr-5 mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
        {ideas?.map((idea) => (
          sender === idea.user_id ? null :
          <div key={idea.id} className="flex flex-col p-5 shadow rounded-[12px] dark:shadow-slate-900">
            <div className="text-xl mb-2">{idea.description}</div>
            <div className="flex flex-row justify-between">
              <div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button>
                          <Mail />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Write a message
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                <div>
                                    This message will be sent to the ad creator.
                                </div>
                                <div className="mt-2">
                                    <Textarea
                                        id="text"
                                        rows={10}
                                        className="text-md"
                                        placeholder="Enter your message..."
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction><button onClick={()=>sendMessage(idea.user_id)}>Send</button></AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </div>
              <Button className="bg-zinc-500 hover:bg-red-500">
                <Flag />
              </Button>
            </div>
          </div>
        ))}
        </div>
    </section>
    </>
)}

export { Ideas }