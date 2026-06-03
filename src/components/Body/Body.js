const Body = ({ Input, Actions, Output }) => {
    return <main className="py-3 px-5">
        <div className="d-flex flex-column flex-xl-row">
            <div className="bg-body-tertiary border rounded-3 p-1 panel panel-input">
                <Input />
            </div>
            <div className="p-1 panel panel-actions">
                { Actions }
            </div>
            <div className="bg-body-tertiary border rounded-3 p-1 panel panel-output">
                <Output />
            </div>
        </div>
    </main>
}


export default Body