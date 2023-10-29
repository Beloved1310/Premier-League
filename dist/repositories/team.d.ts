/// <reference path="../startup/db.d.ts" />
/// <reference types="mongoose" />
export declare const teamRepository: {
    getOneTeam(item: {}): Promise<import("../model/team").ITeam | null>;
    createTeam(createTeam: {}): Promise<{
        id?: any;
        name: string;
        country: string;
        founded: number;
    }>;
    updateTeam(code: string, updateFields: {}): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteTeam(code: string): Promise<{
        ok?: number | undefined;
        n?: number | undefined;
    } & {
        deletedCount?: number | undefined;
    }>;
    listTeams(queryParams: any): Promise<{
        team: import("../model/team").ITeam[];
        meta: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
            nextPage: number | null;
        };
    }>;
};
