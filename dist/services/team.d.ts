/// <reference path="../startup/db.d.ts" />
/// <reference types="mongoose" />
import { TeamInput } from '../interfaces/team';
export declare const teamService: {
    createTeam(payload: TeamInput): Promise<{
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
    getTeam(code: string): Promise<import("../model/team").ITeam>;
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
