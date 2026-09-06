import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';

const Terms = () => {
    return (
        <>
            <Head title="Terms Of Use" />
            <PageHeader title={'Terms of use'} />
            <section className="py-12">
                <div className="container mx-auto max-w-7xl px-4">
                    <p className="mb-10 text-sm text-gray-500">Last Updated: 11th July 2025</p>

                    <div className="prose prose-green max-w-none">
                        <p>
                            Welcome to the official website of the Nigerian Association in the Australian Capital Territory (NAACT). By accessing or
                            using our website, you agree to comply with the following terms and conditions.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">1. Use of the Website</h2>
                        <p>
                            This website is provided for general information, community engagement, and communication purposes. You agree to use it
                            responsibly and in accordance with Australian laws.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">2. Intellectual Property</h2>
                        <p>
                            All content on this website—including text, images, logos, and design—is the property of NAACT unless otherwise stated.
                            You may not copy, reproduce, or distribute any part of the site without our written permission.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">3. User Conduct</h2>
                        <ul>
                            <li>Use the website for illegal or harmful purposes</li>
                            <li>Post or transmit offensive, defamatory, or inappropriate content</li>
                            <li>Attempt to interfere with the operation or security of the site</li>
                        </ul>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">4. Links to Other Websites</h2>
                        <p>
                            We may include links to external websites for your convenience. However, NAACT is not responsible for the content or
                            privacy practices of those sites.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">5. Disclaimer</h2>
                        <p>
                            We do our best to keep the site up to date, but we cannot guarantee that all information is always accurate or complete.
                            The website is provided “as is” without warranties of any kind.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">6. Limitation of Liability</h2>
                        <p>NAACT will not be liable for any direct or indirect damages resulting from your use of this website.</p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">7. Changes to Terms</h2>
                        <p>
                            We may update these terms from time to time. Continued use of the website after changes means you accept the updated
                            terms.
                        </p>

                        <p>
                            If you have any questions, please contact us at{' '}
                            <strong>
                                <a href="mailto:info@nacct.org.au">info@nacct.org.au</a>
                            </strong>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

Terms.layout = (page: React.ReactNode) => <Layout children={page} />;
export default Terms;
