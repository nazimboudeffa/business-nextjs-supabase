"use client"
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Loader2, Shirt } from "lucide-react"

const Search = () => {

    const [searchKey, setSearchKey] = useState<string>("")
    const [interests, setInterests] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const searchInterests = async (e : any) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                "https://graph.facebook.com/search?type=adinterest&q=[%22"+ searchKey +"%22]&limit=1000&locale=fr_FR&access_token=" + process.env.NEXT_PUBLIC_FB_ACCESS_TOKEN
            );
            const { data } = await response.json();
            console.log("response from fb request", data)
            setInterests(data)
          } catch (err) {
             console.log(
                "There is an error occured while making request to FB Graph API: " + err
             );
          }
        setIsLoading(false)
    }

    const renderInterests = () => {
        return interests.map(interest => (

            <div className="bg-gray-200 p-4 rounded-lg" key={interest.id}>
                <h3 className="text-lg font-bold">{interest.name}</h3>
                <p className="text-sm">{interest.audience_size_lower_bound}</p>
                <p className="text-sm">{interest.audience_size_upper_bound}</p>
            </div>
        ))
    }

    const handleClick = (keyWord: string) => {
        if (!keyWord) {
            return;
        }
        searchInterests(keyWord);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
                <Input type="text" placeholder="Teeshirt" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />
                <Button type="submit" onClick={()=>handleClick(searchKey)} disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Shirt className="mr-2 h-4 w-4" />
                    )}{"Analyse!"}
                </Button>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
           {interests.length > 0 && renderInterests()}
           </div>
        </div>
    )
}

export default Search