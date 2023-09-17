import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../util/auth';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const Login: React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        await login(values.username, values.password);

        setLoading(false);

        navigate({ to: '/' });
    };

    return (
        <div className="flex h-screen w-screen items-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto w-full  max-w-screen-sm space-y-10 p-2"
                >
                    <h1 className="text-5xl">Login</h1>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="************"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit" disabled={loading}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
