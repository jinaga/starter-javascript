const { Jinaga: j, ensure} = require("jinaga");
const { User } = require("./user");

class Domain {
    constructor(
        identifier
    ) {
        this.type = Domain.Type;
        this.identifier = identifier;
    }
}
Domain.Type = 'MyApplication.Domain';

class Visit {
    constructor(
        domain,
        user
    ) {
        this.type = Visit.Type;
        this.domain = domain;
        this.user = user;
        this.time = new Date();
    }

    static inDomain(d) {
        return j.match({
            type: Visit.Type,
            domain: d
        });
    }

    static user(v) {
        ensure(v).has('user', User);
        return j.match(v.user);
    }
}
Visit.Type = 'MyApplication.Visit';

function authorizeVisit(a) {
    return a
        .any(Domain.Type)
        .type(Visit.Type, j.for(Visit.user))
        ;
}

module.exports = {
    Domain,
    Visit,
    authorizeVisit
};