import Json from "./Json";
import Xml from "./Xml";
import Yaml from "./Yaml";
import Csv from "./Csv";
import Toml from "./Toml";
import Tsv from "./Tsv";
import Ini from "./Ini";
import Properties from "./Properties";
import Hcl from "./Hcl";
import Ndjson from "./Ndjson";
import Env from "./Env";
import QueryString from "./QueryString";
import ToolQuery from "./ToolQuery";
import ToolIp from "./ToolIp";

const infoText = {
    json: Json,
    xml: Xml,
    yaml: Yaml,
    csv: Csv,
    toml: Toml,
    tsv: Tsv,
    ini: Ini,
    properties: Properties,
    hcl: Hcl,
    ndjson: Ndjson,
    env: Env,
    querystring: QueryString,
    'tool-query': ToolQuery,
    'tool-ip': ToolIp
};

export default infoText;
