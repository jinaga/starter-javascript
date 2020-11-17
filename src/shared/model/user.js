import { Jinaga as j } from "jinaga";

export class User {
    constructor(
        publicKey
    ) {
        this.type = User.Type;
        this.publicKey = publicKey;
    }
}
User.Type = 'Jinaga.User';

export class UserName {
    constructor(
        user,
        value,
        prior
    ) {
        this.type = UserName.Type;
        this.user = user;
        this.value = value;
        this.prior = prior;
    }

    static user(n) {
        n.has('user');
        return j.match(n.user);
    }

    static forUser(u) {
        return j.match({
            type: UserName.Type,
            user: u
        }).suchThat(UserName.isCurrent);
    }

    static isCurrent(n) {
        return j.notExists({
            type: UserName.Type,
            prior: [n]
        });
    }
}
UserName.Type = 'MyApplication.User.Name';

export function authorizeUser(a) {
    return a
        .any(User.Type)
        .type(UserName.Type, j.for(UserName.user))
        ;
}