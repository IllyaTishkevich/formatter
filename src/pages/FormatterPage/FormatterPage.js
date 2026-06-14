import Input from "../../components/Input";
import Output from "../../components/Output";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ActionButton, ActionsBlock, useActions } from "../../components/Actions";
import InfoBlock from "../../components/Info";
import useParams from "../../core/params";

const FormatterPage = () => {
    const { input } = useSelector((s) => s.converter)
    const { inputFormat, outputFormat } = useParams()

    const { handleConvert, handleValidate, handleMinify } = useActions()


    useEffect(() => {
        if (input.length > 0) {
            handleConvert();
        }
    }, [inputFormat, outputFormat])

    const description = `Format, validate, prettify, and minify ${inputFormat.toUpperCase()} online. Free ${inputFormat.toUpperCase()} formatter and validator with instant syntax checking and error detection.`;
    const title = `${inputFormat.toUpperCase()} Formatter & Validator Online – Prettify, Minify and Validate ${inputFormat.toUpperCase()}`;
    const url = window.location.href;

    const themes = [inputFormat];

    return <>
        <Helmet>
            <title>
                { title }
            </title>
            <meta
                name="description"
                content={ description }
            />
            <meta property="og:title" content={ title } />
            <meta
                property="og:description"
                content={ description }
            />
            <meta property="og:url" content={ url } />
            <meta name="twitter:title" content={ title } />
            <meta name="twitter:description" content={ description } />
            <link rel="canonical" href={ url } />
        </Helmet>
        <main className="py-3 px-5">
            <h1 className="display-6 fw-normal mb-3">{ title }</h1>
            <div className="d-flex flex-column flex-xl-row">
                <div className="bg-body-tertiary border rounded-3 p-1 panel panel-input">
                    <Input />
                </div>
                <ActionsBlock>
                    <ActionButton handler={handleConvert} label={ `Beautify ${outputFormat.toUpperCase()}` } />
                    <ActionButton handler={handleMinify} label='Minify' />
                    <ActionButton handler={handleValidate} label='Validate' />
                </ActionsBlock>
                <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
                    <Output />
                </div>
            </div>
            <InfoBlock themes={themes} />
        </main>
    </>
};

export default FormatterPage;