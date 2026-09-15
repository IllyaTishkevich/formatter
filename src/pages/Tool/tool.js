import list from './toolsList'
import useParams from "../../core/params";
import NotFound from "../../components/NotFound";

const Tool = () => {
    const { tool } = useParams();
    return <>
        { list[tool] ? list[tool]() : <NotFound /> }
    </>
}

export default Tool;