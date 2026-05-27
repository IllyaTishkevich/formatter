import Input from "../Input";
import Output from "../Output";
import Actions from "../Actions";
import './body.css'

const Body = ({ config }) => {
    return <main className="my-4 p-3">
        <div className="d-flex flex-column flex-xl-row">
            <div className="bg-body-tertiary border rounded-3 p-1 panel panel-input">
                <Input inputFormat={config.inputFormat} outputFormat={config.outputFormat}/>
            </div>
            <div className="p-1 panel panel-actions">
                <Actions config={config}/>
            </div>
            <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
                <Output inputFormat={config.inputFormat} outputFormat={config.outputFormat}/>
            </div>
        </div>
    </main>
}

export default Body;