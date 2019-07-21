import {authorizeUser} from '@shared/model/user';
import {authorizeVisit} from '@shared/model/visit';
import {JinagaServer} from 'jinaga';

export function configureJinaga(app, authenticate) {
  const pgConnection = process.env.JINAGA_POSTGRESQL ||
        'postgresql://dev:devpw@localhost:5432/myapplication';
  const {handler} = JinagaServer.create({
    pgKeystore: pgConnection,
    pgStore: pgConnection,
    authorization: configureAuthorization,
  });

  app.use('/jinaga', authenticate, handler);
}

function configureAuthorization(a) {
  return a
      .with(authorizeVisit)
      .with(authorizeUser)
  ;
}
