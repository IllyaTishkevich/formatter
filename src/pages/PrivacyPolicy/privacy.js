import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
    return <>
        <Helmet>
            <meta
                name="keywords"
                content="privacy policy, data protection, cookies, local storage, GDPR"
            />
            <title>Privacy Policy | ValidFormat</title>
            <meta
                name="description"
                content="Privacy Policy for ValidFormat. Learn how we handle data, cookies, and local storage."
            />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href="https://validformat.online/privacy" />

            <meta property="og:title" content="Privacy Policy | ValidFormat" />
            <meta
                property="og:description"
                content="Learn how ValidFormat handles data, cookies, and privacy."
            />
            <meta property="og:url" content="https://validformat.online/privacy" />
            <meta
                property="og:image"
                content="https://validformat.online/logo/logo512.png"
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Privacy Policy | ValidFormat" />
            <meta
                name="twitter:description"
                content="Learn how ValidFormat handles data, cookies, and privacy."
            />
            <meta
                name="twitter:image"
                content="https://validformat.online/logo/logo512.png"
            />
        </Helmet>
        <main className="py-5">
        <div className="container" style={{ maxWidth: "900px" }}>

            <div className="card shadow-sm p-4 border-0 rounded-3">

                <h1 className="fw-bold mb-2">Privacy Policy</h1>
                <p className="text-muted">Last updated: June 4, 2026</p>

                <hr />

                <h5 className="mt-4 fw-semibold">1. Overview</h5>
                <p>
                    This Privacy Policy explains how <strong>validformat.online</strong> handles information when you use our format conversion tool.
                    We provide a web-based tool for converting, formatting, validating, and minifying data formats such as JSON, XML and YAML.
                </p>

                <h5 className="mt-4 fw-semibold">2. Information We Do NOT Collect</h5>
                <p>We respect your privacy and do not collect personal data.</p>
                <ul>
                    <li>No user registration required</li>
                    <li>No storage of input/output data on servers</li>
                    <li>No tracking of editor content</li>
                    <li>No selling or sharing data</li>
                </ul>

                <h5 className="mt-4 fw-semibold">3. Local Data Storage</h5>
                <p>
                    We may store data locally in your browser using <code>localStorage</code>:
                </p>
                <ul>
                    <li>Editor input content</li>
                    <li>Selected formats (JSON, XML, YAML)</li>
                    <li>UI preferences</li>
                </ul>
                <p className="text-muted">
                    This data stays on your device and can be cleared anytime.
                </p>

                <h5 className="mt-4 fw-semibold">4. Analytics</h5>
                <p>
                    We may use anonymous analytics to improve performance and usability.
                    No personal identification is collected.
                </p>

                <h5 className="mt-4 fw-semibold">5. Cookies</h5>
                <p>
                    We may use cookies or similar technologies only when required by third-party services such as analytics or advertising providers.

                    These cookies are not used by us to personally identify users or track individual behavior.
                </p>

                <h5 className="mt-4 fw-semibold">6. Third-Party Services</h5>
                <p>
                    We may use third-party services for hosting, analytics, or CDN delivery.
                    These services may process technical data such as IP address.
                </p>

                <h5 className="mt-4 fw-semibold">7. Data Security</h5>
                <p>
                    Your data remains in your browser. We recommend not using sensitive information in the tool.
                </p>

                <h5 className="mt-4 fw-semibold">8. Children’s Privacy</h5>
                <p>
                    This service is not intended for children under 13 years old.
                </p>

                <h5 className="mt-4 fw-semibold">9. Changes to This Policy</h5>
                <p>
                    We may update this Privacy Policy from time to time. Updates will be posted on this page.
                </p>

                <h5 className="mt-4 fw-semibold">10. Contact</h5>
                <p>
                    If you have questions, contact us at{" "}
                    <a href="mailto:relikt.ilya@gmail.com">
                        support@validformat.online
                    </a>
                </p>

            </div>
        </div>
    </main>
        </>
}

export default PrivacyPolicy;