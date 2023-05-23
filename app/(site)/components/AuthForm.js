'use client'

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"

import Input from "../../components/inputs/Input"
import Button from "../../components/Button"

export default function AuthForm(){
    
    const [variant, setVariant] = useState('LOGIN')
    const [isLoading, setIsLoading] = useState(false)
    const toggeVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
    }, [variant])

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    //Trinh xu ly form
    const onSubmit = (data) => {
        setIsLoading(true)
        console.log(data)
        if(variant === 'REGISTER'){
            //Axios Register
        }
        if(variant === 'LOGIN'){
            //NextAuth SignInk
        }
    }
    //Hanh dong
    const socialAction = (action) => {
        setIsLoading(true)

        //NextAuth Social Sign In
    }
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form 
                    className="space-y-6" 
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input 
                            id="name" 
                            label="Name" 
                            type="text"
                            errors={errors}
                            register={register}
                        />
                    )}
                    <Input 
                        id="email" 
                        label="Email address" 
                        type="email"
                        errors={errors}
                        register={register}
                    />
                    <Input 
                        id="password" 
                        label="Password" 
                        type="password"
                        errors={errors}
                        register={register}
                    />
                    <div>
                        <Button 
                            type='submit' 
                            fullWidth
                            disabled={isLoading}
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">

                </div>
            </div>
        </div>
    )
}