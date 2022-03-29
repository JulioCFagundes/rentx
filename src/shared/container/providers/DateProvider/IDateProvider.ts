





interface IDateProvider{
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUtc(date: Date): string;
    DateNow():Date;
}

export { IDateProvider}