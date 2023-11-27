"use client"
import { useState } from 'react'
import axios from 'axios';

const Search = () => {

    const [searchKey, setSearchKey] = useState("")
    const [interests, setInterests] = useState<any[]>([])

    const searchInterests = async (e : any) => {
        e.preventDefault()
        try {
            const { data } = await axios({
              url:
                "https://graph.facebook.com/search?type=adinterest&q=[%22"+ searchKey +"%22]&limit=1000&locale=fr_FR&access_token=" + process.env.NEXT_PUBLIC_FB_ACCESS_TOKEN,
              method: "get",
            });
            console.log("response from fb request", data)
            setInterests(data.data)
          } catch (err) {
             console.log(
                "There is an error occured while making request to FB Graph API: " + err
             );
          }
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

    return (
        <>
        <h1 className="text-2xl font-bold">Search Interests</h1>
        <form onSubmit={searchInterests}>
            <div className="flex items-center gap-4">
                <input type="text" onChange={e => setSearchKey(e.target.value)} className='border border-black rounded'/>
                <button type={"submit"} className='rounded-lg text-green-500 bg-black'>Search</button>
            </div>
        </form>
        <section>
           <div className="grid grid-cols-4 gap-4">
           {renderInterests()}
           </div>
        </section>
        </>
    )
}

export default Search