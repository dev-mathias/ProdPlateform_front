// To parse this data:
//
//   import { Convert, IAdressAPIResult } from "./file";
//
//   const iAdressAPIResult = Convert.toIAdressAPIResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface IAdressAPIResult {
    results: Result[];
    query:   Query;
}

export interface Query {
    text:   string;
    parsed: Parsed;
}

export interface Parsed {
    housenumber:   string;
    street:        string;
    postcode:      string;
    city:          string;
    country:       string;
    expected_type: string;
}

export interface Result {
    datasource:    Datasource;
    housenumber:   string;
    street:        string;
    city:          string;
    county:        string;
    state:         string;
    postcode:      string;
    country:       string;
    country_code:  string;
    lon:           number;
    lat:           number;
    state_code:    string;
    formatted:     string;
    address_line1: string;
    address_line2: string;
    category:      string;
    timezone:      Timezone;
    result_type:   string;
    rank:          Rank;
    place_id:      string;
    bbox:          Bbox;
}

export interface Bbox {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
}

export interface Datasource {
    sourcename:  string;
    attribution: string;
    license:     string;
    url:         string;
}

export interface Rank {
    importance:              number;
    popularity:              number;
    confidence:              number;
    confidence_city_level:   number;
    confidence_street_level: number;
    match_type:              string;
}

export interface Timezone {
    name:               string;
    offset_STD:         string;
    offset_STD_seconds: number;
    offset_DST:         string;
    offset_DST_seconds: number;
    abbreviation_STD:   string;
    abbreviation_DST:   string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toIAdressAPIResult(json: string): IAdressAPIResult {
        return cast(JSON.parse(json), r("IAdressAPIResult"));
    }

    public static iAdressAPIResultToJson(value: IAdressAPIResult): string {
        return JSON.stringify(uncast(value, r("IAdressAPIResult")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "IAdressAPIResult": o([
        { json: "results", js: "results", typ: a(r("Result")) },
        { json: "query", js: "query", typ: r("Query") },
    ], false),
    "Query": o([
        { json: "text", js: "text", typ: "" },
        { json: "parsed", js: "parsed", typ: r("Parsed") },
    ], false),
    "Parsed": o([
        { json: "housenumber", js: "housenumber", typ: "" },
        { json: "street", js: "street", typ: "" },
        { json: "postcode", js: "postcode", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "expected_type", js: "expected_type", typ: "" },
    ], false),
    "Result": o([
        { json: "datasource", js: "datasource", typ: r("Datasource") },
        { json: "housenumber", js: "housenumber", typ: "" },
        { json: "street", js: "street", typ: "" },
        { json: "city", js: "city", typ: "" },
        { json: "county", js: "county", typ: "" },
        { json: "state", js: "state", typ: "" },
        { json: "postcode", js: "postcode", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "country_code", js: "country_code", typ: "" },
        { json: "lon", js: "lon", typ: 3.14 },
        { json: "lat", js: "lat", typ: 3.14 },
        { json: "state_code", js: "state_code", typ: "" },
        { json: "formatted", js: "formatted", typ: "" },
        { json: "address_line1", js: "address_line1", typ: "" },
        { json: "address_line2", js: "address_line2", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "timezone", js: "timezone", typ: r("Timezone") },
        { json: "result_type", js: "result_type", typ: "" },
        { json: "rank", js: "rank", typ: r("Rank") },
        { json: "place_id", js: "place_id", typ: "" },
        { json: "bbox", js: "bbox", typ: r("Bbox") },
    ], false),
    "Bbox": o([
        { json: "lon1", js: "lon1", typ: 3.14 },
        { json: "lat1", js: "lat1", typ: 3.14 },
        { json: "lon2", js: "lon2", typ: 3.14 },
        { json: "lat2", js: "lat2", typ: 3.14 },
    ], false),
    "Datasource": o([
        { json: "sourcename", js: "sourcename", typ: "" },
        { json: "attribution", js: "attribution", typ: "" },
        { json: "license", js: "license", typ: "" },
        { json: "url", js: "url", typ: "" },
    ], false),
    "Rank": o([
        { json: "importance", js: "importance", typ: 3.14 },
        { json: "popularity", js: "popularity", typ: 3.14 },
        { json: "confidence", js: "confidence", typ: 0 },
        { json: "confidence_city_level", js: "confidence_city_level", typ: 0 },
        { json: "confidence_street_level", js: "confidence_street_level", typ: 0 },
        { json: "match_type", js: "match_type", typ: "" },
    ], false),
    "Timezone": o([
        { json: "name", js: "name", typ: "" },
        { json: "offset_STD", js: "offset_STD", typ: "" },
        { json: "offset_STD_seconds", js: "offset_STD_seconds", typ: 0 },
        { json: "offset_DST", js: "offset_DST", typ: "" },
        { json: "offset_DST_seconds", js: "offset_DST_seconds", typ: 0 },
        { json: "abbreviation_STD", js: "abbreviation_STD", typ: "" },
        { json: "abbreviation_DST", js: "abbreviation_DST", typ: "" },
    ], false),
};
