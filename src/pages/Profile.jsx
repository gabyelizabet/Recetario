import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";
import ProfileImageModal from "../components/ProfileImageModal";
import Button from '../components/Button'
import { useNavigate } from "react-router-dom";
import {Photo1, Photo2, Photo3, Photo4, Photo5, Photo6} from "../images"

const images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

function Profile() {
    const { token } = useAuth("state");
    const { isAuthenticated } = useAuth("state");
    console.log(isAuthenticated)

    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingState, setIsEditingState] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const dobRef = useRef(null);
    const bioRef = useRef(null);
    const userStateRef = useRef(null);
    const { logout } = useAuth("actions");
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout(); // Llama a la función logout
        navigate('/login');
      };

    // Fetch para cargar tarjeta de perfil
    const {
        data: userData,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
        doFetch: fetchProfile,
    } = useFetch(
        `https://sandbox.academiadevelopers.com/users/profiles/profile_data/`,
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        }
    );

    // Fetch para actualizar vía JSON
    const {
        data: updatedUserData,
        isLoading: loadingUpdate,
        isError: errorUpdating,
        doFetch: updateProfile,
    } = useFetch();

    // Fetch para actualizar vía FormData
    const {
        data: profileImageData,
        isLoading: isLoadingUpdate,
        isError: errorProfileImage,
        doFetch: updateProfileImage,
    } = useFetch();

    const {
        data: userStates,
        isLoading: isLoadingUserStates,
        isError: isErrorUserStates,
        doFetch: fetchUserStates,
    } = useFetch(`https://sandbox.academiadevelopers.com/users/user-states/`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`,
        },
    });

    useEffect(() => {
        if (updatedUserData && isEditingState) {
            setIsEditingState(false);
            userData.state = updatedUserData.state;
        }
    }, [updatedUserData]);

    useEffect(() => {
        fetchProfile();
    }, [token]);

    useEffect(() => {
        if (profileImageData) {
            // Si no es null o undefined
            userData.image = profileImageData.image;
        }
    }, [profileImageData]);

    useEffect(() => {
        fetchUserStates();
    }, [isEditingState]);

    function handleEditMode() {
        setEditMode(!editMode);
    }

    function handleSubmit(event) {
        event.preventDefault();
        updateProfile(
            `https://sandbox.academiadevelopers.com/users/profiles/${
                userData.user__id
            }/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    first_name: firstNameRef.current.value,
                    last_name: lastNameRef.current.value,
                    email: emailRef.current.value,
                    dob: dobRef.current.value,
                    bio: bioRef.current.value,
                }),
            }
        );
    }

    function handleStateChange(event) {
        const newUserStateID = event.target.value;

        updateProfile(
            `https://sandbox.academiadevelopers.com/users/profiles/${
                userData.user__id
            }/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    state: newUserStateID,
                }),
            }
        );
    }

    if (isLoadingProfile) return <p>Cargando perfil...</p>;
    if (isErrorProfile) return <p>Error: {isErrorProfile}</p>;

    return (
        <div className="'w-full h-[100vh]">
            <img src={images[Math.floor(Math.random() * images.length)]} 
                alt="Recipes" 
                className="w-full h-full object-cover"
            />
            <div className="absolute w-full h-full bg-gradient-to-t from-black to-transparent top-0 z-8 flex flex-col items-center justify-center pt-40 2xl:pt-20 px-4">
                <div className=" card w-auto h-auto p-6 bg-black opacity-90 text-white">    
                    {userData ? (
                        <>
                            <form className="card-content" onSubmit={handleSubmit}>
                                <div className="media flex items-center space-x-4 mb-4">
                                    <br />
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img
                                                src={
                                                    `${
                                                        import.meta.env
                                                            .VITE_API_BASE_URL
                                                    }${userData.image}` 
                                                    //"https://bulma.io/assets/images/placeholders/96x96.png"
                                                }
                                                alt="Profile image"
                                                className="rounded-full cursor-pointer"
                                                //style={{ borderRadius: "50%" }}
                                                onClick={() => setIsModalOpen(true)}
                                            />
                                        </figure>
                                    </div>
                                    <br />
                                    <div className="media-content">
                                        {editMode ? (
                                            <div className="flex gap-2 mb-2"
                                                /*style={{
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                    alignItems: "center",
                                                    marginBottom: "0.5rem",
                                                }}*/
                                            >
                                                <input
                                                    type="text"
                                                    className="input bg-green-300 text-black rounded-lg p-2"
                                                    ref={firstNameRef}
                                                    defaultValue={userData.first_name}
                                                    //style={{ width: "40%" }}
                                                />
                                                <input
                                                    type="text"
                                                    className="input bg-green-300 text-black rounded-lg p-2"
                                                    ref={lastNameRef}
                                                    defaultValue={userData.last_name}
                                                    //style={{ width: "40%" }}
                                                />
                                            </div>
                                        ) : (
                                            <p className="title is-4 pb-2">
                                                {firstNameRef.current?.value ||
                                                    userData.first_name}{" "}
                                                {lastNameRef.current?.value ||
                                                    userData.last_name}
                                            </p>
                                        )}
                                        <br />
                                        {isEditingState ? (
                                            <div className="field">
                                                <div className="control">
                                                    <div className="select is-small">
                                                        <select
                                                            ref={userStateRef}
                                                            defaultValue={
                                                                userData.state.id
                                                            }
                                                            onChange={handleStateChange}
                                                        >
                                                            {isLoadingUserStates ? (
                                                                <option>
                                                                    Cargando estados...
                                                                </option>
                                                            ) : isErrorUserStates ? (
                                                                <option>
                                                                    Error al cargar los
                                                                    estados
                                                                </option>
                                                            ) : ( userStates?.results.map((state) => (
                                                                        <option
                                                                            key={state.id}
                                                                            value={state.id}
                                                                        >
                                                                            {state.name}
                                                                        </option>
                                                                    ))
                                                                )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (                                        
                                            <div
                                                className="subtitle is-6 flex items-center cursor-pointer"
                                                /*style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}*/
                                                onClick={() => setIsEditingState(true)}
                                            >
                                                <img /*
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_URL
                                                    }${userData.state.icon}`}
                                                    alt="State icon"*/
                                                    className="h-5 mr-2 rounded-full"
                                                    /*style={{
                                                        height: "20px",
                                                        marginRight: "5px",
                                                        borderRadius: "50%",
                                                    }}*/
                                                />
                                                {userData.state?.name}
                                            </div>
                                        )}
                                    </div>
                                    <br />
                                    {<button
                                        className="button is-primary"
                                        onClick={handleEditMode}
                                    >
                                        {!editMode ? "Editar" : "Salir"}
                                    </button>}
                                    <br />
                                </div>
                                <br />
                                <div className="content">
                                    <div className="field">
                                        <label className="label">Email:</label>
                                        <div className="control">
                                            <input
                                                type="email"
                                                className="input bg-green-300 text-black rounded-lg p-2"
                                                id="email"
                                                name="email"
                                                ref={emailRef}
                                                defaultValue={userData.email}
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">
                                            Fecha de Nacimiento:
                                        </label>
                                        <div className="control">
                                            <input
                                                type="date"
                                                className="input bg-green-300 text-black rounded-lg p-2"
                                                id="dob"
                                                name="dob"
                                                ref={dobRef}
                                                defaultValue={userData.dob}
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">Biografía:</label>
                                        <div className="control">
                                            <textarea
                                                className="textarea bg-green-300 text-black rounded-lg p-2"
                                                id="bio"
                                                name="bio"
                                                ref={bioRef}
                                                defaultValue={
                                                    userData.bio || "No disponible"
                                                }
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    {editMode && (
                                        <div className="field">
                                            <button
                                                className="button is-primary is-fullwidth"
                                                type="submit"
                                            >
                                                {loadingUpdate
                                                    ? "Enviando..."
                                                    : "Enviar"}
                                                {errorUpdating && (<span className="text-red-500 ml-2">Ocurrió un error</span>)}
                                                    {/*? "Ocurrió un error al enviar el formulario"
                                                    : null*/}
                                            </button>
                                        </div>
                                    ) }
                                </div>
                            </form>
                            <ProfileImageModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                userId={userData.user__id}
                                onUpload={{
                                    isLoadingUpdate,
                                    profileImageData,
                                    updateProfileImage,
                                }}
                            />
                        </>
                    ) : (
                        <p className="subtitle">No se encontraron datos del usuario.</p>
                    )}
                    <br />
                    <div className="flex justify-center">
                        <Button
                                title = 'Cerrar Sesión'
                                containerStyle='hidden md:block bg-transparent border border-white text-white hover:bg-white hover:text-slate-700 rounded-full min-w-[130px]'
                                handleClick = {handleLogoutClick}
                                
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;