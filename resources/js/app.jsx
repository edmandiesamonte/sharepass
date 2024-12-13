import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import DefaultLayout from "./layouts/DefaultLayout";
import { IntlProvider } from "react-intl";
import { TooltipProvider } from "@/components/ui/tooltip";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        const page =
            pages[`./pages/${name}.jsx`] || pages[`./pages/${name}/index.jsx`];
        page.default.layout =
            page.default.layout ||
            ((page) => <DefaultLayout>{page}</DefaultLayout>);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <IntlProvider
                locale={document.documentElement.lang}
                defaultLocale="en"
            >
                <TooltipProvider>
                    <App {...props} />
                </TooltipProvider>
            </IntlProvider>,
        );
    },
});
