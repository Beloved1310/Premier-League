/// <reference path="../startup/db.d.ts" />
/// <reference types="mongoose" />
export declare const fixtureRepository: {
    getOneFixture(item: {}): Promise<import("../model/fixture").IFixture | null>;
    createFixture(createFixture: {}): Promise<{
        id?: any;
        result: string;
        homeTeam: string;
        awayTeam: string;
        kickoffTime: Date;
    }>;
    updateFixture(code: string, updateFields: {}): Promise<import("mongoose").UpdateWriteOpResult>;
    deleteFixture(code: string): Promise<{
        ok?: number | undefined;
        n?: number | undefined;
    } & {
        deletedCount?: number | undefined;
    }>;
    listPendingFixtures(queryParams: any): Promise<{
        fixture: import("../model/fixture").IFixture[];
        meta: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
            nextPage: number | null;
        };
    }>;
    listCompletedFixtures(queryParams: any): Promise<{
        fixture: import("../model/fixture").IFixture[];
        meta: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
            nextPage: number | null;
        };
    }>;
    listFixtures(queryParams: any): Promise<{
        fixture: import("../model/fixture").IFixture[];
        meta: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
            nextPage: number | null;
        };
    }>;
};
