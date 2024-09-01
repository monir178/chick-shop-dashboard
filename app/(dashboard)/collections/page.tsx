"use client";

import { columns } from "@/components/collections/CollectionColumns";
import CustomLoader from "@/components/CustomLoader";
import { DataTable } from "@/components/customUi/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();

      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[collections_GET]", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="px-10 py-5">
          <div className="flex items-center justify-between">
            <p className="text-heading2-bold text-gray-600">Collections</p>
            <Button onClick={() => router.push("/collections/new")}>
              <Plus className="size-6 mr-2" />
              Create Collection
            </Button>
          </div>
          <Separator className="bg-gray-500 my-4" />
          <DataTable searchKey="title" columns={columns} data={collections} />
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
