import { FormattedMessage, useIntl } from "react-intl";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/texts";

export default function Error({ status }) {
    const intl = useIntl();
    const title = {
        503: intl.formatMessage({ defaultMessage: "503 Service Unavailable" }),
        500: intl.formatMessage({ defaultMessage: "500 Server Error" }),
        404: intl.formatMessage({ defaultMessage: "404 Not Found" }),
        405: intl.formatMessage({ defaultMessage: "404 Not Found" }), // Make 405 error as 404
        403: intl.formatMessage({ defaultMessage: "403 Forbidden" }),
    }[status];

    const description = {
        503: intl.formatMessage({
            defaultMessage:
                "Sorry, we are doing some maintenance. Please check back soon.",
        }),
        500: intl.formatMessage({
            defaultMessage: "Whoops, something went wrong on our servers.",
        }),
        404: intl.formatMessage({
            defaultMessage:
                "Sorry, the page you are looking for could not be found or has expired.",
        }),
        // Make 405 error as if it's 404
        405: intl.formatMessage({
            defaultMessage:
                "Sorry, the page you are looking for could not be found or has expired.",
        }),
        403: intl.formatMessage({
            defaultMessage:
                "Sorry, you are forbidden from accessing this page.",
        }),
    }[status];

    return (
        <div className="space-y-4">
            <PageTitle>{title}</PageTitle>
            <Separator />
            <p>{description}</p>
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft />
                    <FormattedMessage defaultMessage="Back to Home" />
                </Link>
            </Button>
        </div>
    );
}
