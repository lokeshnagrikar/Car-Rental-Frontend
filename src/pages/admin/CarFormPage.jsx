"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getCarById, createCar, updateCar, uploadCarImage } from "../../services/carService"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

const CarSchema = Yup.object().shape({
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  year: Yup.number()
    .required("Year is required")
    .integer("Year must be an integer")
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear() + 1, `Year must be at most ${new Date().getFullYear() + 1}`),
  pricePerDay: Yup.number().required("Price per day is required").positive("Price must be positive"),
  available: Yup.boolean(),
  licensePlate: Yup.string(),
  color: Yup.string(),
  transmission: Yup.string(),
  seats: Yup.number().integer("Seats must be an integer").min(1, "Seats must be at least 1"),
  fuelType: Yup.string(),
})

const CarFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(isEditMode)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      const fetchCarDetails = async () => {
        try {
          const data = await getCarById(id)
          setCar(data)
        } catch (error) {
          console.error("Error fetching car details:", error)
          setError("Failed to load car details. Please try again later.")
        } finally {
          setLoading(false)
        }
      }

      fetchCarDetails()
    }
  }, [id, isEditMode])

  const handleSubmit = async (values) => {
    setSubmitting(true)
    setError("")

    try {
      let response
      if (isEditMode) {
        response = await updateCar(id, values)
        toast.success("Car updated successfully")
      } else {
        response = await createCar(values)
        toast.success("Car created successfully")
      }

      // Upload image if selected
      if (imageFile) {
        const formData = new FormData()
        formData.append("file", imageFile)
        await uploadCarImage(response.id, imageFile)
      }

      navigate("/admin/cars")
    } catch (error) {
      console.error("Error saving car:", error)
      setError(error.response?.data?.message || "Failed to save car. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const initialValues = isEditMode
    ? {
        make: car?.make || "",
        model: car?.model || "",
        year: car?.year || new Date().getFullYear(),
        pricePerDay: car?.pricePerDay || "",
        available: car?.available ?? true,
        licensePlate: car?.licensePlate || "",
        color: car?.color || "",
        transmission: car?.transmission || "",
        seats: car?.seats || "",
        fuelType: car?.fuelType || "",
      }
    : {
        make: "",
        model: "",
        year: new Date().getFullYear(),
        pricePerDay: "",
        available: true,
        licensePlate: "",
        color: "",
        transmission: "",
        seats: "",
        fuelType: "",
      }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/admin/cars"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back to Cars
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-2xl leading-6 font-bold text-gray-900">{isEditMode ? "Edit Car" : "Add New Car"}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {isEditMode ? "Update car information" : "Enter car details"}
          </p>
        </div>

        {error && (
          <div className="px-4 py-5 sm:px-6">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <Formik initialValues={initialValues} validationSchema={CarSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="make" className="block text-sm font-medium text-gray-700">
                      Make
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="make"
                        id="make"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="make" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="model"
                        id="model"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="model" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <div className="mt-1">
                      <Field
                        type="number"
                        name="year"
                        id="year"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="year" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">
                      Price Per Day ($)
                    </label>
                    <div className="mt-1">
                      <Field
                        type="number"
                        name="pricePerDay"
                        id="pricePerDay"
                        step="0.01"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="pricePerDay" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700">
                      License Plate
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="licensePlate"
                        id="licensePlate"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="licensePlate" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="color"
                        id="color"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="color" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
                      Transmission
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        name="transmission"
                        id="transmission"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                      </Field>
                      <ErrorMessage name="transmission" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
                      Seats
                    </label>
                    <div className="mt-1">
                      <Field
                        type="number"
                        name="seats"
                        id="seats"
                        min="1"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      <ErrorMessage name="seats" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                      Fuel Type
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        name="fuelType"
                        id="fuelType"
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                      </Field>
                      <ErrorMessage name="fuelType" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="flex items-center">
                      <Field
                        type="checkbox"
                        name="available"
                        id="available"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                        Available for rent
                      </label>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Car Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imagePreview || (isEditMode && car?.imageUrl) ? (
                          <div className="flex flex-col items-center">
                            <img
                              src={
                                imagePreview || (car?.imageUrl ? `http://localhost:8081/api/files/${car.imageUrl}` : "")
                              }
                              alt="Car preview"
                              className="h-40 w-auto object-cover mb-4"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview(null)
                                setImageFile(null)
                              }}
                              className="text-sm text-red-600 hover:text-red-500"
                            >
                              Remove image
                            </button>
                          </div>
                        ) : (
                          <>
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/admin/cars"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting || isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {isEditMode ? "Update Car" : "Create Car"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default CarFormPage
