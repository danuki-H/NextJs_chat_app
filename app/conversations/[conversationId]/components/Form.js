'use client'
import { useForm } from "react-hook-form"
import axios from "axios"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import { CldUploadButton } from "next-cloudinary"

import useConversation from "@/app/hooks/useConversation"
import MessageInput from "./MessageInput"

export default function Form(){
    const { conversationId } = useConversation()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues:{
            message: ''
        }
    })
    const onSubmit = (data) => {
        setValue('message', '', { shouldValidate: true })
        axios.post('/api/messages', {
            ...data,
            conversationId: conversationId
        }).catch(() => {
            console.log("Can not send a message!")
        })
    }

    const handleUpload = (result) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        }).catch(() => {
            console.log("Can not upload an image!")
        })
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="lntrmauf"
            >
                <HiPhoto size={30} className="cursor-pointer text-sky-500 hover:text-sky-600 transition"/>
            </CldUploadButton>
            <form action="" 
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput 
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button type='submit' className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
                    <HiPaperAirplane size={18} className="text-white"/>
                </button>
            </form>
        </div>
    )
}