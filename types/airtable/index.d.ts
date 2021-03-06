// Type definitions for airtable 0.5
// Project: https://github.com/airtable/airtable.js
// Definitions by: Brandon Valosek <https://github.com/bvalosek>
//                 Max Chehab <https://github.com/maxchehab>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

export = Airtable;

declare global {
    class Airtable {
        constructor(options?: Airtable.AirtableOptions);
        base(appId: string): Airtable.Base;
    }

    namespace Airtable {
        interface FieldSet {
            [key: string]:
                | undefined
                | string
                | number
                | boolean
                | Collaborator
                | ReadonlyArray<Collaborator>
                | ReadonlyArray<string>
                | ReadonlyArray<Attachment>;
        }

        interface AirtableOptions {
            apiKey?: string;
            endpointUrl?: string;
            apiVersion?: string;
            allowUnauthorizedSsl?: boolean;
            noRetryIfRateLimited?: boolean;
            requestTimeout?: number;
        }

        interface Base {
            (tableName: string): Table<{}>;
        }

        interface Table<TFields extends FieldSet> {
            select(opt?: SelectOptions): Query<TFields>;
            find(id: string): Promise<Response<TFields>>;
            create(record: TFields, opts?: { typecast: boolean }): Promise<Response<TFields>>;
            create(records: TFields[], opts?: { typecast: boolean }): Promise<Array<Response<TFields>>>;
            update(...args: any[]): Promise<any>;
            replace(...args: any[]): Promise<any>;
            destroy(...args: any[]): Promise<any>;
        }

        interface SortParameter {
          field: string;
          direction?: 'asc' | 'desc';
        }

        interface SelectOptions {
            fields?: string[];
            filterByFormula?: string;
            maxRecords?: number;
            pageSize?: number;
            sort?: SortParameter[];
            view?: string;
            cellFormat?: 'json' | 'string';
            timeZone?: string;
            userLocale?: string;
        }

        interface Query<TFields extends object> {
            all(): Promise<Response<TFields>>;
            firstPage(): Promise<Response<TFields>>;
        }

        type Response<TFields> = ReadonlyArray<Row<TFields>>;

        interface Row<TFields> {
            id: string;
            fields: TFields;
        }

        interface Attachment {
            id: string;
            url: string;
            filename: string;
            size: number;
            type: string;
            thumbnails?: {
                small: Thumbnail;
                large: Thumbnail;
                full: Thumbnail;
            };
        }

        interface Thumbnail {
            url: string;
            width: number;
            height: number;
        }

        interface Collaborator {
          id: string;
          email: string;
          name: string;
        }
    }
}
