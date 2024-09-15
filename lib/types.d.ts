type TCollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: TProductType[];
}

type TProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [TCollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;

}

type TOrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
}

type TOrderItemType = {
    product: TProductType;
    color: string;
    size: string;
    quantity: number;
}

type TCustomerType = {
    clerkId: string;
    name: string;
    email: string;
}

