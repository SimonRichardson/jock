jock.package("jock.utils", {
    match: function(value, matches){
        if(value && typeof value.__Enum__ !== "undefined") {
            if(value.ns in matches || "Default" in matches)
                return matches[value.ns].apply(this, value.values);

            throw new jock.errors.NoSuchElementError();
        }

        throw new jock.errors.TypeError();
    }
});