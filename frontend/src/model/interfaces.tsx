
export interface Iproduct {
    name: string;
    company: string;
    image?: {
        public_id: string;
        url: string
    };
    price: number;
    stock: number;
}

export type product_body = Omit<Iproduct, "image">;

export interface Response<T = unknown> {
    message: string;
    status: string;
    data?: T;
}