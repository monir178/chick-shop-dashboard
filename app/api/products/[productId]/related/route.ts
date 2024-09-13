import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {

        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "product not found" }), { status: 404 })
        }

        const relatedProducts = await Product.find({
            $or: [
                { category: product.category },
                { collections: { $in: product.collections } },
            ],
            _id: { $ne: product._id } //Exclude the current product
        })

        if (!relatedProducts) {
            return new NextResponse(JSON.stringify({ message: "No related product found" }), { status: 404 })
        }

        return NextResponse.json(relatedProducts, { status: 200 })

    } catch (error) {
        console.log("related_product_GET =>", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";