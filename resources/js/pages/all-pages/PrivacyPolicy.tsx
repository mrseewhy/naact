import PageHeader from '@/components/mycomponents/PageHeader';
import Layout from '@/layouts/page-layout';
import { Head } from '@inertiajs/react';

const PrivacyPolicy = () => {
    return (
        <>
            <Head title="Privacy Policy" />
            <PageHeader title={'Privacy policy'} />
            <section className="py-12">
                <div className="container mx-auto max-w-7xl px-4">
                    <p className="mb-10 text-sm text-gray-500">Last Updated: 11th July 2025</p>

                    <div className="prose prose-green max-w-none">
                        <p>
                            The Nigerian Association in the Australian Capital Territory (NAACT) is committed to protecting your privacy. This policy
                            outlines how we collect, use, and safeguard your personal information.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">1. Information We Collect</h2>
                        <p>We may collect personal information such as:</p>
                        <ul className="mt-1 mb-2 list-disc pl-4">
                            <li>Your name, email, and contact details</li>
                            <li>Information submitted via contact forms or event registrations</li>
                            <li>Donation details (securely processed via third-party platforms)</li>
                            <li>Website usage data (via cookies or analytics tools)</li>
                        </ul>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">2. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="mt-1 mb-2 list-disc pl-4">
                            <li>Communicate with you about events, activities, and updates</li>
                            <li>Process donations or memberships</li>
                            <li>Improve the website experience</li>
                            <li>Maintain accurate community records</li>
                        </ul>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">3. How We Protect Your Information</h2>
                        <p>
                            We take reasonable steps to protect your personal data from loss, misuse, or unauthorised access. All sensitive data is
                            stored securely.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">4. Sharing Your Information</h2>
                        <p>
                            We do not sell or rent your personal information. We may share your data with trusted third-party service providers for
                            specific purposes (e.g. payment processing) under strict confidentiality.
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">5. Your Rights</h2>
                        <p>
                            You have the right to access, correct, or delete your personal information. To make a request, contact us at{' '}
                            <strong>
                                <a href="mailto:info@nacct.org.au">info@nacct.org.au</a>
                            </strong>
                            .
                        </p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">6. Cookies</h2>
                        <p>Our website may use cookies to enhance user experience. You can choose to disable cookies in your browser settings.</p>

                        <h2 className="mt-4 mb-1 font-head text-lg font-bold">7. Changes to This Policy</h2>
                        <p>We may update this privacy policy occasionally. We encourage you to review it regularly.</p>

                        <p>
                            If you have any questions about how we handle your data, please contact us at{' '}
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

PrivacyPolicy.layout = (page: React.ReactNode) => <Layout children={page} />;
export default PrivacyPolicy;
