"use client"

import * as z from "zod"
import Heading from "@/components/Heading"
import { MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Heading
                title="conversation"
                description="Our most advanced conversation"
                Icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border ww-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap2"
                        >
                            <FormField
                                name="promt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visoble:ring-0 focus-visible:ring-trasparent"
                                                disabled={isLoading}
                                                placeholder="How do I calculatee the radius of a circle?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="spacee-y-4 mt-4">
                    
                </div>
            </div>
        </div>
    )
}

export default ConversationPage