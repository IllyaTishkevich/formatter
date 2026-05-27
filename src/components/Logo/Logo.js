import logoImg from './logo.png';
import logoIcon from './logoIcon.png';
import logoText from './logotext.png';
const Logo = ({height, img}) => {
    let image = logoImg;

    switch (img) {
        case ('icon'):
            image = logoIcon;
            break;
        case ('text'):
            image = logoText;
            break;
        case ('full'):
        default:
            image = logoImg;
            break;
    }

    return <div className='bi me-2'>
        <img src={image} alt="Logo" height={height}/>
    </div>
}

export default Logo;