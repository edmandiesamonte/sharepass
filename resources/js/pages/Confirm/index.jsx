import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { PageTitle } from "@/components/texts";

export default function Confirm({ revealUrl }) {
    return (
        <div className="space-y-4">
            <PageTitle>
                <FormattedMessage defaultMessage="Content" />
            </PageTitle>
            <Separator />
            <div className="space-y-6">
                <p>
                    <FormattedMessage defaultMessage="You are about to reveal the content of the link. This can only be done once! Are you sure?" />
                </p>
                <Button asChild variant="destructive" size="lg">
                    <Link href={revealUrl} method="post">
                        <FormattedMessage defaultMessage="Reveal Content" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
