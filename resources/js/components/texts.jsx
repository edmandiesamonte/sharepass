import { createElement } from "react";
import { cn } from "@/lib/utils";

export function ValidationError({ as = "p", className, children }) {
    return createElement(
        as,
        { className: cn("text-red-500 text-sm", className) },
        children,
    );
}

export function PageTitle({ as = "h1", className, children }) {
    return createElement(
        as,
        { className: cn("text-3xl font-semibold", className) },
        children,
    );
}
