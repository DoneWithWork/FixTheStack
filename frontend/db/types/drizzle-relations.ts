import { InferSelectModel } from "drizzle-orm";
import { users } from "../schema/tables/users";
import { institutions, usersToInstitutions } from "../schema/tables/institutions";
import { projectGroups, projects } from "../schema/tables/projects";
import { devices } from "../schema/tables/devices";
import { apiKeys } from "../schema/tables/apiKeys";



export type User = InferSelectModel<typeof users>;
export type Institution = InferSelectModel<typeof institutions>;
export type Project = InferSelectModel<typeof projects>;
export type ProjectGroup = InferSelectModel<typeof projectGroups>;
export type Device = InferSelectModel<typeof devices>;
export type ApiKey = InferSelectModel<typeof apiKeys>;
export type UserInstitution = InferSelectModel<typeof usersToInstitutions>;


export type DeviceWithRelations = Device & {
    user: User;
    group: ProjectGroup | null;
};

export type ProjectGroupWithRelations = ProjectGroup & {
    project: Project;
    devices: Device[];
};

export type ProjectWithRelations = Project & {
    user: User;
    groups: ProjectGroupWithRelations[];
};

export type InstitutionWithRelations = Institution & {
    users: User[];
};

export type UserWithRelations = User & {
    apiKeys: ApiKey[];
    devices: Device[];
    projects: ProjectWithRelations[];
    institutions: InstitutionWithRelations[];
};

export interface DatabaseRelations {
    user: UserWithRelations;
    institution: InstitutionWithRelations;
    project: ProjectWithRelations;
    projectGroup: ProjectGroupWithRelations;
    device: DeviceWithRelations;
}
