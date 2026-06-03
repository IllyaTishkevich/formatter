import Input from "../../components/Input";
import Output from "../../components/Output";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useActions from "../../components/Actions";
import useParams from "../../core/params";
import Body from "../../components/Body";

const ConverterPage = () => {
    const { input } = useSelector((s) => s.converter)
    const { inputFormat, outputFormat } = useParams()

    const { handleConvert, actions, Validate, Convert } = useActions()


    useEffect(() => {
        if (input.length > 0) {
            handleConvert(inputFormat, outputFormat);
        }
    }, [inputFormat, outputFormat])

    const description = `Convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}. Minify, Prettify and Validate ${outputFormat.toUpperCase()}.`;
    const title = `${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()} Converter`;
    const url = window.location.href;

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
        </Helmet>
        <Body
            Input={Input}
            Output={Output}
            Actions={actions([Convert, Validate])}
        />
    </>
};

export default ConverterPage;