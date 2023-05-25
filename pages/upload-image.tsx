import { QueryClient, dehydrate, useMutation } from "@tanstack/react-query"
import request from "graphql-request"
import { GetServerSideProps } from "next"
import { useForm, type SubmitHandler } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import Layout from "../components/Layout"
import { CreatePhotographDocument, CreatePhotographMutationVariables } from "../lib/gql/graphql"

type FormValues = {
  title: string
  category: string
  description: string
  images: FileList
}

const Uploaded = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (createPhotographArgs: CreatePhotographMutationVariables) =>
      await request("http://localhost:3000/api/graphql", CreatePhotographDocument, {
        ...createPhotographArgs,
      }),
  })

  // Upload photo function
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) return
    const file = e.target.files[0]
    const filename = encodeURIComponent(file.name)
    const res = await fetch(`/api/presign?file=${filename}`)
    const data = await res.json()
    console.log("data", data)
    const formData = new FormData()

    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value)
    })

    toast.promise(
      fetch(data.url, {
        method: "POST",
        body: formData,
      }),
      {
        loading: "Uploading...",
        success: "Image successfully uploaded!🎉",
        error: `Upload failed 😥 Please try again`,
      }
    )
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, category, description, images } = data
    console.log("images", images)
    const imageUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${images[0]?.name}`
    mutate({ title, category, description, imageUrl })
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-md py-12">
        <Toaster />
        <h1 className="text-3xl font-medium my-5">Add a new image</h1>
        <form className="grid grid-cols-1 gap-y-6 shadow-lg p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-gray-700">Title</span>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
              name="title"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <input
              placeholder="Description"
              {...register("description", { required: false })}
              name="description"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Category</span>
            <input
              placeholder="Name"
              {...register("category", { required: true })}
              name="category"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Upload a .png or .jpg image (max 1MB).</span>
            <input
              {...register("images", { required: true })}
              onChange={uploadPhoto}
              type="file"
              accept="image/*"
              name="images"
            />
          </label>
          <button
            disabled={false}
            type="submit"
            className="my-4 capitalize bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
          >
            <span>add image</span>
          </button>
        </form>
      </div>
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const queryClient = new QueryClient()

//   return {
//     props: {
//       dehyratedState: dehydrate(queryClient),
//     },
//   }
// }

export default Uploaded
