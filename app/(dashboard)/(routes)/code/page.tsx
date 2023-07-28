"use client"

import * as z from "zod"

import axios from "axios"
import { ChatCompletionRequestMessage } from "openai"
import Heading from "@/components/Heading"
import { Code } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Empty from "@/components/empty"
import Loader from "@/components/loader"

const CodePage = () => {
    const router = useRouter();
    const [messages, setMessage] = useState<ChatCompletionRequestMessage[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/code", {
                messages: newMessages
            });
            setMessage((current) => [...current, userMessage, response.data]);
            form.reset();
        } catch (error: any) {
            //open pro model
            console.log(error.message)
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title="Code Generation"
                description="Generate code using discriptive text"
                Icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-trasparent"
                                                disabled={isLoading}
                                                placeholder="Simple form using react hooks"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                                size="icon"
                                type="submit"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <div>
                            <Empty label="No conversation started" />
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) =>
                            <div key={message.content}>
                                {message.content}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodePage