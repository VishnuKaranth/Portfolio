"use client";

import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    ReactNode,
    useContext,
    useEffect,
} from "react";

type Variants = "DEFAULT" | "PROJECT" | "BUTTON" | "TEXT";

interface ContextProps {
    variant: Variants;
    setVariants: Dispatch<SetStateAction<Variants>>;
}
const Context = createContext<ContextProps>({
    variant: "DEFAULT",
    setVariants: () => {},
});

const VariantProvider = ({ children }: { children: ReactNode }) => {
    const [variant, setVariants] = useState<Variants>("DEFAULT");

    return (
        <Context.Provider value = {{ variant, setVariants }}>
            {children}
        </Context.Provider>
    );
};

const useVariants = () => {
    const {setVariants, variant} = useContext(Context);

    return { variant, setVariants};
};

interface MediaQueryOptions {
  defaultValue?: boolean;
  initialWithValue?: boolean;
}

function useMediaQuery(query: string, options?: MediaQueryOptions): boolean {
  const { defaultValue = false, initialWithValue = true } = options ?? {};

  const [matches, setMatches] = useState<boolean>(() => {
    if (!initialWithValue) return defaultValue;
    if (typeof window === "undefined") return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

export { VariantProvider, useVariants, useMediaQuery };