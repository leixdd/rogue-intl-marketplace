export interface ITransaction {
    orderId: string;
    status: string;
    customer_email: string;
    customer_name: string;
    customer_paypal_id: string;
    amount: number;
    currency: string;
    reference_id: string;
    item_id: string;
    order_created_at: Date;
    order_updated_at: Date;
    createdAt?: Date;
    updatedAt?: Date;
    account: string;
    code: string;
    pwd: string
}