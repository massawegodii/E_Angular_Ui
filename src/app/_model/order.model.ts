import { Product } from "./product.model";

export interface MyOderDetails {
    'orderId': number;
    'orderFullName': string;
    'orderFullAddress': string,
    'orderContactNumber': string;
    'orderAlternateContactNumber': string
    'orderStatus': string;
    'orderAmount' : number;
    'product': Product;
    'user': any

}