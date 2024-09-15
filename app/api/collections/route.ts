import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
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

        const { title, description, image } = await req.json();

        const existingCollection = await Collection.findOne({ title })

        if (existingCollection) {
            return new NextResponse("Collection already exists", { status: 400 })
        }

        if (!title || !image) {
            return new NextResponse("Title and image are required", { status: 400 })
        }

        const newCollection = await Collection.create({
            title,
            description,
            image,
        })

        await newCollection.save()

        return NextResponse.json(newCollection, { status: 200 })

    } catch (error) {
        console.log("[collection_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const collections = await Collection.find().sort({ createdAt: "desc" });

        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const dynamic = "force-dynamic";