"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/components/Custom";

type Props = {
  params: {
    slug: string;
  };
};

type Post = {
  _id: string;
  title: string;
  summary: string;
  image: string;
  content: any;
};

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};

async function fetchPostData(slug: string) {
  const query = `*[_type=='post' && slug.current == $slug][0]{
    _id,
    title,
    summary,
    image,
    content
  }`;
  return await client.fetch(query, { slug });
}

export default function Page({ params: { slug } }: Props) {
  // Hooks must be called at the top level
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [post, setPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  // Fetch post data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPostData(slug);
      setPost(data);
    };
    fetchData();
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/createComment", {
        method: "POST", // POST method for submission
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitStatus("Comment submitted successfully!");
      } else {
        setSubmitStatus("Failed to submit comment.");
      }
    } catch (error) {
      setSubmitStatus("An error occurred.");
      console.error("Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {post.title}
      </h1>
      <Image
        src={post.image ? urlFor(post.image).url() : "/placeholder.jpg"}
        height={500}
        width={500}
        alt={post.title || "Post Image"}
        className="rounded"
      />
      <section>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
          Summary
        </h2>
        <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
          {post.summary}
        </p>
      </section>
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={"/logo.jpg"}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">M Awais</h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
            Researcher / Blog Writer
          </p>
          <p>Dated: 2 Jan 2025</p>
        </div>
      </section>
      <section className="text-lg leading-normal text-dark/80 dark:text-light/80">
        <PortableText value={post.content} components={components} />
      </section>

      <hr className="max-w-full my-5 border-[1px] border-black" />

      <section>

        <p className="text-xs text-accentDarkPrimary uppercase font-bold">Enjoyed this article?</p>
        <h3 className="text-3xl font-bold">Leave a Comment Below!</h3>
        <hr className="py-3 mt-2"/>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 flex flex-col gap-6">


          <input {...register("_id")} type="hidden" value={post._id} />
          <label className="flex flex-col">
            <span className="font-semibold text-base">Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="text-base placeholder:text-sm border-b-[1px] border-accentDarkPrimary
               py-1 px-4 outline-none focus-within:shadow-xl shadow-accentDarkPrimary"
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-base">Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="text-base placeholder:text-sm border-b-[1px] border-accentDarkPrimary
              py-1 px-4 outline-none focus-within:shadow-xl shadow-accentDarkPrimary"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </label>

          <label className="flex flex-col">
            <span className="font-semibold text-base">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Enter your comment"
              className="text-base placeholder:text-sm border-b-[1px] border-accentDarkPrimary
          py-1 px-4 outline-none focus-within:shadow-xl shadow-accentDarkPrimary"
              rows={6}
            />
            {errors.comment && <p className="text-red-500">Comment is required</p>}
          </label>

          <button type="submit" className="w-full bg-slate-600 text-white text-base font-semibold tracking-wider uppercase
        py-2 rounded-sm hover:bg-accentDarkPrimary duration-300" 
           disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

        </form>
        {submitStatus && <p className="mt-4">{submitStatus}</p>}
      </section>
    </article>
  );
}
