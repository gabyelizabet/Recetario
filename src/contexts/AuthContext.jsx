import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                user__id: action.payload.user__id,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
//children representa los elementos que estan anidados dentro de AuthProvider
function AuthProvider({ children }) {//proveedor de contexto para la autenticacion, proporciona el estado de autenticacion y las funciones
    const [state, dispatch] = useReducer(reducer, {
        user__id: localStorage.getItem("user__id"),
        token: localStorage.getItem("authToken"),
        isAuthenticated: localStorage.getItem("authToken") ? true : false,
    });
    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location)

    const actions = {
        login: (token, user__id) => {
            dispatch({
                type: ACTIONS.LOGIN,
                payload: { token, user__id },
            });
            localStorage.setItem("authToken", token);
            localStorage.setItem("user__id", user__id);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            localStorage.removeItem("user__id");
            navigate('/login');
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };
