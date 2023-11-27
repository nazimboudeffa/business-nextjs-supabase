"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/cn"
import { buttonVariants } from "@/components/ui/radix-button"
import { Input } from "@/components/ui/radix-input"
import { Label } from "@/components/ui/radix-label"

import { toast } from 'sonner';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { ProfileRequest, ProfileRequestSchema } from "@/lib/schema";

type TProfile = {
    username: string;
    firstname: string;
    lastname: string;
}   

export default function Profile() {

    const supabase = createClientComponentClient();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorUsername, setErrorUsername] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileRequest>({
        resolver: zodResolver(ProfileRequestSchema),
        defaultValues: async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const {
                data: profiles,
            } = await supabase.from('profiles').select().match({ id: user?.id });
            return {
                username: profiles?.[0]?.username ?? "",
                firstname: profiles?.[0]?.firstname ?? "",
                lastname: profiles?.[0]?.lastname ?? "",
            }
        },
    })
    
    async function onSubmit(data : TProfile) {
        setIsLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        const {
            data: profiles,
        } = await supabase.from('profiles').select().match({ id: user?.id });

        const {
            data: usernames,
        } = await supabase.from('profiles').select().match({ username: data.username });

        if (usernames != null && usernames.length > 0) {
            setErrorUsername('Username already exists')
            setIsLoading(false)
            return
        }
        
        if (profiles?.length !== 0) {
            
            const { error } = await supabase
            .from('profiles')
            .update({ 
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,     
            })
            .eq('id', user?.id)

            console.log({ error });

            toast('Profile updated')

        } else {

            const { error } = await supabase
            .from('profiles')
            .insert({
                id: user?.id, 
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
            })

            console.log({ error });

            toast('Profile created')

        }

        setIsLoading(false)

    }

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="username"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("username")}
                        />
                        {errors?.username && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                        {errorUsername && (
                            <p className="px-1 text-xs text-red-600">
                                {errorUsername}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="firstname">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            placeholder="firstname"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="firstname"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("firstname")}
                        />
                        {errors?.firstname && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.firstname.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="lasttname">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            placeholder="lastname"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="lastname"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("lastname")}
                        />
                        {errors?.lastname && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.lastname.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}