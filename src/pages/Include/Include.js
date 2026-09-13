import Editor from "@monaco-editor/react";
import SUPPORTED from "../../utils/formats";

const Include = () => {
    const include = ['/'];

    SUPPORTED.forEach((valueA) => {
        SUPPORTED.forEach((valueB) => {
            const url = valueA === valueB ? `/${valueA}` : `/${valueA}/${valueB}`;

            include.push(url);
        })
    })

    include.push('/policy');
    const json =  JSON.stringify({ include: include }, null, 2);

    return <div>
        <Editor
            height="500px"
            language={'xml'}
            value={json}

            options={{
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on'
            }}
        />
    </div>
}

export default Include;