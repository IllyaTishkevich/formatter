import Input from "../../components/Input";
import Output from "../../components/Output";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ActionButton, ActionsBlock, useActions } from "../../components/Actions";
import InfoBlock from "../../components/Info";
import useParams from "../../core/params";

const ConverterPage = () => {
    const { input } = useSelector((s) => s.converter)
    const { inputFormat, outputFormat } = useParams()

    const { handleConvert, handleValidate } = useActions()

    const domainName = process.env.PUBLIC_URL;
    const isPrerender =
        navigator.userAgent === 'ReactSnap';


    useEffect(() => {
        if (input.length > 0) {
            handleConvert();
        }
        // convert only on route change, not on every keystroke
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFormat, outputFormat])

    const description = `Convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} instantly online. Validate, format, and transform your data with a free and secure ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} converter. No registration required.`
    const title = `${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter Online – Free, Fast & Secure`;
    const url = `${domainName}${window.location.pathname}`;

    const themes =[inputFormat, outputFormat];

    return <>
        { isPrerender ? (
        <Helmet>
            <title>
                { title + '| ValidFormat' }
            </title>
            <meta
                name="description"
                content={ description }
            />
            <meta property="og:title" content={ title + '| ValidFormat' } />
            <meta
                property="og:description"
                content={ description }
            />
            <link rel="canonical" href={ url } />
            <meta property="og:url" content={ url } />
            <meta name="twitter:title" content={ title + '| ValidFormat' } />
            <meta name="twitter:description" content={ description } />
        </Helmet>
        ) : (
        <main className="py-3 px-5">
            <h1 className="display-6 fw-normal mb-3">{ `${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter Online` }</h1>
            <div className="d-flex flex-column flex-xl-row">
                <div className="bg-body-tertiary border rounded-3 p-1 panel panel-input">
                    <Input />
                </div>
                <ActionsBlock>
                    <ActionButton handler={handleConvert} label={ `Convert to ${outputFormat.toUpperCase()}` } />
                    <ActionButton handler={handleValidate} label='Validate' />
                </ActionsBlock>
                <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
                    <Output />
                </div>
            </div>
            <InfoBlock themes={themes} />
        </main>
            )}
    </>
};

export default ConverterPage;