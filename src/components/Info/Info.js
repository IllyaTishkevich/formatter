
import { Children } from "react";
import infoText from "./infoText";

const getInfoText = (theme) => {
    return infoText[theme];
}

const Info = ({theme}) => {
    const text = getInfoText(theme);

    return <div className='col px-3'>
     { text() }
    </div>
}

const InfoContainer = ({children}) => {
    return <div className="d-flex flex-column flex-xl-row border-0">
            {Children.map(children, child => child)}
        </div>
}

const InfoBlock = ({themes}) => {
    return <div className='container my-5'>
            <InfoContainer>
                { themes.map((theme) => <Info key={theme} theme={theme} />) }
            </InfoContainer>
    </div>
}

export default InfoBlock;