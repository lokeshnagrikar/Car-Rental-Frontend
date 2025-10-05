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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/admin/cars"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-600 hover:text-primary-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Cars
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="px-8 py-6 bg-gradient-to-r from-primary-600 to-primary-700">
          <h3 className="text-3xl font-bold text-white">{isEditMode ? "Edit Car" : "Add New Car"}</h3>
          <p className="mt-2 text-primary-100">
            {isEditMode ? "Update car information" : "Enter car details"}
          </p>
        </div>

        {error && (
          <div className="mx-8 mt-6">
            <div className="rounded-xl bg-red-50 border border-red-200 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-semibold text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="px-8 py-8">
          <Formik initialValues={initialValues} validationSchema={CarSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="make" className="block text-sm font-semibold text-gray-800 mb-2">
                        Make *
                      </label>
                      <Field
                        type="text"
                        name="make"
                        id="make"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="Enter car make"
                      />
                      <ErrorMessage name="make" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="model" className="block text-sm font-semibold text-gray-800 mb-2">
                        Model *
                      </label>
                      <Field
                        type="text"
                        name="model"
                        id="model"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="Enter car model"
                      />
                      <ErrorMessage name="model" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="year" className="block text-sm font-semibold text-gray-800 mb-2">
                        Year *
                      </label>
                      <Field
                        type="number"
                        name="year"
                        id="year"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      />
                      <ErrorMessage name="year" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="pricePerDay" className="block text-sm font-semibold text-gray-800 mb-2">
                        Price Per Day ($) *
                      </label>
                      <Field
                        type="number"
                        name="pricePerDay"
                        id="pricePerDay"
                        step="0.01"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="0.00"
                      />
                      <ErrorMessage name="pricePerDay" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="licensePlate" className="block text-sm font-semibold text-gray-800 mb-2">
                        License Plate
                      </label>
                      <Field
                        type="text"
                        name="licensePlate"
                        id="licensePlate"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="Enter license plate"
                      />
                      <ErrorMessage name="licensePlate" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="color" className="block text-sm font-semibold text-gray-800 mb-2">
                        Color
                      </label>
                      <Field
                        type="text"
                        name="color"
                        id="color"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                        placeholder="Enter car color"
                      />
                      <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="transmission" className="block text-sm font-semibold text-gray-800 mb-2">
                        Transmission
                      </label>
                      <Field
                        as="select"
                        name="transmission"
                        id="transmission"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      >
                        <option value="">Select Transmission</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        <option value="Semi-Automatic">Semi-Automatic</option>
                      </Field>
                      <ErrorMessage name="transmission" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="seats" className="block text-sm font-semibold text-gray-800 mb-2">
                        Seats
                      </label>
                      <Field
                        type="number"
                        name="seats"
                        id="seats"
                        min="1"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      />
                      <ErrorMessage name="seats" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div>
                      <label htmlFor="fuelType" className="block text-sm font-semibold text-gray-800 mb-2">
                        Fuel Type
                      </label>
                      <Field
                        as="select"
                        name="fuelType"
                        id="fuelType"
                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      >
                        <option value="">Select Fuel Type</option>
                        <option value="Gasoline">Gasoline</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                      </Field>
                      <ErrorMessage name="fuelType" component="div" className="text-red-500 text-sm mt-2 font-medium" />
                    </div>

                    <div className="flex items-center pt-4">
                      <Field
                        type="checkbox"
                        name="available"
                        id="available"
                        className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-lg"
                      />
                      <label htmlFor="available" className="ml-3 block text-sm font-semibold text-gray-800">
                        Available for rent
                      </label>
                    </div>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="border-t border-gray-200 pt-8">
                  <label className="block text-lg font-bold text-gray-800 mb-4">Car Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 transition-all duration-200 hover:border-primary-400 hover:bg-gray-50">
                    <div className="text-center">
                      {imagePreview || (isEditMode && car?.imageUrl) ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={
                              imagePreview || (car?.imageUrl ? `http://localhost:8081/api/files/${car.imageUrl}` : "")
                            }
                            alt="Car preview"
                            className="h-48 w-auto object-cover rounded-lg shadow-lg mb-4"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null)
                              setImageFile(null)
                            }}
                            className="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            Remove image
                          </button>
                        </div>
                      ) : (
                        <>
                          <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                          <div className="flex justify-center text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-semibold text-primary-600 hover:text-primary-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                            >
                              <span className="px-4 py-2 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                                Upload a file
                              </span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-3 self-center">or drag and drop</p>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <Link
                    to="/admin/cars"
                    className="px-8 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting || isSubmitting}
                    className="px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        Processing...
                      </span>
                    ) : isEditMode ? (
                      "Update Car"
                    ) : (
                      "Create Car"
                    )}
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