export {
    type Fahrzeugtyp,
    type Fahrzeug,
    type FahrzeugShared,
    type FahrzeugSharedWrite,
} from './fahrzeug';
export {
    FahrzeugReadService,
    type FahrzeugeServer,
    type Suchkriterien,
} from './fahrzeugRead.service';
export { FahrzeugWriteService } from './fahrzeugWrite.service';
export { FindError, SaveError, UpdateError, RemoveError } from './errors';
