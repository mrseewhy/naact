import Toast from '@/components/mycomponents/FlashMessage';
import Footer from '@/components/mycomponents/Footer';
import Navbar from '@/components/mycomponents/Navbar';
import type { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Navbar />
            <main className="min-h-[85vh]">{children}</main>
            <Footer />
            <Toast />
        </div>
    );
};

export default Layout;
