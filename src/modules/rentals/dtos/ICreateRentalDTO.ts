interface ICreateRentalDTO {

    car_id: string;
    user_id: string;
    expected_return_date: Date;
    total?: number;
    end_date?: Date;
    id?: string;
}

export { ICreateRentalDTO }