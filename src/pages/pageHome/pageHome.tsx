import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "../../components/ui/button/Button";

export default function PageHome() {
  const [formData, setFormData] = useState({
    weight: "",
    dimensions: "",
    productType: "",
    destinationAddress: "",
  });

  const [errors, setErrors] = useState({
    weight: "",
    dimensions: "",
    productType: "",
    destinationAddress: "",
  });

  const validateForm = () => {
    const newErrors: {
      weight: string;
      dimensions: string;
      productType: string;
      destinationAddress: string;
    } = {
      weight: "",
      dimensions: "",
      productType: "",
      destinationAddress: "",
    };

    if (!formData.weight) newErrors.weight = "El peso es obligatorio";
    if (!formData.dimensions)
      newErrors.dimensions = "Las dimensiones son obligatorias";
    if (!formData.productType)
      newErrors.productType = "El tipo de producto es obligatorio";
    if (!formData.destinationAddress)
      newErrors.destinationAddress = "La dirección de destino es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Enviando formulario");
    toast.success("Envío registrado correctamente");
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log("Enviando datos:", formData);
      toast.success("Envío registrado correctamente");

      setFormData({
        weight: "",
        dimensions: "",
        productType: "",
        destinationAddress: "",
      });

      setErrors({
        weight: "",
        dimensions: "",
        productType: "",
        destinationAddress: "",
      });
    } catch (error) {
      toast.error("Error al registrar el envío");
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Registrar Envío</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Peso (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dimensiones (cm)</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.dimensions && (
            <p className="text-red-500 text-sm">{errors.dimensions}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Producto</label>
          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.productType && (
            <p className="text-red-500 text-sm">{errors.productType}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dirección de Destino</label>
          <input
            type="text"
            name="destinationAddress"
            value={formData.destinationAddress}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.destinationAddress && (
            <p className="text-red-500 text-sm">{errors.destinationAddress}</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button size="md" variant="outline">
            Registrar Envío
          </Button>
        </div>
      </form>
    </div>
  );
}
