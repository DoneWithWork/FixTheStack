
import * as enums from './enums';
import * as apiKeys from './tables/apiKeys';
import * as auth from './tables/auth';
import * as devices from './tables/devices';
import * as institutions from './tables/institutions';
import * as projects from './tables/projects';
import * as timestamps from './tables/timestamps';
import * as users from './tables/users';

export const schema = {
    ...enums,
    ...apiKeys,
    ...auth,
    ...devices,
    ...institutions,
    ...projects,
    ...timestamps,
    ...users,
};
