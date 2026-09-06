import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    email: string;
}

type UserFormData = {
    name: string;
    email: string;
    password: string;
};

interface EditProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit User',
        href: '/dashboard/users/edit',
    },
];

export default function Edit({ user }: EditProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, put, processing, errors, clearErrors, reset } = useForm<UserFormData>({
        name: user.name,
        email: user.email,
        password: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('users.update', user.id), {
            onSuccess: () => {
                reset();
            },
            onError: () => {
                toast.error('Error! Something went wrong. ');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/users" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all users</Button>
                    </Link>
                </div>

                <div className="max-w-xl">
                    <div className="my-4">
                        <h3 className="font-head text-xl">Edit - {user.name}</h3>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => {
                                    setData('name', e.target.value);
                                    if (errors.name) {
                                        clearErrors('name');
                                    }
                                }}
                            />
                            {errors.name && <span className="text-sm text-red-600">{errors.name}</span>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData('email', e.target.value);
                                    if (errors.email) {
                                        clearErrors('email');
                                    }
                                }}
                            />
                            {errors.email && <span className="text-sm text-red-600">{errors.email}</span>}
                        </div>
                        <div className="mt-2">
                            <h4 className="font-head font-medium text-green-800">Do not touch the password if you do not intend to change it </h4>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData('password', e.target.value);
                                        if (errors.password) {
                                            clearErrors('password');
                                        }
                                    }}
                                    className="w-full"
                                />
                                <button type="button" className="absolute top-2 right-2" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="text-sm text-red-600">{errors.password}</span>}
                        </div>

                        <div className="">
                            <Button variant={'mine'} className="w-full" disabled={processing}>
                                {processing ? 'Updating' : 'Update User'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
