import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type UserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: '/dashboard/users/create',
    },
];

export default function Create() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm<UserFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('users.store'), {
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
            <Head title="Create User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <Link href="/dashboard/users" className="cursor-pointer">
                        <Button variant={'mine'}>{'<<'} Back to all users</Button>
                    </Link>
                </div>

                <div className="max-w-xl">
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
                        <div>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => {
                                        setData('password_confirmation', e.target.value);
                                        if (errors.password_confirmation) {
                                            clearErrors('password_confirmation');
                                        }
                                    }}
                                    className="w-full"
                                />
                                <button type="button" className="absolute top-2 right-2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password_confirmation && <span className="text-sm text-red-600">{errors.password_confirmation}</span>}
                        </div>
                        <div className="">
                            <Button variant={'mine'} className="w-full" disabled={processing}>
                                {processing ? 'Creating' : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
