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
    querystring: QueryString
};

export default infoText;
