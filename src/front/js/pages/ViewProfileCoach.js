import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext"; 
import { useContext } from "react";

const CoachDetails = () => {
    const { coachId } = useParams(); // Extraer el coachId de la URL
    const { actions } = useContext(Context); 
    const [coach, setCoach] = useState(null); 
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchCoachData = async () => {
            try {
                const coachData = await actions.getCoach(coachId); // Usa coachId para la solicitud
                setCoach(coachData);
                setLoading(false); // Establecer carga como completa
            } catch (error) {
                console.error("Error fetching coach:", error);
                setError("Error al cargar datos del coach."); // Manejar error
                setLoading(false); // Establecer carga como completa
            }
        };

        fetchCoachData();
    }, [coachId, actions]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Detalles del Coach</h2>
            {loading ? (
                <p className="text-center">Cargando datos del coach...</p>
            ) : error ? (
                <p className="text-center">{error}</p> // Mostrar mensaje de error
            ) : coach ? (
                <div className="card">
                    <img src={coach.foto_coach} alt="Foto del Coach" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{coach.nombre_coach || 'Nombre no disponible'}</h5>
                        <p className="card-text"><strong>Email:</strong> {coach.email_coach}</p>
                        <p className="card-text"><strong>Género:</strong> {coach.genero_coach || 'No especificado'}</p>
                        <p className="card-text"><strong>Fecha de Nacimiento:</strong> {coach.nacimiento_coach || 'No disponible'}</p>
                        <p className="card-text"><strong>Dirección:</strong> {coach.direccion || 'No disponible'}</p>
                        <p className="card-text"><strong>Latitud:</strong> {coach.latitud || 'No disponible'}</p>
                        <p className="card-text"><strong>Longitud:</strong> {coach.longitud || 'No disponible'}</p>
                        <p className="card-text"><strong>Descripción:</strong> {coach.descripcion_coach || 'No disponible'}</p>
                        <p className="card-text"><strong>Precio del Servicio:</strong> {coach.precio_servicio ? `$${coach.precio_servicio}` : 'No disponible'}</p>
                    </div>
                </div>
            ) : (
                <p className="text-center">No se encontraron datos del coach.</p>
            )}
        </div>
    );
};

export default CoachDetails;

