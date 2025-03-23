import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@clerk/clerk-react";
import Button from "../../components/ui/button/Button";
import { getUserByEmail } from "../../api/usersAction";
import { createShipment } from "../../api/shipmentAction";

export default function PageHome() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "No disponible";
  const [formData, setFormData] = useState({
    weight: 0,
    dimensions: "",
    productType: "",
    destinationAddress: {
      regionCode: "CO", // Fijo
      locality: "",
      administrativeArea: "",
      postalCode: "",
      addressLines: [""],
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("destinationAddress.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        destinationAddress: {
          ...prev.destinationAddress,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Enviando formulario");
    e.preventDefault();
    setLoading(true);
    try {
      // Validar que userEmail exista
      if (!userEmail) {
        toast.error("Error: No se encontró el email del usuario.");
        return;
      }

      // Obtener usuario por email
      const user_id = await getUserByEmail(userEmail);
      if (!user_id || !user_id.id) {
        toast.error(
          "Error: No se encontró el usuario con el email proporcionado."
        );
        return;
      }

      // Validar que los campos obligatorios no estén vacíos
      if (!formData.weight || !formData.dimensions || !formData.productType) {
        toast.error("Error: Todos los campos son obligatorios.");
        return;
      }

      const dataShipment = {
        userId: user_id.id,
        weight: formData.weight,
        dimensions: formData.dimensions,
        destinationAddress: formData.destinationAddress,
        productType: formData.productType,
      };

      //console.log("Datos a enviar:", dataShipment);

      // Enviar la solicitud para crear el envío
      const response = await createShipment(dataShipment);

      //console.log("Respuesta del servidor:", response);

      // Manejar la respuesta del backend
      if (!response?.success) {
        if (
          response.statusCode === 400 &&
          response.message ===
            "Invalid destination address. Please provide a valid address."
        ) {
          toast.warn(
            "Advertencia: La dirección de destino no es válida. Por favor, proporciona una dirección válida."
          );
        } else {
          toast.error(
            `Error: ${
              response.message || "Error desconocido al registrar el envío."
            }`
          );
        }
        setLoading(false);
        return;
      }

      toast.success("Envío registrado correctamente");
      setLoading(false);
      // Resetear el formulario
      setFormData({
        weight: 0,
        dimensions: "",
        productType: "",
        destinationAddress: {
          regionCode: "CO",
          locality: "",
          administrativeArea: "",
          postalCode: "",
          addressLines: [""],
        },
      });
    } catch (error: any) {
      setLoading(false);
      console.error("Error en handleSubmit:", error);

      // Manejar errores de respuesta del backend
      if (
        error.response?.data?.statusCode === 400 &&
        error.response?.data?.message === "Invalid destination address"
      ) {
        toast.warn("Advertencia: La dirección de destino no es válida.");
      } else {
        toast.error(
          `Error al registrar el envío: ${error.message || "Error desconocido"}`
        );
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-0 p-4 bg-white rounded-lg shadow-lg">
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
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dimensiones (cm)</label>
          <input
            type="text"
            name="dimensions"
            value={formData.dimensions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Producto</label>
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione un tipo de producto</option>
            <option value="documentos">Documentos</option>
            <option value="paqueteria">Paquetería</option>
            <option value="perecederos">Perecederos</option>
            <option value="electrónicos">Electrónicos</option>
            <option value="muebles">Muebles</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Pais</label>
          <input
            type="text"
            name="destinationAddress.regionCode"
            value={formData.destinationAddress.regionCode}
            disabled
            className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Departamento</label>
          <input
            type="text"
            name="destinationAddress.locality"
            value={formData.destinationAddress.locality}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Municipio</label>
          <input
            type="text"
            name="destinationAddress.administrativeArea"
            value={formData.destinationAddress.administrativeArea}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Código Postal</label>
          <input
            type="text"
            name="destinationAddress.postalCode"
            value={formData.destinationAddress.postalCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Dirección</label>
          <input
            type="text"
            name="destinationAddress.addressLines"
            value={formData.destinationAddress.addressLines[0]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                destinationAddress: {
                  ...prev.destinationAddress,
                  addressLines: [e.target.value],
                },
              }))
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="flex justify-center">
          <Button size="md" variant="outline" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Envío"}
          </Button>
        </div>
      </form>
    </div>
  );
}
