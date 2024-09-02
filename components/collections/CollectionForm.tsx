"use client";

import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import ImageUpload from "../customUi/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";
import { toast } from "sonner";
import Delete from "../customUi/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(1000).trim(),
  image: z.string().min(1, "Image is Required"),
});

interface ICollectionFormProps {
  initialData?: TCollectionType | null;
}

const CollectionForm: React.FC<ICollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  console.log(initialData);

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${params.collectionId}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(
          `Collection ${initialData ? "updated" : "created"}Successfully`
        );
        window.location.href = "/collections";
        router.push("/collections");
      } else {
        toast.error(
          "Something went wrong! Check if the collection is already exists"
        );
      }
    } catch (error) {
      console.log("[Collection Form]", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold text-gray-600">Edit Collection</p>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <p className="text-heading2-bold text-gray-600">Create Collection</p>
      )}

      <Separator className="my-4  bg-gray-400" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <Button
              disabled={loading}
              className="bg-green-500 hover:bg-green-400"
              type="submit">
              Submit
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-400"
              onClick={() => router.push("/collections")}
              type="button"
              disabled={loading}>
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
