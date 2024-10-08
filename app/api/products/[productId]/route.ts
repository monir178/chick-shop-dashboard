import Collection from "@/lib/models/Collection"
import Product from "@/lib/models/Product"
import { connectToDB } from "@/lib/mongoDB"
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        await connectToDB()

        const product = await Product.findById(params.productId).populate({ path: "collections", model: Collection })

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "product not found" }), { status: 404 })
        }

        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });


    } catch (error) {
        console.log("productId_GET =>", error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {

    try {
        const { userId } = auth();
        const user = await currentUser();
        // console.log("User details =>", user)

        const isAdmin = user?.publicMetadata?.role === "admin"

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!isAdmin) {
            return new NextResponse("User is not Admin", { status: 403 })
        }

        await connectToDB()

        const product = await Product.findById(params.productId)

        if (!product) {
            return new NextResponse("Product not found", { status: 404 })
        }

        const { title, description, media, category, collections, tags, sizes, colors, price, expense } = await req.json();

        if (!title || !description || !media || !category || !price || !expense) {
            return new NextResponse("Not enough data to create product", { status: 400 })
        }

        // Included in new data, but not included in the previous data
        const addedCollection = collections.filter((collectionId: string) => !product.collections.includes(collectionId)
        )

        // Included in previous data, but not included in the new data
        const removedCollection = product.collections.filter((collectionId: string) => !collections.includes(collectionId))


        //! Update collections
        await Promise.all([
            // Update added collection with this product
            ...addedCollection.map((collectionId: string) => {
                Collection.findById(collectionId, {
                    $push: {
                        products: product._id
                    }
                })
            }),


            // Update removed collection without this product
            ...removedCollection.map((collectionId: string) => {
                Collection.findById(collectionId, {
                    $pull: {
                        products: product._id
                    }
                })
            })
        ])


        //! Update product
        const updateProduct = await Product.findByIdAndUpdate(product._id, {
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            colors,
            price,
            expense
        }, { new: true }).populate({ path: "collections", model: Collection })

        await updateProduct.save();

        return NextResponse.json(updateProduct, { status: 200 })


    } catch (error) {
        console.log("productId_POST =>", error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {

    try {
        const { userId } = auth();

        const user = await currentUser();
        // console.log("User details =>", user)

        const isAdmin = user?.publicMetadata?.role === "admin"

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!isAdmin) {
            return new NextResponse("User is not Admin", { status: 403 })
        }

        await connectToDB();

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse("Product not found", { status: 404 })
        }

        await Product.findByIdAndDelete(product._id);

        // Update collection
        await Promise.all([
            product.collections.map((collectionId: string) => {
                Collection.findByIdAndUpdate(collectionId, {
                    $pull: {
                        products: product._id
                    }
                })
            })
        ])

    } catch (error) {
        console.log("productId_DELETE =>", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";