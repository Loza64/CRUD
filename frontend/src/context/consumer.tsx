import { createContext, useContext } from "react";

interface ContextType {
    hola: () => string;
}

const context = createContext<ContextType | null>(null);

export default function ContextProvider({ children }: { children: React.ReactNode }) {
    const hola = () => "ffdffs";
    return (
        <context.Provider value={{hola}}>
            {children}
        </context.Provider>
    );
}

export function ContextConsumer() {
    const ctx = useContext(context);
    if (!ctx) {
        throw new Error("useConsumer must be used within a Consumer");
    }
    return ctx;
}