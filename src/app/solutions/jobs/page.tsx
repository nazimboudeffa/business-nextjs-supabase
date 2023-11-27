'use client'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const Jobs = function () {
    const user = "test user"

    const [formData, setFormData] = useState({ user: user, title: "", description: "", job_category: "", });
    const [error, setError] = useState({ user: "", title: "", description: "", job_category: ""});

    const handleSubmit = async (e : any | null) => {

        e.preventDefault();

        if (!formData.title) {
            setError({ user: "",  title: "title Field is required", description: "", job_category: "" })
            return;
        }

        if (!formData.description) {
            setError({ user: "",  title: "", description: "description Field is required", job_category: "" })
            return;
        }

        if (!formData.job_category) {
            setError({ user: "",  title: "", description: "", job_category: "job_category Field is required" })
            return;
        }

        if (formData.user == null) {
            return toast.error("Please Login First");
        }

    }



    const options = [
        { value: 'babysitting', label: 'Babysitting' },
        { value: 'delvery', label: 'Delivery' },
    ]

    return (
        <>
        <div className='w-full  py-20 flex items-center  justify-center flex-col'>
            <h1 className='text-xl mt-4 uppercase tracking-widest border-b-2 border-b-indigo-600 py-2 font-semibold mb-8 md:text-2xl lg:text-4xl'>Enter Job Details</h1>
            <form onSubmit={handleSubmit} className="sm:w-1/2 w-full px-4 mx-4  h-full" >
                <div className='w-full mb-4  flex flex-col items-start justify-center'>
                    <label htmlFor="title" className='mb-1 text-base font-semibold'>Title :</label>
                    <input onChange={(e) => setFormData({ ...formData, title: e.target.value })} type="text" id='title' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter title of job' />
                    {
                        error.title && <p className="text-sm text-red-500">{error.title}</p>
                    }
                </div>
                <div className='w-full mb-4  flex flex-col items-start justify-center'>
                    <label htmlFor="description" className='mb-1 text-base font-semibold'>Description :</label>
                    <textarea onChange={(e) => setFormData({ ...formData, description: e.target.value })} id='description' className='w-full py-2 px-3 mb-2 border border-indigo-600 rounded' placeholder='Enter description of job' />
                    {
                        error.description && <p className="text-sm text-red-500">{error.description}</p>
                    }
                </div>
                <Select onChange={(e : any | null) => setFormData({ ...formData, job_category: e.value })} placeholder="Please Select Job type" options={options} />
                <div className='w-full mb-4  flex flex-col items-start justify-center'>
                    {
                        error.job_category && <p className="text-sm text-red-500">{error.job_category}</p>
                    }
                </div>
                <button type="submit" className='w-full py-2 rounded bg-indigo-600 text-white font-semibold tracking-widest'>Submit</button>
            </form>
        </div>
        <ToastContainer />
    </>
    )
}

export default Jobs