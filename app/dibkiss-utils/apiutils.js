module.exports = {
    injectUrlValues: function (url_template, arr_values)
    {
        var insertVal = function (part) {
            if (part.charAt(0) != ':') {
                return part;
            }
            // Replace by value:
            let name = part.slice(1);
            if (name in arr_values) {
                return arr_values[name];
            }
            // Failed:
            console.warn("injectUrlValues() missing value for " + part); // debug
            return undefined;
        };

        let parts = url_template.split('/');
        // Inject values in url. (e.g. arr_values.barid in "/bar/:barid/foo/")
        parts = parts.map(insertVal);
        // Remove any null values, avoids "//" in output.
        //parts = parts.filter((part)=>{ return part!==null; });
        return parts.join('/');
    }
}