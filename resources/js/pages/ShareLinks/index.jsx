import { FormattedMessage } from "react-intl";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import CopyButton from "@/components/copy-button";
import { PageTitle } from "@/components/texts";

export default function ShareLinks({ urls }) {
    return (
        <div className="space-y-4">
            <PageTitle>
                <FormattedMessage defaultMessage="Share Links" />
            </PageTitle>
            <Separator />
            <div className="space-y-4 max-w-screen-lg">
                {urls?.map((url) => (
                    <div className="flex items-center space-x-2" key={url}>
                        <Input type="text" value={url} readOnly />
                        <CopyButton content={url} />
                    </div>
                ))}
            </div>
            <Button asChild variant="ghost">
                <Link href="/">
                    <ArrowLeft />
                    <FormattedMessage defaultMessage="Back to Home" />
                </Link>
            </Button>
        </div>
    );
}
